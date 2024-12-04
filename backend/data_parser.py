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
                # the price: '1 - 2' make it an int with the greater value ir last value
                #eg '1 - 2' -> 2
                'price': int(row['price'].split(' - ')[0]),
                'type': row['type'],
                # 'sq_feet': row['sq_feet'],
                'availability': row['availability'],
                'location': row['location'],
                'latitude': float(row['latitude']),
                'longitude': float(row['longitude']),
                'address': row['address'],
                'city': row['city'],
                'province': row['province'],
                #bedrooms: '1 - 2' make it an int with the greater value ir last value, if it is a string stuff like 'Studio' make it 1
                'bedrooms': int(row['bedrooms'].split(' - ')[-1]) if row['bedrooms'].isdigit() else 1,
                #baths: '1 - 2' make it an int with the greater value ir last value, if it is 2.5 or decimals justt round it to the nearest integer
                'baths': round(float(row['baths'].split(' - ')[-1])),
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