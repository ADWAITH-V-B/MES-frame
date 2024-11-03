function displayPrediction(data) {
    const predictionDiv = document.getElementById('predictionText');
    const predictionStatus = document.querySelector('.prediction-status');
    
    let statusText = '';
    let statusClass = '';
    
    switch(data.prediction) {
        case 1:
            statusText = 'Patient is Slightly Injured';
            statusClass = 'prediction-1';
            break;
        case 2:
            statusText = 'Patient is Severely Injured';
            statusClass = 'prediction-2';
            break;
        case 3:
            statusText = 'Patient Condition is Serious';
            statusClass = 'prediction-3';
            break;
    }
    
    predictionDiv.textContent = statusText;
    predictionStatus.className = `prediction-status p-3 mb-4 text-center rounded ${statusClass}`;
    
    // Display patient information
    document.getElementById('patientName').textContent = data.name;
    document.getElementById('bloodPressure').textContent = data.bloodPressure;
    document.getElementById('oxygenSat').textContent = data.oxygenSaturation;
    document.getElementById('heartRate').textContent = data.heartRate;
    document.getElementById('bodyTemp').textContent = data.bodyTemperature;
    document.getElementById('injuries').textContent = data.injuries;
    
    // Display accident details
    const accidentInfo = document.getElementById('accidentInfo');
    const accidentDetails = [
        ['Time', data.time],
        ['Day of Week', data.dayOfWeek],
        ['Vehicle Type', data.typeVehicle],
        ['Area', data.areaAccidentOccurred],
        ['Road Alignment', data.roadAlignment],
        ['Weather Conditions', data.weatherConditions],
        ['Type of Collision', data.typeOfCollision],
        ['Number of Casualties', data.numberOfCasualties]
    ];
    
    accidentInfo.innerHTML = accidentDetails
        .map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`)
        .join('');
} 