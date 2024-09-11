<?php
/**
 * Web Routes
 *
 * This file contains the definition of the web routes for the application.
 * It registers routes that handle web requests and return views or responses.
 *
 * @package  App\Http\Controllers
 * @category Routes
 * @version  PHP 8.2
 * @author   Kibooli Felix
 * @license  MIT
 * @link     [URL]
 */

use Illuminate\Support\Facades\Route;

/**
 * Register the web routes for the application.
 *
 * Routes are defined here to handle incoming HTTP requests and return
 * the appropriate responses, such as views or redirects.
 *
 * @return void
 */
Route::get(
    '/', function () {
        return view('welcome');
    }
);
