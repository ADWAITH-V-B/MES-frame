from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import joblib
import os

app = Flask(__name__)

# Load the saved model and encoders
model = joblib.load('casualty_severity_model.joblib')
label_encoders = joblib.load('label_encoders.joblib')

# Route to render the form HTML
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle form submission
@app.route('/submit', methods=['POST'])
def submit():
    # Collect data from form
    data = {
        'Time': request.form.get('time'),
        'Day_of_week': request.form.get('day_of_week'),
        'Age_band_of_driver': request.form.get('age_band_driver'),
        'Sex_of_driver': request.form.get('sex_driver'),
        'Type_of_vehicle': request.form.get('type_vehicle'),
        'Area_accident_occured': request.form.get('area_accident_occurred'),
        'Road_allignment': request.form.get('Road_allignment'),
        'Types_of_Junction': request.form.get('Types_of_junction'),
        'Road_surface_conditions': request.form.get('Road_surface_conditions'),
        'Weather_conditions': request.form.get('Weather_conditions'),
        'Type_of_collision': request.form.get('Type_of_collision'),
        'Number_of_casualties': request.form.get('Number_of_casualties'),
        'Vehicle_movement': request.form.get('Vehicle_movement'),
        'Sex_of_casualty': request.form.get('Sex_of_casualty'),
        'Age_band_of_casualty': request.form.get('Age_band_of_casualty')
    }

    # Convert data to a DataFrame and save as CSV
    df = pd.DataFrame([data])
    csv_path = os.path.join('uploads', 'Test.csv')
    df.to_csv(csv_path, index=False)

    # Preprocess and predict
    df.fillna(method='ffill', inplace=True)

    # Transform data using label encoders
    for col in label_encoders:
        if col in df.columns:
            try:
                df[col] = label_encoders[col].transform(df[col].astype(str))
            except ValueError as e:
                print(f"Warning: {e} for column {col}. Assigning default value.")
                default_value = label_encoders[col].classes_[0]  # Default to the first class
                df[col] = default_value
    df = df.astype(float, errors='ignore')
    # Make predictions
    predictions = model.predict(df)
    predictions_df = pd.DataFrame(predictions, columns=['Predicted_Casualty_Severity'])

    # Save predictions to CSV and display
    predictions_path = os.path.join('uploads', 'predictions.csv')
    predictions_df.to_csv(predictions_path, index=False)

    return f"Predictions: {predictions_df.to_html(index=False)} <br>Saved to 'predictions.csv'"

if __name__ == '__main__':
    app.run(debug=True)
