<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## Getting Started

To get started with this Laravel backend project, follow these steps:

### Prerequisites

- PHP 8.0 or higher
- Composer
- MySQL or another supported database

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd <project_directory>
    ```

3. **Install the project dependencies:**

    ```bash
    composer install
    ```

4. **Create a `.env` file by copying the example file:**

    ```bash
    cp .env.example .env
    ```

5. **Generate the application key:**

    ```bash
    php artisan key:generate
    ```

6. **Configure your database settings in the `.env` file.**

7. **Run database migrations and seeders:**

    ```bash
    php artisan migrate --seed
    ```

8. **Start the Laravel development server:**

    ```bash
    php artisan serve
    ```

    The application will be available at `http://localhost:8000`.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
