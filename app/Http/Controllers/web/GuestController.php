<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Guest;

class GuestController extends Controller
{
    /**
     * Get all guests.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($scheduleId) {
        $guests = Guest::where('schedule_id', $scheduleId)->orderBy('name', 'ASC')->get();


        return Inertia::render('Admin/Guests', [
            'guests' => $guests,
            'scheduleId' => $scheduleId,
        ])->withViewData(['title' => 'Guests']);
    }

    /**
     * Store guest in DB.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
            'category' => 'string|nullable',
            'description' => 'string|nullable',
            'social_fb' => 'url|nullable',
            'social_tw' => 'url|nullable',
            'social_ig' => 'url|nullable',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        }

        if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'guests', 'name')) {
            return back()->withErrors(['error' => ['Guest already exists with this name']]);
        }

        $guest = new Guest;
        $guest->schedule_id = $request->scheduleId;
        $guest->name = $request->name;
        $guest->category = $request->category;
        $guest->description = $request->description;
        $guest->social_fb = $request->social_fb;
        $guest->social_tw = $request->social_tw;
        $guest->social_ig = $request->social_ig;
        $success = $guest->save();

        if ($success) {
            return back()->with(['message' => 'Created new guest']);
        } else {
            return back()->withErrors(['error' => ['Something went wrong while trying to create a new guest']]);
        }
    }

    /**
     * Update the guest content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'numeric|required',
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
            'category' => 'string|nullable',
            'description' => 'string|nullable',
            'social_fb' => 'url|nullable',
            'social_tw' => 'url|nullable',
            'social_ig' => 'url|nullable',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        }

        try {
            $guest = Guest::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            $guest->name = $request->name;
            $guest->category = $request->category;
            $guest->description = $request->description;
            $guest->social_fb = $request->social_fb;
            $guest->social_tw = $request->social_tw;
            $guest->social_ig = $request->social_ig;
            $success = $guest->save();

            if ($success) {
                return back()->with(['message' => 'Updated guest']);
            } else {
                return back()->withErrors(['error' => ['Something went wrong while trying to update guest']]);
            }
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors(['errors' => ['Could not find guest']]);
        }
    }

    /**
     * Remove guest by id.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request) {
        $validator = Validator::make($request->all(), [
            'id' => 'numeric|required',
            'scheduleId' => 'numeric|required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        }

        try {
            $guest = Guest::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            $guest->delete();
            
            return back()->with(['message' => 'Removed guest']);
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors(['errors' => ['Could not find guest']]);
        }
    }
}
