# HomeHop - Google Chrome Built-in AI Challenge
> Smart Rental Aggregator Chrome Extension

> Live demo [_here_](https://www.example.com). <!-- If you have the project hosted somewhere, include the link here. -->

## Table of Contents
* [General Info](#general-information)
* [API Used](#api-usage)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Room for Improvement](#room-for-improvement)
* [License](#license)

## General Information
- The **Home Hop** Chrome Extension makes the process of finding the best rental properties across multiple platforms better, helping users make informed decisions quickly. With the integration of various AI-powered features, this extension offers summarized insights and advanced filtering options.


## API Usage

### 1. **Summarization API**
- Automatically generates **summaries of reviews, user comments**, and **property descriptions**.
- Quickly presents the key insights to save users time when evaluating properties.

### 2. **Rewrite API**
- **Rewrites listings or reviews** for better clarity, especially if they contain excessive jargon or unclear language.
- Ensures the content is more digestible and user-friendly.

### 3. **Prompt API**
- Allows users to ask **custom queries** about the properties, such as:
  - "What’s the crime rate near this property?"
  - "Are there good schools nearby?"
  - Provides valuable context to assist with the decision-making process.

## Features
- **Aggregates rental listings** from popular platforms like Zillow, Craigslist, Facebook Marketplace, and others.
- Provides a comprehensive overview of available properties to make comparisons easier.
- Uses the **Summarization API** to generate clear and concise summaries of **rental reviews** and **user comments**.
- Provides a quick snapshot of the property's overall sentiment and key points from user feedback.
- Identifies properties with the **best price-to-value ratio** by comparing costs against features and user reviews.
- Verifies legitimacy to help users avoid scams, ensuring listings are accurate and trustworthy.
- **Best Reviews**: Showcases the most favorable reviews or testimonials (e.g., "Great neighborhood, quiet at night").
- **Critical Reviews**: Highlights issues or concerns (e.g., "Hidden fees, maintenance issues").
- Filter listings by **amenities** such as pet-friendly options, utilities included, and more.
- Allows users to set **budget ranges** and specify preferred **neighborhoods**.
- Additional filters like proximity to **transit** can be applied to further refine the search.


## Screenshots
![Example screenshot](./img/screenshot.png)
<img width="1436" alt="Screenshot 2024-12-03 at 11 27 46 PM" src="https://github.com/user-attachments/assets/7e2b731f-251d-4202-ba4a-045708ccfe7c">

## Setup
`npm install`
`npm run build`

## Room for Improvement
- The next steps for **HomeHop** include expanding data sources to cover more platforms and rental types. We plan to refine our filtering system with more advanced AI-powered suggestions, enhance neighborhood insights with visual maps, and integrate real-time alerts for price changes. We can use Translate API to make our project available around the world. Eventually, we aim to launch **HomeHop** as a comprehensive rental assistant available on multiple browsers and devices, transforming how people find their next home globally.


## License
This project is open source and available under the [MIT License](https://github.com/HomeHop/HomeHop?tab=MIT-1-ov-file).
