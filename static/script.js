document.getElementById("mesForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const category1Values = [
      document.getElementById("age_band_driver").value,
      document.getElementById("sex_driver").value,
      document.getElementById("type_vehicle").value,
      document.getElementById("area_accident_occurred").value,
      document.getElementById("Road_alignment").value,
      document.getElementById("Types_of_junctions").value,
      document.getElementById("Road_surface_conditions").value,
      document.getElementById("Weather_conditions").value,
      document.getElementById("Type_of_collision").value,
      document.getElementById("Number_of_casualities").value,
      document.getElementById("Vehicle_movement").value,
      document.getElementById("Sex_of_casuality").value,
      document.getElementById("Age_band_of_casuality").value
    ];
  
    const output = category1Values.join(", ");
  
    // Send data using Fetch API or to your Flask endpoint (if Flask is set up)
    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: output })
    })
      .then(response => response.json())
      .then(data => alert("Data submitted: " + data))
      .catch(error => console.error("Error:", error));
  });
  