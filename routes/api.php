<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\api\EventController;
use App\Http\Controllers\api\ExhibitorController;
use App\Http\Controllers\api\GuestController;
use App\Http\Controllers\api\HomeController;
use App\Http\Controllers\api\LocationController;
use App\Http\Controllers\api\MapController;
use App\Http\Controllers\api\RuleController;
use App\Http\Controllers\api\ScheduleController;
use App\Http\Controllers\api\SettingController;
use App\Http\Controllers\api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// User Routes
Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);
Route::post('forgot-password', [UserController::class, 'forgotPassword']);
Route::post('checkUser', [UserController::class, 'checkUser']);

Route::middleware('auth:api')->group(function () {
    // User Routes
    Route::post('update-password', [UserController::class, 'updatePassword']);

    // Schedule Routes
    Route::get('schedules', [ScheduleController::class, 'index']);
    Route::get('schedules/{id}', [ScheduleController::class, 'view']);
    Route::post('schedules/create', [ScheduleController::class, 'store']);
    Route::post('schedules/update/{id}', [ScheduleController::class, 'update']);
    Route::get('schedules/destroy/{id}', [ScheduleController::class, 'destroy']);

    // Location Routes
    Route::get('locations', [LocationController::class, 'index']);
    Route::post('locations/create', [LocationController::class, 'store']);
    Route::post('locations/destroy/{id}', [LocationController::class, 'destroy']);

    // Setting Routes
    Route::get('settings/{key}', [SettingController::class, 'getByKey']);
    Route::get('settings/social', [SettingController::class, 'getSocial']);

    // Rules Routes
    Route::get('rules', [RuleController::class, 'index']);
    Route::post('rules/create', [RuleController::class, 'store']);
    Route::post('rules/update/{id}', [RuleController::class, 'update']);
    Route::get('rules/destroy/{id}', [RuleController::class, 'destroy']);

    // Exhibitors Routes
    Route::get('exhibitors', [ExhibitorController::class, 'index']);
    Route::post('exhibitors/create', [ExhibitorController::class, 'store']);
    Route::post('exhibitors/update/{id}', [ExhibitorController::class, 'update']);
    Route::get('exhibitors/destroy/{id}', [ExhibitorController::class, 'destroy']);

    // Guests Routes
    Route::get('guests', [GuestController::class, 'index']);
    Route::get('guest/{id}', [GuestController::class, 'view']);
    Route::post('guest/create', [GuestController::class, 'store']);
    Route::post('guest/update/{id}', [GuestController::class, 'update']);
    Route::get('guest/destroy/{id}', [GuestController::class, 'destroy']);

    // Events Routes
    Route::get('events', [EventController::class, 'index']);
    Route::get('events/{id}', [EventController::class, 'view']);
    Route::post('events/create', [EventController::class, 'store']);
    Route::post('events/update/{id}', [EventController::class, 'update']);
    Route::get('events/destroy/{id}', [EventController::class, 'destroy']);

    // Home Routes
    Route::get('home', [HomeController::class, 'index']);
    Route::post('home/update', [HomeController::class, 'update']);

    // Map Routes
    Route::get('maps', [MapController::class, 'index']);
    Route::get('maps/{id}', [MapController::class, 'view']);
    Route::post('maps/create', [MapController::class, 'store']);
    Route::post('maps/update/{id}', [MapController::class, 'update']);
    Route::get('maps/destroy/{id}', [MapController::class, 'destroy']);
});
