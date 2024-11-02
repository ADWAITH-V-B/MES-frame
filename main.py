from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json.get('data')
    # Process the data as needed
    return jsonify({"message": "Received data: " + data})

if __name__ == '__main__':
    app.run(debug=True)
