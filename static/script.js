document.getElementById("mesForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Collect values from Category 1 variables
  const category1Values = [
    document.getElementById("age_band_driver").value,
    document.getElementById("sex_driver").value,
    document.getElementById("type_vehicle").value,
    document.getElementById("area_accident_occurred").value,
    // Add similar lines for other Category 1 variables
  ];

  // Join values as CSV format (comma-separated)
  const csvOutput = category1Values.join(",");

  // Send CSV formatted data to Flask endpoint
  fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: csvOutput })
  })
    .then(response => response.json())
    .then(data => alert("Data submitted: " + data.message))
    .catch(error => console.error("Error:", error));
});

  