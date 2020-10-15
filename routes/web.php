<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\web\UserController;
use App\Http\Controllers\web\AuthController;
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

Route::post('/admin/login', [UserController::class, 'login']);
Route::post('/admin/register', [UserController::class, 'register']);
Route::post('/admin/update-password', [UserController::class, 'updatePassword']);
Route::post('/admin/forgot-password', [UserController::class, 'forgotPassword']);


// Authenticated Routes
Route::domain('admin.saas-event-schedule.test')->group(function () {
    Route::get('/', fn() => Inertia::render('Admin/Schedules')->withViewData(['title' => 'Schedules']))->name('admin-base');
});

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::get('/register', fn() => Inertia::render('Public/Register')->withViewData(['title' => 'Register']))->name('register');
Route::get('/forgot-password', fn() => Inertia::render('Public/ForgotPassword')->withViewData(['title' => 'Forgot Password']))->name('forgot-password');

// Public Routes
Route::get('/', fn() => Inertia::render('Public/Index')->withViewData(['title' => 'Home']));
Route::get('/s/{any}', fn() => Inertia::render('Public/PublicSchedule')->withViewData(['title' => 'Schedule']));
Route::get('/{any}', fn() => redirect('/'));
