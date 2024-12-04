import requests
import time
import os
import pandas as pd

def query_rentfaster(city, province):
    results_df = pd.DataFrame()
    page = 0
    while True:
        if page >= 3:  # Stop scraping when page hits 3 for testing
            break
        
        location = province.lower() + '/' + city.lower()
        cookies = {'lastcity': location}
        url = 'https://www.rentfaster.ca/api/search.json?cur_page={}'.format(page)
        response = requests.post(url, cookies=cookies, timeout=10)
        response.raise_for_status()
        data = response.json()
        # print(data)
        
        if data["listings"] == []:
            if page != 0:
                break
        
        # Append the data to the results DataFrame
        listings_df = pd.DataFrame(data["listings"])
        results_df = pd.concat([results_df, listings_df], ignore_index=True)
        
        page += 1
        time.sleep(1)  # Add a delay to avoid hitting the server too frequently

    # Save the results to a CSV file
    file_path = f'{city}.csv'
    results_df.to_csv(file_path, index=False)
    print(f'Scraping complete. Data saved to {file_path}')

# Example usage
if __name__ == "__main__":
    query_rentfaster("Toronto", "Ontario")