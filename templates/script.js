document.getElementById("mesForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.innerHTML = 'Processing...';
    submitButton.disabled = true;

    // Create results div if it doesn't exist
    let resultsDiv = document.getElementById('prediction-results');
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.id = 'prediction-results';
        document.getElementById('mesForm').after(resultsDiv);
    }

    // Collect form data
    const formData = {
        time: document.getElementById("time").value,
        day_of_week: document.getElementById("day_of_week").value,
        age_band_driver: document.getElementById("age_band_driver").value,
        sex_driver: document.getElementById("sex_driver").value,
        type_vehicle: document.getElementById("type_vehicle").value,
        area_accident_occurred: document.getElementById("area_accident_occurred").value,
        Road_alignment: document.getElementById("Road_alignment").value,
        Types_of_junction: document.getElementById("Types_of_junction").value,
        Road_surface_conditions: document.getElementById("Road_surface_conditions").value,
        Weather_conditions: document.getElementById("Weather_conditions").value,
        Type_of_collision: document.getElementById("Type_of_collision").value,
        Number_of_casualties: document.getElementById("Number_of_casualties").value,
        Vehicle_movement: document.getElementById("Vehicle_movement").value,
        Sex_of_casualty: document.getElementById("Sex_of_casualty").value,
        Age_band_of_casualty: document.getElementById("Age_band_of_casualty").value
    };

    // Send AJAX request
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Reset button
        submitButton.innerHTML = 'Submit';
        submitButton.disabled = false;

        if (data.error) {
            throw new Error(data.error);
        }

        // Show prediction result
        resultsDiv.className = `alert mt-3 ${getSeverityClass(data.prediction)}`;
        resultsDiv.innerHTML = `
            <h4 class="alert-heading">Prediction Result</h4>
            <p>${data.message}</p>
        `;
    })
    .catch(error => {
        // Reset button
        submitButton.innerHTML = 'Submit';
        submitButton.disabled = false;

        // Show error
        resultsDiv.className = 'alert alert-danger mt-3';
        resultsDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
    });
});

function getSeverityClass(prediction) {
    switch(prediction) {
        case 'Fatal':
            return 'alert-danger';
        case 'Serious':
            return 'alert-warning';
        case 'Slight':
            return 'alert-info';
        default:
            return 'alert-secondary';
    }
}
