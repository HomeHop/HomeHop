from flask import Flask, jsonify
from mongo_db import get_listings, clear_database
# from scrapers.craigslist_scraper import scrape_craigslist
from scrappers.fb_scrapper import scrape_facebook
from scrappers.kjiji_scrapper import scrape_kijiji

app = Flask(__name__)

@app.route("/listings", methods=["GET"])
def fetch_listings():
    listings = get_listings()
    return jsonify(listings), 200

@app.route("/scrape", methods=["POST"])
def run_scrapers():
    # scrape_craigslist()
    scrape_facebook()
    scrape_kijiji()
    return jsonify({"message": "Scrapers ran successfully!"}), 200

@app.route("/clear", methods=["DELETE"])
def clear_db():
    clear_database()
    return jsonify({"message": "Database cleared!"}), 200




if __name__ == "__main__":
    app.run(debug=True)
