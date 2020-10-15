<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Authenticated Routes
Route::domain('admin.saas-event-schedule.test')->group(function () {
    Route::get('/', fn() => view('admin'));
    Route::get('/{any}', fn($any) => view('admin'))->where('any', '.*');
});

// Authentication Routes
Route::get('/login', fn() => Inertia::render('Login')->withViewData(['title' => 'Login']))->name('login');
Route::get('/register', fn() => Inertia::render('Register')->withViewData(['title' => 'Register']))->name('register');
Route::get('/forgot-password', fn() => Inertia::render('ForgotPassword')->withViewData(['title' => 'Forgot Password']))->name('forgot-password');

// Public Routes
Route::get('/', fn() => Inertia::render('Public')->withViewData(['title' => 'Home']));
Route::get('/s/{any}', fn() => Inertia::render('PublicSchedule')->withViewData(['title' => 'Schedule']));
Route::get('/{any}', fn() => redirect('/'));
