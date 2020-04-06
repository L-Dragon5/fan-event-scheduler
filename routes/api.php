<?php

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
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');

Route::middleware(['api'])->group(function () {
    // Schedule Routes
    Route::get('schedule/byGrid', 'ScheduleController@byGrid');
    Route::get('schedule/byTime', 'ScheduleController@byTime');
    Route::get('schedule/byTime/{location}', 'ScheduleController@byLocation');

    // Location Routes
    Route::get('locations', 'LocationController@index');
    Route::post('location/create', 'LocationController@store');
    Route::post('location/destroy/{id}', 'LocationController@destroy');

    // Setting Routes
    Route::get('setting/{key}', 'SettingController@getByKey');
    Route::get('settings/social', 'SettingController@getSocial');

    // Rules Routes
    Route::get('rules', 'RuleController@index');
    Route::post('rule/create', 'RuleController@store');
    Route::post('rule/update/{id}', 'RuleController@update');
    Route::get('rule/destroy/{id}', 'RuleController@destroy');

    // Exhibitors Routes
    Route::get('exhibitors', 'ExhibitorController@index');
    Route::post('exhibitor/create', 'ExhibitorController@store');
    Route::post('exhibitor/update/{id}', 'ExhibitorController@update');
    Route::get('exhibitor/destroy/{id}', 'ExhibitorController@destroy');

    // Guests Routes
    Route::get('guests', 'GuestController@index');
    Route::get('guest/{id}', 'GuestController@view');
    Route::post('guest/create', 'GuestController@store');
    Route::post('guest/update/{id}', 'GuestController@update');
    Route::get('guest/destroy/{id}', 'GuestController@destroy');

    // Events Routes
    Route::get('event/{id}', 'EventController@view');
    Route::post('event/create', 'EventController@store');
    Route::post('event/update/{id}', 'EventController@update');
    Route::get('event/destroy/{id}', 'EventController@destroy');

    // Home Routes
    Route::get('home', 'HomeController@index');
    Route::post('home/update', 'HomeController@update');

    // Map Routes
    Route::get('maps', 'MapController@index');
    Route::get('map/{id}', 'MapController@view');
    Route::post('map/create', 'MapController@store');
    Route::post('map/update/{id}', 'MapController@update');
    Route::get('map/destroy/{id}', 'MapController@destroy');
});
