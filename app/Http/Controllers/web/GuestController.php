<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Guest;

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
        $request->validate([
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
            'category' => 'string|required',
            'description' => 'string|nullable',
            'social_fb' => 'string|nullable',
            'social_tw' => 'string|nullable',
            'social_ig' => 'string|nullable',
        ]);

        if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'guests', 'name')) {
            return back()->withErrors('Guest already exists with this name');
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
            return back()->with('message', 'Created new guest');
        } else {
            return back()->withErrors('Something went wrong while trying to create a new guest');
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
        $request->validate([
            'id' => 'numeric|required',
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
            'category' => 'string|required',
            'description' => 'string|nullable',
            'social_fb' => 'string|nullable',
            'social_tw' => 'string|nullable',
            'social_ig' => 'string|nullable',
        ]);

        try {
            $guest = Guest::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();

            if (strcmp($request->name, $guest->name) !== 0) {
                if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'guests', 'name')) {
                    return back()->withErrors('Guest already exists with this name');
                } else {
                    $guest->name = $request->name;
                }
            }
            
            $guest->category = $request->category;
            $guest->description = $request->description;
            $guest->social_fb = $request->social_fb;
            $guest->social_tw = $request->social_tw;
            $guest->social_ig = $request->social_ig;
            $success = $guest->save();

            if ($success) {
                return back()->with('message', 'Updated guest');
            } else {
                return back()->withErrors('Something went wrong while trying to update guest');
            }
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find guest');
        }
    }

    /**
     * Remove guest by id.
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
            $guest = Guest::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            $guest->delete();
            
            return back()->with('message', 'Removed guest');
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find guest');
        }
    }
}
