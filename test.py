from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import os
import joblib
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

encoder_path = 'label_encoders.joblib'  # Path to the single saved encoder
model_path = 'casualty_severity_model.joblib' 
#label_encoders = joblib.load(encoder_path)
model = joblib.load(model_path)

# Route to render the form
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle form submission
@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
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
        csv_path = os.path.join('uploads', 'form_data.csv')
        df.to_csv(csv_path, index=False)
        df = pd.read_csv(csv_path)

        label_encoders = {}
        categorical_cols = df.select_dtypes(include=['object']).columns

        for col in categorical_cols:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            label_encoders[col] = le

        # Perform the prediction
        prediction = model.predict(df)[0]
        return render_template('output.html',
                             prediction=prediction)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
