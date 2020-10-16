<?php

namespace App\Http\Controllers\api;

use App\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user_id = Auth::user()->id;
        $schedules = Schedule::where('user_id', $user_id)->orderBy('name', 'ASC')->get();

        return $schedules;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|required',
        ]);

        if ($validator->fails()) {
            return return_json_message($validator->errors(), self::STATUS_BAD_REQUEST);
        }

        $user_id = Auth::user()->id;

        if (check_for_duplicate(['user_id' => $user_id], $request->name, 'schedules', 'name')) {
            return return_json_message('Schedule already exists with this name', self::STATUS_BAD_REQUEST);
        }

        $existing_schedule_count = Schedule::count();
        if ($existing_schedule_count > 0) {
            return return_json_message('Not allowed to create more than 1 schedule', self::STATUS_FORBIDDEN);
        }

        $schedule = new Schedule;
        $schedule->user_id = $user_id;
        $schedule->name = trim($request->name);

        $success = $schedule->save();

        if ($success) {
            return return_json_message('Created new schedule succesfully', self::STATUS_SUCCESS);
        } else {
            return return_json_message('Something went wrong while trying to create a new schedule', self::STATUS_UNPROCESSABLE);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $schedule = null;

        try {
            $schedule = Series::findOrFail($id);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return return_json_message('Invalid schedule id', self::STATUS_BAD_REQUEST);
        }
        
        return $schedule;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|required',
        ]);

        if ($validator->fails()) {
            return return_json_message($validator->errors(), self::STATUS_BAD_REQUEST);
        }

        $user_id = Auth::user()->id;

        try {
            $schedule = Schedule::findOrFail($id);

            if ($schedule->user_id === $user_id) {
                // If they want to change title
                if ($request->has('name')) {
                    $trimmed_name = trim($request->name);

                    // Check if new title is same as old title
                    if ($trimmed_name === $schedule->name) {
                        // Do nothing
                    } else if(check_for_duplicate(['user_id' => $user_id], $request->title, 'schedules', 'name')) {
                        return return_json_message('Schedule name already exists.', self::STATUS_BAD_REQUEST);
                    } else {
                        $schedule->name = $trimmed_name;
                    }
                }

                $success = $schedule->save();

                if ($success) {
                    return return_json_message('Updated series succesfully', self::STATUS_SUCCESS, ['schedule' => $schedule]);
                } else {
                    return return_json_message('Something went wrong while trying to update series', self::STATUS_UNPROCESSABLE);
                }
            } else {
                return return_json_message('You do not have permission to edit this schedule', self::STATUS_UNAUTHORIZED);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return return_json_message('Invalid schedule id', self::STATUS_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user_id = Auth::user()->id;

        try {
            $schedule = Schedule::findOrFail($id);
            $success = false;

            if ($schedule->user_id === $user_id) {
                $success = $schedule->delete();
            } else {
                return return_json_message('You do not have permission to delete this schedule', self::STATUS_UNAUTHORIZED);
            }
    
            if ($success) {
                return return_json_message('Deleted schedule succesfully', self::STATUS_SUCCESS);
            } else {
                return return_json_message('Something went wrong while trying to remove schedule', self::STATUS_UNPROCESSABLE);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return return_json_message('Invalid schedule id', self::STATUS_BAD_REQUEST);
        }
    }
}
