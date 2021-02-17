<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use App\Models\Schedule;

class PublicScheduleController extends Controller
{
    /**
     * Display the events.
     * 
     * @param uuid  $uuid
     * @return \Illuminate\Http\Response
     */
    public function showEvents($uuid) {
        try {
            $schedule = Schedule::where('public_string', '=', $uuid)
                ->where('is_live', '=', 1)
                ->with(['events', 'locations'])
                ->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect('/');
        }

        return Inertia::render('Public/views/EventsPage', [
            'uuid' => $uuid,
            'scheduleName' => $schedule->name,
            'events' => $schedule->events,
            'locations' => $schedule->locations,
        ])->withViewData(['title' => 'Events', 'schedule_name' => $schedule->name]);
    }

    /**
     * Display the exhibitors.
     * 
     * @param uuid  $uuid
     * @return \Illuminate\Http\Response
     */
    public function showExhibitors($uuid) {
        try {
            $schedule = Schedule::where('public_string', '=', $uuid)
                ->where('is_live', '=', 1)
                ->with(['exhibitors'])
                ->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect('/');
        }

        return Inertia::render('Public/views/ExhibitorsPage', [
            'uuid' => $uuid,
            'scheduleName' => $schedule->name,
            'exhibitors' => $schedule->exhibitors,
        ])->withViewData(['title' => 'Exhibitors', 'schedule_name' => $schedule->name]);
    }

    /**
     * Display the guests.
     * 
     * @param uuid  $uuid
     * @return \Illuminate\Http\Response
     */
    public function showGuests($uuid) {
        try {
            $schedule = Schedule::where('public_string', '=', $uuid)
                ->where('is_live', '=', 1)
                ->with(['guests'])
                ->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect('/');
        }

        return Inertia::render('Public/views/GuestsPage', [
            'uuid' => $uuid,
            'scheduleName' => $schedule->name,
            'guests' => $schedule->guests,
        ])->withViewData(['title' => 'Guests', 'schedule_name' => $schedule->name]);
    }

    /**
     * Display the maps.
     * 
     * @param uuid  $uuid
     * @return \Illuminate\Http\Response
     */
    public function showMaps($uuid) {
        try {
            $schedule = Schedule::where('public_string', '=', $uuid)
                ->where('is_live', '=', 1)
                ->with(['maps'])
                ->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect('/');
        }

        return Inertia::render('Public/views/MapsPage', [
            'uuid' => $uuid,
            'scheduleName' => $schedule->name,
            'maps' => $schedule->map,
        ])->withViewData(['title' => 'Maps', 'schedule_name' => $schedule->name]);
    }

    /**
     * Display the rules.
     * 
     * @param uuid  $uuid
     * @return \Illuminate\Http\Response
     */
    public function showRules($uuid) {
        try {
            $schedule = Schedule::where('public_string', '=', $uuid)
                ->where('is_live', '=', 1)
                ->with(['rules'])
                ->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect('/');
        }

        return Inertia::render('Public/views/RulesPage', [
            'uuid' => $uuid,
            'scheduleName' => $schedule->name,
            'rules' => $schedule->rules,
        ])->withViewData(['title' => 'Rules', 'schedule_name' => $schedule->name]);
    }
}
