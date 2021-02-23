<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\EventType;

class EventTypeController extends Controller
{
    /**
     * Retrieve all event types by schedule.
     * 
     * @param  integer  $scheduleId
     * @return \Illuminate\Http\Response
     */
    public function index($scheduleId) {
        $eventTypes = EventType::where('schedule_id', $scheduleId)->orderBy('name', 'ASC')->get();

        return Inertia::render('Admin/EventTypes', [
            'eventTypes' => $eventTypes,
            'scheduleId' => $scheduleId,
        ])->withViewData(['title' => 'Event Types']);
    }

    /**
     * Store event type in DB.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $request->validate([
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
            'color' => 'string|required',
        ]);

        if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'event_types', 'name')) {
            return back()->withErrors('Event Type already exists with this name');
        }

        $event_type = new EventType;
        $event_type->schedule_id = $request->scheduleId;
        $event_type->name = $request->name;
        $event_type->color = str_replace('#', '', $request->color);
        $success = $event_type->save();

        if ($success) {
            return back()->with('message', 'Created new event type');
        } else {
            return back()->withErrors('Something went wrong while trying to create a new event type');
        }
    }

    /**
     * Update the event type.
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
            'color' => 'string|required',
        ]);

        try {
            $event_type = EventType::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            
            if (strcmp($request->name, $event_type->name) !== 0) {
                if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'event_types', 'name')) {
                    return back()->withErrors('Event Type already exists with this name');
                } else {
                    $event_type->name = $request->name;
                }
            }

            $event_type->color = str_replace('#', '', $request->color);

            $success = $event_type->save();

            if ($success) {
                return back()->with('message', 'Updated event type');
            } else {
                return back()->withErrors('Something went wrong while trying to update event type');
            }
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find event type');
        }
    }

    /**
     * Remove event type by id.
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
            $event_type = EventType::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            $event_type->delete();
            
            return back()->with('message', 'Removed event type');
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find event type');
        }
    }
}
