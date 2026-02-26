<?php

use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('users', UserController::class);
    Route::get('getusers', [UserController::class, 'getUsers'])->name('getusers');
    Route::delete('deleteDepartment/{id}', [UserController::class, 'deleteDepartment'])->name('deleteDepartment');
});

Route::get('temp', function () {
    return User::orderBy('id')->cursorPaginate(10);
});

require __DIR__.'/settings.php';
