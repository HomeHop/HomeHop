from pymongo import MongoClient
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["rental_aggregator"]
listings_collection = db["listings"]

def save_listing(data):
    try:
        listings_collection.insert_one(data)
        logging.info(f"Saved listing: {data.get('title', 'No title')}")
    except Exception as e:
        logging.error(f"Error saving listing: {e}")

def get_listings():
    return list(listings_collection.find())

def clear_database():
    listings_collection.delete_many({})
    logging.info("Database cleared.")