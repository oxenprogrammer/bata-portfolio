<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\SubscriberController;

// Publicly accessible API routes

// Route to fetch all documents
Route::get('/documents', [DocumentController::class, 'getAllDocuments']);

// Route to fetch a specific document by its ID
Route::get('/documents/{id}', [DocumentController::class, 'getSingleDocument']);

Route::get('/blogs', [BlogController::class, 'getAllBlogs']);

// Route to fetch a specific document by its ID
Route::get('/blogs/{id}',[BlogController::class, 'getSingleBlog']);

//Route to create subscriber
Route::post('/subscriber',[SubscriberController::class,'store']);
//Route to confrm subscriber subscription
Route::get('/subscriber/confirm/{token}',[SubscriberController::class,'confirmSubscription']);

//Route to store contact us info
Route::post('/contactus',[ContactUsController::class,'Store']);


// restricted access api routes
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

