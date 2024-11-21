from flask import Flask, jsonify
from mongo_db import get_listings, clear_database
from scrappers.rentfaster import query_rentfaster
import requests

app = Flask(__name__)

@app.route("/listings", methods=["GET"])
def fetch_listings():
    listings = get_listings()
    return jsonify(listings), 200

@app.route("/scrape", methods=["POST"])
def scrape_listings():
    city = requests.json.get("city")
    province = requests.json.get("province")
    clear_database()
    query_rentfaster(city, province)
    return jsonify({"message": "Scraping complete!"}), 200

if __name__ == "__main__":
    app.run(debug=True)

