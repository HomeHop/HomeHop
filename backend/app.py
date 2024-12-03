from flask import Flask, jsonify, request
from flask_cors import CORS
from scrappers.rentfaster import query_rentfaster

app = Flask(__name__)
CORS(app)



@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Hello, World!"}), 200



@app.route("/scrape", methods=["POST"])
def scrape_listings():
    data = request.get_json()
    city = data.get("city")
    province = data.get("province")
    query_rentfaster(city, province)
    return jsonify({"message": "Scraping complete!"}), 200

if __name__ == "__main__":
    #run the app on port 5000
    app.run(host="localhost", port=5000, debug=True)

    