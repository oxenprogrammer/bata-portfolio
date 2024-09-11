<?php
/**
 * This file contains web routes for the application.
 *
 * @category Routing
 * @package  Routes
 * @version  1.0
 * @author   Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link     https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */
use Illuminate\Support\Facades\Route;

Route::get(
    '/', function () {
        return view('welcome');
    }
);
