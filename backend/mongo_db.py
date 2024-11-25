import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")  # Connect to local MongoDB instance
db = client["HomeHop"]  # Create a database called 'homehop'
# collection = db["listings"]  # Create a collection called 'listings'

print(client.list_database_names())




# # Insert a single listing into the collection
# def insert_listing(listing):
#     """
#     Insert a single listing into the database.

#     Expected structure of listing:
#     {
#         "title": str,
#         "price": str,
#         "city": str,
#         "url": str
#     }
#     """
#     try:
#         result = collection.insert_one(listing)
#         print(f"Inserted listing with ID: {result.inserted_id}")
#     except Exception as e:
#         print(f"Error inserting listing: {e}")

# import ast  # To parse strings containing lists/dicts safely

# def parse_rentfaster_row(row):
#     """
#     Parse a single RentFaster row into a MongoDB-compatible dictionary.
    
#     Arguments:
#     row -- Dictionary-like structure of the row data.

#     Returns:
#     Parsed dictionary suitable for MongoDB storage.
#     """
#     return {
#         "ref_id": row.get("ref_id"),
#         "userId": row.get("userId"),
#         "id": row.get("id"),
#         "title": row.get("title"),
#         "price": row.get("price"),
#         "type": row.get("type"),
#         "sq_feet": row.get("sq_feet"),
#         "availability": row.get("availability"),
#         "avdate": row.get("avdate"),
#         "location": row.get("location"),
#         "images": {
#             "thumb": row.get("thumb"),
#             "thumb2": row.get("thumb2"),
#             "slide": row.get("slide")
#         },
#         "link": row.get("link"),
#         "coordinates": {
#             "latitude": float(row.get("latitude", 0)),
#             "longitude": float(row.get("longitude", 0))
#         },
#         "marker": row.get("marker"),
#         "address": {
#             "full_address": row.get("address"),
#             "hidden": row.get("address_hidden")
#         },
#         "city": row.get("city"),
#         "province": row.get("province"),
#         "intro": row.get("intro"),
#         "community": row.get("community"),
#         "quadrant": row.get("quadrant"),
#         "contact": {
#             "phone": row.get("phone"),
#             "phone_2": row.get("phone_2"),
#             "preferred_contact": row.get("preferred_contact"),
#             "website": row.get("website"),
#             "email": row.get("email")
#         },
#         "property_details": {
#             "smoking": row.get("smoking"),
#             "lease_term": row.get("lease_term"),
#             "garage_size": row.get("garage_size"),
#             "status": row.get("status"),
#             "book_tour": row.get("book_tour")
#         },
#         "features": ast.literal_eval(row.get("features", "[]")),  # Convert string list to Python list
#         "details": {
#             "bedrooms": row.get("bedrooms"),
#             "den": row.get("den"),
#             "baths": row.get("baths"),
#             "cats": row.get("cats"),
#             "dogs": row.get("dogs"),
#             "utilities_included": row.get("utilities_included")
#         }
#     }

# def insert_listings_from_csv(data_rows):
#     """
#     Insert multiple RentFaster rows into MongoDB after parsing.

#     Arguments:
#     data_rows -- List of dictionaries, each representing a row of RentFaster data.
#     """
#     parsed_listings = [parse_rentfaster_row(row) for row in data_rows]
#     try:
#         result = collection.insert_many(parsed_listings)
#         print(f"Inserted {len(result.inserted_ids)} listings into MongoDB.")
#     except Exception as e:
#         print(f"Error inserting listings: {e}")


# # Retrieve all listings from the database
# def get_listings():
#     """
#     Retrieve all listings from the database.

#     Returns: List of listings, excluding the MongoDB '_id' field.
#     """
#     try:
#         return list(collection.find({}, {"_id": 0}))  # Exclude the _id field for simplicity
#     except Exception as e:
#         print(f"Error retrieving listings: {e}")
#         return []

# # Clear all listings from the database
# def clear_database():
#     """
#     Clear all documents from the collection.
#     """
#     try:
#         collection.delete_many({})
#         print("Database cleared!")
#     except Exception as e:
#         print(f"Error clearing database: {e}")

# Test the connection to MongoDB
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
