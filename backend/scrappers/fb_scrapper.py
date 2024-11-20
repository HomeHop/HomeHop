from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from mongo_db import save_listing


def scrape_facebook():
    driver = webdriver.Chrome()  # Ensure you have the correct driver installed
    driver.get("https://www.facebook.com/marketplace")

    try:
        # Wait until listings are loaded
        listings = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "item-class"))
        )
        for listing in listings:
            try:
                title = listing.find_element(By.CLASS_NAME, "title-class").text
                price = listing.find_element(By.CLASS_NAME, "price-class").text
                url = listing.find_element(By.TAG_NAME, "a").get_attribute("href")
                data = {
                    "title": title,
                    "price": price,
                    "platform": "Facebook Marketplace",
                    "url": url,
                }
                save_listing(data)
            except NoSuchElementException as e:
                print(f"Error finding element in listing: {e}")
    except TimeoutException:
        print("Timeout waiting for listings to load")
    finally:
        driver.quit()

if __name__ == "__main__":
    scrape_facebook()