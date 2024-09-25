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
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DocumentController;

Route::get(
    '/', function () {
        return view('welcome');
    }
);

// Group admin routes under a common name prefix
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
   // Document routes
   Route::get('/document/view', [DocumentController::class, 'index'])->name('document.view');
   Route::get('/document/create', [DocumentController::class, 'create'])->name('document.create');
   Route::post('/document/store', [DocumentController::class, 'store'])->name('document.store');
   Route::get('/document/edit/{id}', [DocumentController::class, 'edit'])->name('document.edit');
   Route::put('/document/update/{id}', [DocumentController::class, 'update'])->name('document.update');
   Route::delete('/document/destroy/{id}', [DocumentController::class, 'destroy'])->name('document.destroy');
});
