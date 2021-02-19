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
                ->with(['locations'])
                ->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back();
        }

        $social_settings = $this->getSocialSettings($schedule);
        $all_events = $schedule
            ->events
            ->sortBy('time_start')
            ->groupBy('date')
            ->sortKeys();

        return Inertia::render('Public/views/EventsPage', [
            'uuid' => $uuid,
            'scheduleName' => $schedule->name,
            'socialSettings' => $social_settings,
            'events' => $all_events,
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
            return back();
        }

        $sortedExhibitors = [];
        $undefinedExhibitors = [];

        foreach ($schedule->exhibitors as $exhibitor) {
            $category = $exhibitor->category;
            if (empty($category)) {
                $undefinedExhibitors['Unknown'][] = $exhibitor;
            } else {
                $sortedExhibitors[$category][] = $exhibitor;
            }
        }
        ksort($sortedExhibitors);
        $sortedExhibitors = array_merge($sortedExhibitors, $undefinedExhibitors);

        $social_settings = $this->getSocialSettings($schedule);

        return Inertia::render('Public/views/ExhibitorsPage', [
            'uuid' => $uuid,
            'scheduleName' => $schedule->name,
            'socialSettings' => $social_settings,
            'exhibitors' => $sortedExhibitors,
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
            return back();
        }

        $sortedGuests = [];
        $undefinedGuests = [];

        foreach ($schedule->guests as $guest) {
            $category = $guest->category;
            if (empty($category)) {
                $undefinedGuests['Unknown'][] = $guest;
            } else {
                $sortedGuests[$category][] = $guest;
            }
        }
        ksort($sortedGuests);
        $sortedGuests = array_merge($sortedGuests, $undefinedGuests);

        $social_settings = $this->getSocialSettings($schedule);

        return Inertia::render('Public/views/GuestsPage', [
            'uuid' => $uuid,
            'scheduleName' => $schedule->name,
            'socialSettings' => $social_settings,
            'guests' => $sortedGuests,
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
            return back();
        }

        $social_settings = $this->getSocialSettings($schedule);

        return Inertia::render('Public/views/MapsPage', [
            'uuid' => $uuid,
            'scheduleName' => $schedule->name,
            'socialSettings' => $social_settings,
            'maps' => $schedule->maps,
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
            return back();
        }

        $social_settings = $this->getSocialSettings($schedule);

        return Inertia::render('Public/views/RulesPage', [
            'uuid' => $uuid,
            'scheduleName' => $schedule->name,
            'socialSettings' => $social_settings,
            'rules' => $schedule->rules,
        ])->withViewData(['title' => 'Rules', 'schedule_name' => $schedule->name]);
    }

    /**
     * Gets the schedule social links and returns it as a setup array.
     * 
     * @param Schedule  $schedule
     * @return array
     */
    private function getSocialSettings($schedule) {
        $return_array = [];
        if (!empty($schedule->social_fb)) {
            $return_array['fb'] = $schedule->social_fb;
        }

        if (!empty($schedule->social_tw)) {
            $return_array['tw'] = $schedule->social_tw;
        }

        if (!empty($schedule->social_ig)) {
            $return_array['ig'] = $schedule->social_ig;
        }

        if (!empty($schedule->social_web)) {
            $return_array['web'] = $schedule->social_web;
        }
        

        return $return_array;
    }
}
