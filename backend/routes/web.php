<?php
/**
 * This is web routes file
 */
use Illuminate\Support\Facades\Route;

Route::get(
    '/', function () {
        return view('welcome');
    }
);
