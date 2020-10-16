<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
        $validator = Validator::make($request->all(), [
            'name' => 'string|required',
            'scheduleId' => 'numeric|required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'locations', 'name')) {
            return back()->withErrors(['error' => ['Location already exists with this name']]);
        }

        $location = new Location;
        $location->schedule_id = $request->scheduleId;
        $location->name = trim($request->name);

        $success = $location->save();

        if ($success) {
            return back()->with(['message' => 'Created new location succesfully']);
        } else {
            return back()->withErrors(['error' => ['Something went wrong while trying to create a new location']]);
        }
    }

    public function update() {}
    public function destroy() {}
}
