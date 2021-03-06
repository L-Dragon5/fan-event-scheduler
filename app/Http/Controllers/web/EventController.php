<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventType;
use App\Models\Location;
use App\Models\Schedule;

class EventController extends Controller
{
    /**
     * Retrieve all events by schedule.
     * 
     * @param  integer  $scheduleId
     * @return \Illuminate\Http\Response
     */
    public function index($scheduleId) {
        try {
            $schedule = Schedule::findOrFail($scheduleId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->withErrors(['Could not find schedule']);
        }
    
        $events = Event::where('schedule_id', $scheduleId)
            ->with(['location', 'event_types'])
            ->orderBy('date', 'ASC')
            ->orderBy('name', 'ASC')
            ->get();
        $available_locations = [];
        $available_event_types = [];

        foreach (Location::where('schedule_id', $scheduleId)->get() as $location) {
            $available_locations[] = ['id' => $location->id, 'name' => $location->name];
        }

        foreach (EventType::where('schedule_id', $scheduleId)->get() as $event_type) {
            $available_event_types[] = ['id' => $event_type->id, 'name' => $event_type->name];
        }

        // Set all events to location
        foreach ($events as $event) {
            if (!empty($event->location)) {
                $event->location_name = $event->location->name;
            }

            $event_type_list = [];
            foreach ($event->event_types as $event_type) {
                $event_type_list[] = $event_type->id;
            }

            $event->event_type_list = $event_type_list;
        }

        return Inertia::render('Admin/Events', [
            'scheduleId' => $scheduleId,
            'availableLocations' => $available_locations,
            'availableEventTypes' => $available_event_types,
            'minDate' => $schedule->start_date,
            'maxDate' => $schedule->end_date,
            'events' => $events,
        ])->withViewData(['title' => 'Events']);
    }

    /**
     * Get event by id.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function view($id) {
        try {
            $event = Event::findOrFail($id);
            $event_type_names = [];

            foreach ($event->event_types as $event_type) {
                $event_type_names[] = ['id' => $event_type->id, 'name' => $event_type->name];
            }
    
            $event->location_name = $event->location->name;
            $event->event_type_names = $event_type_names;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->withErrors('Could not find event');
        }

        return $event;
    }

    /**
     * Store event in DB.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $request->validate([
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
            'date' => 'date|required',
            'location_id' => 'numeric|nullable',
            'description' => 'string|nullable',
        ]);

        if (strlen($request->time_start) <= 5) { 
            $request->merge(['time_start' => $request->time_start . ':00']);
        }
        if (strlen($request->time_end) <= 5) {
            $request->merge(['time_end' => $request->time_end . ':00']);
        }

        $request->validate([
            'time_start' => 'date_format:H:i:s|required',
            'time_end' => 'date_format:H:i:s|after:time_start|required',
        ]);

        if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'events', 'name')) {
            return back()->withErrors('Event already exists with this name');
        }

        $event = new Event;
        $event->schedule_id = $request->scheduleId;
        $event->name = $request->name;
        $event->date = $request->date;
        $event->time_start = $request->time_start;
        $event->time_end = $request->time_end;
        if ($request->location_id !== 0) { 
            $event->location_id = $request->location_id; 
        } else { 
            $request->location_id = null; 
        }
        $event->description = $request->description;

        // Saving event types
        if (!empty($request->event_types)) {
            $request->merge(['event_types' => explode(',', $request->event_types)]);
            $event->event_types()->attach($request->event_types);
        }

        $success = $event->save();

        if ($success) {
            return back()->with('message', 'Created new event');
        } else {
            return back()->withErrors('Something went wrong while trying to create a new event');
        }
    }

    /**
     * Update the event content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'numeric|required',
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
            'date' => 'date|required',
            'location_id' => 'numeric|nullable',
            'description' => 'string|nullable',
            'is_cancelled' => 'boolean|required',
        ]);

        if (strlen($request->time_start) <= 5) { 
            $request->merge(['time_start' => $request->time_start . ':00']);
        }
        if (strlen($request->time_end) <= 5) {
            $request->merge(['time_end' => $request->time_end . ':00']);
        }

        $request->validate([
            'time_start' => 'date_format:H:i:s|required',
            'time_end' => 'date_format:H:i:s|after:time_start|required',
        ]);

        try {
            $event = Event::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            
            if (strcmp($request->name, $event->name) !== 0) {
                if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'events', 'name')) {
                    return back()->withErrors('Event already exists with this name');
                } else {
                    $event->name = $request->name;
                }
            }
            
            $event->date = $request->date;
            $event->time_start = $request->time_start;
            $event->time_end = $request->time_end;
            if ($request->location_id !== 0) { 
                $event->location_id = $request->location_id; 
            } else { 
                $request->location_id = null;
            }
            $event->description = $request->description;
            $event->is_cancelled = $request->is_cancelled;

            // Saving event types
            if (empty($request->event_types)) {
                $event->event_types()->detach();
            } else {
                $request->merge(['event_types' => explode(',', $request->event_types)]);
                $event->event_types()->sync($request->event_types);
            }

            $success = $event->save();

            if ($success) {
                return back()->with('message', 'Updated event');
            } else {
                return back()->withErrors('Something went wrong while trying to update event');
            }
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find event');
        }
    }

    /**
     * Remove event by id.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request) {
        $request->validate([
            'id' => 'numeric|required',
            'scheduleId' => 'numeric|required',
        ]);

        try {
            $event = Event::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            $event->delete();
            
            return back()->with('message', 'Removed event');
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find event');
        }
    }
}
