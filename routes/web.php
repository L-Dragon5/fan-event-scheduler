<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\web\AuthController;
use App\Http\Controllers\web\EventController;
use App\Http\Controllers\web\ExhibitorController;
use App\Http\Controllers\web\GuestController;
use App\Http\Controllers\web\LocationController;
use App\Http\Controllers\web\MapController;
use App\Http\Controllers\web\RuleController;
use App\Http\Controllers\web\ScheduleController;
use App\Http\Controllers\web\UserController;
use App\Http\Middleware\CheckUserOwnsSchedule;
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

// Admin Routes
Route::domain('admin.saas-event-schedule.test')->group(function () {
    Route::middleware('auth')->group(function() {
        Route::get('/', [ScheduleController::class, 'index'])->name('admin-base');
        
        Route::prefix('admin')->group(function () {
            Route::post('schedules/create', [ScheduleController::class, 'store']);
        });

        Route::middleware(CheckUserOwnsSchedule::class)->group(function() {
            Route::get('/schedule/{scheduleId}', [ScheduleController::class, 'show'])->name('schedule-base');
        
            Route::prefix('schedule/{scheduleId}')->group(function () {
                Route::get('events', [EventController::class, 'index'])->name('schedule-events');
                Route::get('exhibitors', [ExhibitorController::class, 'index'])->name('schedule-exhibitors');
                Route::get('guests', [GuestController::class, 'index'])->name('schedule-guests');
                Route::get('locations', [LocationController::class, 'index'])->name('schedule-locations');
                Route::get('maps', [MapController::class, 'index'])->name('schedule-maps');
                Route::get('rules', [RuleController::class, 'index'])->name('schedule-rules');
                Route::get('settings', [ScheduleController::class, 'settingsIndex'])->name('schedule-settings');

                Route::post('update', [ScheduleController::class, 'update']);
                Route::post('locations/store', [LocationController::class, 'store']);
                Route::post('locations/update', [LocationController::class, 'update']);
                Route::post('locations/destroy', [LocationController::class, 'destroy']);
                Route::post('guests/store', [GuestController::class, 'store']);
                Route::post('guests/update', [GuestController::class, 'update']);
                Route::post('guests/destroy', [GuestController::class, 'destroy']);
                Route::post('rules/store', [RuleController::class, 'store']);
                Route::post('rules/update', [RuleController::class, 'update']);
                Route::post('rules/destroy', [RuleController::class, 'destroy']);
            });
        });
    });
});

Route::prefix('admin')->group(function () {
    Route::post('login', [UserController::class, 'login']);
    Route::post('register', [UserController::class, 'register']);
    Route::post('update-password', [UserController::class, 'updatePassword']);
    Route::post('forgot-password', [UserController::class, 'forgotPassword']);
});

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::get('/register', fn() => Inertia::render('Public/Register')->withViewData(['title' => 'Register']))->name('register');
Route::get('/forgot-password', fn() => Inertia::render('Public/ForgotPassword')->withViewData(['title' => 'Forgot Password']))->name('forgot-password');

// Public Routes
Route::get('/', fn() => Inertia::render('Public/Index')->withViewData(['title' => 'Home']));
Route::get('/s/{any}', fn() => Inertia::render('Public/PublicSchedule')->withViewData(['title' => 'Schedule']));
Route::get('/{any}', fn() => redirect('/'));
