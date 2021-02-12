<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Location;

class LocationController extends Controller
{
    /**
     * Retrieve all locations.
     * 
     * @return \Illuminate\Http\Response
     */
    public function index($scheduleId) {
        $locations = Location::where('schedule_id', $scheduleId)->orderBy('name', 'ASC')->get();

        return Inertia::render('Admin/Locations', [
            'locations' => $locations,
            'scheduleId' => $scheduleId,
        ])->withViewData(['title' => 'Locations']);
    }

    /**
     * Store a newly created location in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'string|required',
            'scheduleId' => 'numeric|required',
        ]);

        if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'locations', 'name')) {
            return back()->withErrors('Location already exists with this name');
        }

        $location = new Location;
        $location->schedule_id = $request->scheduleId;
        $location->name = trim($request->name);

        $success = $location->save();

        if ($success) {
            return back()->with('message', 'Created new location');
        } else {
            return back()->withErrors(['Something went wrong while trying to create a new location']);
        }
    }

    /**
     * Update an existing location in storage.
     * 
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request) {
        $request->validate([
            'id' => 'numeric|required',
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
        ]);

        if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'locations', 'name')) {
            return back()->withErrors('Location already exists with this name');
        }

        try {
            $location = Location::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            $location->name = trim($request->name);
            $success = $location->save();

            if ($success) {
                return back()->with('message', 'Updated location');
            } else {
                return back()->withErrors('Something went wrong while trying to update location');
            }
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find location');
        }
    }

    /**
     * Remove an existing location in storage.
     * 
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request) {
        $request->validate([
            'id' => 'numeric|required',
            'scheduleId' => 'numeric|required',
        ]);

        try {
            $location = Location::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            $location->delete();
        
            return back()->with('message', 'Removed location');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->withErrors('Could not find location');
        }
    }
}
