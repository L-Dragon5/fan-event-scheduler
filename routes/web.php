<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\web\AuthController;
use App\Http\Controllers\web\EventController;
use App\Http\Controllers\web\EventTypeController;
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

// Form Routes
Route::group(['prefix' => 'admin'], function () {
    Route::post('login', [UserController::class, 'login']);
    Route::post('register', [UserController::class, 'register']);
    Route::post('update-password', [UserController::class, 'updatePassword']);
    Route::post('forgot-password', [UserController::class, 'forgotPassword']);
});

Route::group(['middleware' => 'auth', 'prefix' => 'admin'], function () {
    Route::post('schedules/create', [ScheduleController::class, 'store']);

    Route::group(['middleware' => CheckUserOwnsSchedule::class, 'prefix' => 'schedule/{scheduleId}'], function() {
        // Update Schedule settings.
        Route::post('update', [ScheduleController::class, 'update']);

        // Events
        Route::post('events/store', [EventController::class, 'store']);
        Route::post('events/update', [EventController::class, 'update']);
        Route::post('events/destroy', [EventController::class, 'destroy']);

        // Event Types
        Route::post('eventTypes/store', [EventTypeController::class, 'store']);
        Route::post('eventTypes/update', [EventTypeController::class, 'update']);
        Route::post('eventTypes/destroy', [EventTypeController::class, 'destroy']);

        // Exhibitor
        Route::post('exhibitors/store', [ExhibitorController::class, 'store']);
        Route::post('exhibitors/update', [ExhibitorController::class, 'update']);
        Route::post('exhibitor/destroy', [ExhibitorController::class, 'destroy']);

        // Guest
        Route::post('guests/store', [GuestController::class, 'store']);
        Route::post('guests/update', [GuestController::class, 'update']);
        Route::post('guests/destroy', [GuestController::class, 'destroy']);

        // Location
        Route::post('locations/store', [LocationController::class, 'store']);
        Route::post('locations/update', [LocationController::class, 'update']);
        Route::post('locations/destroy', [LocationController::class, 'destroy']);

        // Map
        Route::post('maps/store', [MapController::class, 'store']);
        Route::post('maps/update', [MapController::class, 'update']);
        Route::post('maps/destroy', [MapController::class, 'destroy']);
        
        // Rule
        Route::post('rules/store', [RuleController::class, 'store']);
        Route::post('rules/update', [RuleController::class, 'update']);
        Route::post('rules/destroy', [RuleController::class, 'destroy']);
    });
});

// Display Routes
Route::group(['middleware' => 'auth', 'prefix' => 'admin'], function () {
    Route::get('/', [ScheduleController::class, 'index'])->name('admin-base');

    Route::group(['middleware' => CheckUserOwnsSchedule::class, 'prefix' => 'schedule/{scheduleId}'], function() {
        Route::get('/', [ScheduleController::class, 'show']);
        Route::get('events', [EventController::class, 'index']);
        Route::get('eventTypes', [EventTypeController::class, 'index']);
        Route::get('exhibitors', [ExhibitorController::class, 'index']);
        Route::get('guests', [GuestController::class, 'index']);
        Route::get('locations', [LocationController::class, 'index']);
        Route::get('maps', [MapController::class, 'index']);
        Route::get('rules', [RuleController::class, 'index']);
        Route::get('settings', [ScheduleController::class, 'settingsIndex']);
    });
});

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::get('/register', fn() => Inertia::render('Public/Register')->withViewData(['title' => 'Register']))->name('register');
Route::get('/forgot-password', fn() => Inertia::render('Public/ForgotPassword')->withViewData(['title' => 'Forgot Password']))->name('forgot-password');

// Public Routes
Route::get('/', fn() => Inertia::render('Public/Index')->withViewData(['title' => 'Home']));

// Public Schedule Routes
Route::get('/s/{uuid}', [ScheduleController::class, 'showPublic']);
