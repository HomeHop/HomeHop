from flask import Flask, jsonify, request
from flask_cors import CORS
from scrappers.rentfaster import query_rentfaster
from data_parser import parse_csv
import os
import json
from geopy.geocoders import Nominatim

app = Flask(__name__)
CORS(app)

# Variables to store the current location of the user
latitude = None
longitude = None


@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Hello, World!"}), 200

#route to get the current location of the user from the frontend
@app.route("/location", methods=["POST"])
def update_location():
    global latitude, longitude
    data = request.get_json()
    latitude = data.get("lat")
    longitude = data.get("lng")
    print(latitude, longitude)
    return jsonify({"message": "Location updated!", "latitude": latitude, "longitude": longitude}), 200

@app.route("/scrape", methods=["POST"])
def scrape_listings():
    data = request.get_json()
    
    if data.get("startScraping"):
        city, province = convert_coordinates_to_address(latitude, longitude)
        print(city, province)

    # Call the query_rentfaster function from the rentfaster.py file
    query_rentfaster(city, province)


    #parse the csv file
    if os.path.exists(city + '.csv'):
        file_path = city + '.csv'
        listings = parse_csv(file_path)
        return jsonify({"listings": listings}), 200
    else:
        return jsonify({"message": "No listings found!"}), 404


def convert_coordinates_to_address(latitude, longitude):
    geolocator = Nominatim(user_agent="geoapiExercises")
    location = geolocator.reverse((latitude, longitude))
    #from location.address get city and province
    address = location.address
    address = address.split(',')
    city = address["city"]
    province = address["state"]
    return city, province


if __name__ == "__main__":
    lat = 43.653225
    lng = -79.383186
    # city, province = convert_coordinates_to_address(lat, lng)
    # print(city, province)
    #run the app on port 5000
    app.run(host="localhost", port=5000, debug=True)


    