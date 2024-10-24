
# Laravel Backend Setup

This repository contains the backend API built with **Laravel 11** for a Next.js frontend. Follow these instructions to set up and test the API locally.

## Prerequisites

Before getting started, ensure you have the following software installed on your machine:

- **PHP 8.2+**: [Download here](https://www.php.net/downloads)
- **Composer**: [Download here](https://getcomposer.org/download/)
- **MySQL** (or preferred database): [Download here](https://dev.mysql.com/downloads/mysql/)
- **Node.js & npm** (if you are working with frontend): [Download here](https://nodejs.org/en/download/)
- **Postman** (to test the API): [Download here](https://www.postman.com/downloads/)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

After cloning the repository, install all the required dependencies using Composer.

```bash
composer install
```

### 3. Set Up Environment

1. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

2. Open the `.env` file and configure the following values according to your local setup:

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:generated-key-here
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

3. Generate a new application key:

```bash
php artisan key:generate
```

### 4. Migrate the Database

Run the following command to migrate the database schema:

```bash
php artisan migrate
```

### 5. Seed the Database (Optional)

If there are any seeder files, you can populate your database with sample data by running:

```bash
php artisan db:seed
```

### 6. Serve the Application

To start the Laravel application, run the following command:

```bash
php artisan serve
```

By default, it will be served on `http://127.0.0.1:8000`.

## API Documentation

The backend exposes various API endpoints that can be tested via tools like Postman or cURL.

### 1. Test API with Postman

To test the API locally, follow these steps:

- Open Postman and create a new request.
- Set the request type (GET, POST, PUT, DELETE) depending on the endpoint.
- Set the URL: `http://127.0.0.1:8000/api/{endpoint}`.
- Include any required parameters, headers, or body as needed.

### Example API Endpoints

#### 1. Fetch All Blogs

- **Method**: `GET`
- **URL**: `/api/blogs`
- **Description**: Returns all published blogs.

#### 2. Fetch Single Blog

- **Method**: `GET`
- **URL**: `/api/blogs/{id}`
- **Description**: Returns a specific blog post based on its ID.

#### 3. Fetch All Documents

- **Method**: `GET`
- **URL**: `/api/documents`
- **Description**: Returns all active documents.

#### 4. Fetch Single Document

- **Method**: `GET`
- **URL**: `/api/documents/{id}`
- **Description**: Returns a specific document based on its ID.

---

### Example Postman Collection

You can import the following JSON collection into Postman to have pre-configured endpoints for testing.

```json
{
  "info": {
    "name": "Laravel API",
    "description": "API endpoints for testing the Laravel backend",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Blogs",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://127.0.0.1:8000/api/blogs",
          "protocol": "http",
          "host": [
            "127",
            "0",
            "0",
            "1"
          ],
          "port": "8000",
          "path": [
            "api",
            "blogs"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Get Single Blog",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://127.0.0.1:8000/api/blogs/1",
          "protocol": "http",
          "host": [
            "127",
            "0",
            "0",
            "1"
          ],
          "port": "8000",
          "path": [
            "api",
            "blogs",
            "1"
          ]
        }
      },
      "response": []
    }
  ]
}
```

---

## Testing the API

Once the server is running, you can use the following endpoints to test the data:

### Blogs API

- `GET /api/blogs` – Fetches all blogs where status is not `draft`.
- `GET /api/blogs/{id}` – Fetches a single blog post by ID if it is published.

### Documents API

- `GET /api/documents` – Fetches all active documents.
- `GET /api/documents/{id}` – Fetches a specific document by ID if its status is active.

Make sure to use the exact URLs in Postman or cURL, based on your local server setup.

---

## Troubleshooting

1. **CORS Issues**: If you encounter CORS errors while testing from the Next.js frontend, make sure the CORS middleware is properly set in `app/Http/Middleware/HandleCors.php` or configured in `config/cors.php`.
2. **Database Errors**: Ensure that your `.env` file is correctly configured and that the database is running.

For further issues, check the logs in `storage/logs/` or run the following command:

```bash
php artisan log:clear
```

---

