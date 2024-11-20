import requests
from bs4 import BeautifulSoup
from mongo_db import save_listing

def scrape_kijiji():
    base_url = "https://www.kijiji.ca"
    url = f"{base_url}/b-apartments-condos/city-name"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    for listing in soup.select(".search-item"):
        title = listing.select_one(".title").text.strip()
        price = listing.select_one(".price").text.strip()
        listing_url = listing.select_one("a")["href"]
        if not listing_url.startswith("http"):
            listing_url = f"{base_url}{listing_url}"
        data = {
            "title": title,
            "price": price,
            "platform": "Kijiji",
            "url": listing_url,
        }
        save_listing(data)

if __name__ == "__main__":
    scrape_kijiji()