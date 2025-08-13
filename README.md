<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Web Scraper API - NestJS

A RESTful API built with NestJS that scrapes web pages and extracts structured data including titles, headings, paragraphs, and links. The scraped data can be saved to a local JSON file.

## 🚀 Features

- **Web Scraping**: Extract structured data from any webpage
- **Data Extraction**: Captures titles, headings (h1-h6), paragraphs, and links
- **File Storage**: Automatically saves scraped data to a JSON file
- **Error Handling**: Robust error handling for invalid URLs and network issues
- **Clean Architecture**: Built with NestJS modular structure

## 🛠️ Tech Stack

- **Framework**: NestJS
- **HTTP Client**: Axios
- **HTML Parser**: Cheerio
- **Runtime**: Node.js
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- NestJS CLI (optional): `npm install -g @nestjs/cli`

## Environmental Variables

```bash
API_KEY=set_your_secret_api_key
PORT=your_port
SCRAPER_OUTPUT_DIR=your_custome_directory_path
SCRAPER_TIMEOUT=10000
```

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd web-scraper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start:dev
   ```

4. **Verify the application is running**
   ```
   Application should be running on http://localhost:3000
   ```

## 📚 API Documentation

### Endpoint

**POST** `/scraper/scrape`

Scrapes a webpage and saves the extracted data to a local JSON file.

#### Request

- **Method**: POST
- **URL**: `http://localhost:3000/scraper/scrape`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "url": "https://example.com"
}
```

#### Response

```json
{
  "message": "Data successfully written to scraped-data.json",
  "filePath": "/path/to/your/project/scraped-data.json"
}
```

#### Error Responses

**400 Bad Request** - Missing or invalid URL
```json
{
  "statusCode": 400,
  "message": "URL is required in request body"
}
```

**502 Bad Gateway** - Failed to fetch webpage
```json
{
  "statusCode": 502,
  "message": "Failed to fetch URL https://example.com: Network Error"
}
```

## 📁 Output File Structure

The scraped data is saved to `scraped-data.json` in the project root with the following structure:

```json
{
  "url":"Page URL",
  "data": {
    "url": "https://myexample.com",
    "fetchedAt": "2025-08-11T20:28:09.030Z",
    "title": "E-commerce\t| Oxylabs Scraping Sandbox",
    "headings": [
      {
        "tag": "h1",
        "text": "Video Games to scrape"
      }
    ],
  }
  "links": [
    {
      "href": "https://example.com/link1",
      "text": "Link Text 1"
    },
    {
      "href": "https://example.com/link2",
      "text": "Link Text 2"
    }
  ]
}
```

## 🧪 Testing

### Using Postman

1. **Set up the request**:
   - Method: `POST`
   - URL: `http://localhost:3000/scraper/scrape`
   - Headers: `Content-Type: application/json`
   - Headers: `x-api-key : your_secret_api_key`
   - Body:
     ```json
     {
       "url": "https://example.com"
     }
     ```

### Running Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov
```

## 📂 Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
└── scraper/
    |──dtos/
        ├──scraper-url.dto.ts
        ├──-scraper-data.interface.ts
    ├── scraper.controller.ts  # API endpoint controller
    ├── scraper.service.ts     # Business logic service
    ├── scraper.service.spec.ts # Unit tests
    └── scraper.module.ts      # Scraper module
```

## 🔍 What Gets Scraped

The scraper extracts the following elements from web pages:

- **Title**: The `<title>` tag content
- **Headings**: All heading tags (h1, h2, h3, h4, h5, h6)
- **Paragraphs**: All `<p>` tag content
- **Links**: All `<a>` tags with href attributes (both URL and link text)

## ⚠️ Limitations

- **Static Content Only**: Works best with server-side rendered HTML
- **JavaScript-Heavy Sites**: May not capture content loaded dynamically with JavaScript
- **Rate Limiting**: Some websites may block automated requests
- **Authentication**: Cannot scrape login-protected content
- **Anti-Bot Protection**: Sites with Cloudflare or similar protection may block requests