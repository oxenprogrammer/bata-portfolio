<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocumentController;

// Publicly accessible API routes

// Route to fetch all documents
Route::get('/documents', [DocumentController::class, 'getAllDocuments']);

// Route to fetch a specific document by its ID
Route::get('/documents/{id}', [DocumentController::class, 'getSingleDocument']);

Route::get('/blogs', [DocumentController::class, 'getAllBlogs']);

// Route to fetch a specific document by its ID
Route::get('/blogs/{id}', [DocumentController::class, 'getSingleBlog']);


// restricted access api routes
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

