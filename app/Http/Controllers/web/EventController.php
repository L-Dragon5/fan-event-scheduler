<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Event;

class EventController extends Controller
{
    /**
     * Retrieve all events by schedule.
     * 
     * @param  integer  $scheduleId
     * @return \Illuminate\Http\Response
     */
    public function index($scheduleId) {
        $events = Event::where('schedule_id', $scheduleId)->orderBy('created_at', 'DESC')->get();

        // Set all events to location
        foreach ($events as $event) {
            $event->location_name = $event->location->name;
        }

        return Inertia::render('Admin/Events', [
            'events' => $events,
            'scheduleId' => $scheduleId,
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
            'schedule_id' => 'numeric|required',
            'name' => 'string|required',
            'date' => 'date|required',
            'time_start' => 'date_format:H:i:s|required',
            'time_end' => 'date_format:H:i:s|after:time_start|required',
            'location_id' => 'numeric|required',
            'description' => 'string|nullable',
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
        $event->location_id = $request->location_id;
        $event->description = $request->description;
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
            'schedule_id' => 'numeric|required',
            'name' => 'string|required',
            'date' => 'date|required',
            'time_start' => 'date_format:H:i:s|required',
            'time_end' => 'date_format:H:i:s|after:time_start|required',
            'location_id' => 'numeric|required',
            'description' => 'string|nullable',
            'is_cancelled' => 'boolean|required',
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
            $event->location_id = $request->location_id;
            $event->description = $request->description;
            $event->is_cancelled = $request->is_cancelled;
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
