import unittest
from app import app

class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_fetch_listings(self):
        response = self.app.get('/listings')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_run_scrapers(self):
        response = self.app.post('/scrape')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['message'], "Scrapers ran successfully!")

    def test_clear_db(self):
        response = self.app.delete('/clear')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['message'], "Database cleared!")

if __name__ == '__main__':
    unittest.main()