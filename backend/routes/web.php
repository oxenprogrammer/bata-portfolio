<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\SubscriberController;

// Home route
Route::get('/', function () {
    return redirect()->route('login'); // Redirect to the login route
});

// Protected dashboard route, redirect to admin dashboard upon authentication
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Group admin routes under a common name prefix with auth middleware
Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard'); // Admin dashboard
    // Document routes
    Route::get('/document/view', [DocumentController::class, 'index'])->name('document.view');
    Route::get('/document/create', [DocumentController::class, 'create'])->name('document.create');
    Route::post('/document/store', [DocumentController::class, 'store'])->name('document.store');
    Route::get('/document/edit/{id}', [DocumentController::class, 'edit'])->name('document.edit');
    Route::put('/document/update/{id}', [DocumentController::class, 'update'])->name('document.update');
    Route::delete('/document/destroy/{id}', [DocumentController::class, 'destroy'])->name('document.destroy');

    //Blog routes
    Route::get('/blog/view', [BlogController::class, 'index'])->name('blog.view');
    Route::get('/blog/create', [BlogController::class, 'create'])->name('blog.create');
    Route::post('/blog/store', [BlogController::class, 'store'])->name('blog.store');
    Route::get('/blog/edit/{id}', [BlogController::class, 'edit'])->name('blog.edit');
    Route::put('/blog/update/{id}', [BlogController::class, 'update'])->name('blog.update');
    Route::delete('/blog/destroy/{id}', [BlogController::class, 'destroy'])->name('blog.destroy');

    //Subscriber routes
    Route::get('/subscriber/view',[SubscriberController::class,'index'])->name('subscriber.view');
    Route::get('/subscriber/create', [SubscriberController::class, 'create'])->name('subscriber.create');
    Route::post('/subscriber/store', [SubscriberController::class, 'store'])->name('subscriber.store');
    Route::get('/subscriber/edit/{id}', [SubscriberController::class, 'edit'])->name('subscriber.edit');
    Route::put('/subscriber/update/{id}', [SubscriberController::class, 'update'])->name('subscriber.update');
    Route::delete('/subscriber/destroy/{id}', [SubscriberController::class, 'destroy'])->name('subscriber.destroy');

    //contact routes
    Route::get('/contacts/view',[ContactUsController::class,'index'])->name('contact.view');
    Route::get('/contact/details/{id}', [ContactUsController::class, 'show'])->name('contact.detail');
    Route::delete('/contact/destroy/{id}', [ContactUsController::class, 'destroy'])->name('contact.destroy');
});



// Profile routes for authenticated users
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Include Breeze authentication routes
require __DIR__ . '/auth.php';
