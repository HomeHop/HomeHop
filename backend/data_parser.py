import csv
import json

def parse_csv(file_path):
    listings = []

    with open(file_path, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            listing = {
                'id': row['id'],
                'title': row['title'],
                'price': row['price'],
                'type': row['type'],
                # 'sq_feet': row['sq_feet'],
                'availability': row['availability'],
                'location': row['location'],
                'latitude': float(row['latitude']),
                'longitude': float(row['longitude']),
                'address': row['address'],
                'city': row['city'],
                'province': row['province'],
                'bedrooms': row['bedrooms'],
                'baths': row['baths'],
                'cats': row['cats'].lower() == 'true',
                'dogs': row['dogs'].lower() == 'true',
                'utilities_included': row['utilities_included'].lower() == 'true',
                'features': row['features']
            }
            listings.append(listing)

    return listings

def send_to_frontend(data):
    # Assuming you have a backend server to handle this
    # Here we just print the JSON data
    json_data = json.dumps(data, indent=2)
    print(json_data)

if __name__ == "__main__":
    file_path = 'Toronto.csv'  # Replace with your CSV file path
    listings = parse_csv(file_path)
    send_to_frontend(listings)