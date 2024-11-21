from flask import Flask, jsonify, request
from mongo_db import get_listings, clear_database
from scrappers.rentfaster import query_rentfaster

app = Flask(__name__)

@app.route("/listings", methods=["GET"])
def fetch_listings():
    listings = get_listings()
    return jsonify(listings), 200

@app.route("/scrape", methods=["POST"])
def scrape_listings():
    data = request.get_json()
    city = data.get("city")
    province = data.get("province")
    # clear_database()
    query_rentfaster(city, province)
    return jsonify({"message": "Scraping complete!"}), 200

if __name__ == "__main__":
    app.run(debug=True)