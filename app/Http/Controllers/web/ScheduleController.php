<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ScheduleController extends Controller
{
    /**
     * Display a listing of schedules.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user_id = Auth::id();
        $schedules = Schedule::where('user_id', $user_id)->orderBy('name', 'ASC')->get();

        $add_schedule_button = new Schedule;
        $add_schedule_button->image = 'add';
        $add_schedule_button->name = 'Add Schedule';
        $schedules->push($add_schedule_button);

        return Inertia::render('Admin/Schedules', [
            'schedules' => $schedules
        ])->withViewData(['title' => 'Schedules']);
    }

    /**
     * Display form with schedule's settings.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function settingsIndex($scheduleId) {
        try {
            $schedule = Schedule::findOrFail($scheduleId);
            
            if (!empty($schedule->public_string)) {
                $schedule->public_link = $this->createPublicLinkUrl($schedule->public_string);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->withErrors(['Invalid schedule id']);
        }

        return Inertia::render('Admin/Settings', [
            'scheduleId' => $scheduleId,
            'schedule' => $schedule,
        ])->withViewData(['title' => 'Schedule Settings']);
    }

    /**
     * Display the Schedule admin dashboard.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($scheduleId)
    {
        try {
            Schedule::findOrFail($scheduleId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->withErrors(['Invalid schedule id']);
        }
        
        return Inertia::render('Admin/Dashboard', [
            'scheduleId' => $scheduleId
        ])->withViewData(['title' => 'Dashboard']);
    }

    /**
     * Display the Public Schedule area.
     * 
     * @param uuid  $uuid
     * @return \Illuminate\Http\Response
     */
    public function showPublic($uuid) {
        try {
            $schedule = Schedule::where('public_string', '=', $uuid)
                ->where('is_live', '=', 1)
                ->with(['events', 'exhibitors', 'guests', 'locations', 'maps', 'rules'])
                ->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect('/');
        }

        return Inertia::render('Public/PublicSchedule', [
            'schedule' => $schedule
        ])->withViewData(['title' => $schedule->name]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'string|required',
            'start_date' => 'date|required',
            'end_date' => 'date|after_or_equal:start_date|required',
            'social_fb' => 'string|nullable',
            'social_tw' => 'string|nullable',
            'social_ig' => 'string|nullable',
            'social_web' => 'string|nullable',
        ]);

        $user_id = Auth::id();

        if (check_for_duplicate(['user_id' => $user_id], $request->name, 'schedules', 'name')) {
            return back()->withErrors(['Schedule already exists with this name']);
        }

        $existing_schedule_count = Schedule::where('user_id', '=', $user_id)->count();
        if ($existing_schedule_count > 0) {
            return back()->withErrors(['Not allowed to create more than 1 schedule']);
        }

        $schedule = new Schedule;
        $schedule->user_id = $user_id;
        $schedule->name = $request->name;
        $schedule->start_date = $request->start_date;
        $schedule->end_date = $request->end_date;
        $schedule->social_fb = $request->social_fb;
        $schedule->social_tw = $request->social_tw;
        $schedule->social_ig = $request->social_ig;
        $schedule->social_web = $request->social_web;

        $success = $schedule->save();

        if ($success) {
            return back()->with('message', 'Created new schedule succesfully');
        } else {
            return back()->withErrors(['Something went wrong while trying to create a new schedule']);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'numeric|required',
            'name' => 'string|required',
            'start_date' => 'date|required',
            'end_date' => 'date|after_or_equal:start_date|required',
            'social_fb' => 'string|nullable',
            'social_tw' => 'string|nullable',
            'social_ig' => 'string|nullable',
            'social_web' => 'string|nullable',
            'is_live' => 'boolean|required',
        ]);

        $user_id = Auth::id();

        try {
            $schedule = Schedule::findOrFail($request->id);

            // If they want to change name
            if ($request->has('name')) {
                $trimmed_name = $request->name;

                // Check if new title is same as old title
                if(check_for_duplicate(['user_id' => $user_id], $request->title, 'schedules', 'name')) {
                    return back()->withErrors(['Schedule name already exists']);
                } else {
                    $schedule->name = $trimmed_name;
                }
            }

            $schedule->start_date = $request->start_date;
            $schedule->end_date = $request->end_date;
            $schedule->social_fb = $request->social_fb;
            $schedule->social_tw = $request->social_tw;
            $schedule->social_ig = $request->social_ig;
            $schedule->social_web = $request->social_web;
            $schedule->is_live = $request->is_live;

            // If the schedule is set to be publically visible, but there's no public identifier, create one.
            // If the schedule is set to be hidden, but there's an identifier, remove it.
            if ($schedule->is_live && empty($schedule->public_string)) {
                $schedule->public_string = (string) Str::uuid();
            } elseif (!$schedule->is_live && !empty($schedule->public_string)) {
                $schedule->public_string = NULL;
            }

            $success = $schedule->save();

            if ($success) {
                return back()->with('message', 'Updated schedule successfully');
            } else {
                return back()->withErrors(['Something went wrong while trying to update schedule']);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->withErrors(['Invalid schedule id']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'numeric|required'
        ]);

        try {
            $schedule = Schedule::findOrFail($id);
            $schedule->delete();
    
            return back()->with('message', 'Deleted schedule successfully');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->withErrors(['Invalid schedule id']);
        }
    }

    /**
     * Create public link using public_string UUID.
     */
    private function createPublicLinkUrl($uuid) {
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
            $protocol = 'https';
        } else {
            $protocol = 'http';
        }
      
        return $protocol . '://' . $_SERVER['HTTP_HOST'] . '/s/' . $uuid;
    }
}
