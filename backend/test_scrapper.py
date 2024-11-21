import requests
import time
import os
import pandas as pd

def query_rentfaster(city, province):
    results_df = pd.DataFrame()
    page = 0
    while True:
        location = province.lower() + '/' + city.lower()
        cookies = {'lastcity': location}
        url = 'https://www.rentfaster.ca/api/search.json?cur_page={}'.format(page)
        response = requests.post(url, cookies=cookies, timeout=10)
        response.raise_for_status()
        data = response.json()
        print(data)
        if data["listings"] == []:
            if page != 0:
                if os.path.exists(city_name + '.csv'):
                    city_name = city_name + str(city+province)
                results_df.to_csv(city_name + '.csv')
            break
        results_df = pd.concat([results_df, pd.json_normalize(data["listings"])])
        city_name = data["listings"][0]["city"]
        page += 1
        print(f"Scraping page {page}...")
        print(f"Total listings scraped: {len(results_df)}")
        time.sleep(1)

        
        # time.sleep(10)


if __name__ == "__main__":
    #take user input for city and province
    city = input("Enter the city: ")
    province = input("Enter the province: ")
    query_rentfaster(city, province)
    
    print("Scraping complete!")