<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Exhibitor;

class ExhibitorController extends Controller
{
    /**
     * Retrieve all exhibitors.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index($scheduleId) {
        $exhibitors = Exhibitor::where('schedule_id', $scheduleId)->orderBy('name', 'ASC')->get();

        return Inertia::render('Admin/Exhibitors', [
            'exhibitors' => $exhibitors,
            'scheduleId' => $scheduleId,
        ])->withViewData(['title' => 'Exhibitors']);
    }

    /**
     * Store exhibitor in DB.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'string|required',
            'category' => 'string|nullable',
            'url' => 'url|nullable',
        ]);

        if($validator->fails()) {
            return return_json_message($validator->errors(), $this->errorStatus);
        }

        $exhibitor = new Exhibitor;
        $exhibitor->name = $request->name;
        $exhibitor->category = $request->category;
        $exhibitor->url = $request->url;
        $success = $exhibitor->save();

        if ($success) {
            return return_json_message('Created new exhibitor succesfully', $this->successStatus);
        } else {
            return return_json_message('Something went wrong while trying to create a new exhibitor', 401);
        }
    }

    /**
     * Update the exhibitor content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|required',
            'category' => 'string|nullable',
            'url' => 'url|nullable',
        ]);

        if($validator->fails()) {
            return return_json_message($validator->errors(), $this->errorStatus);
        }

        try {
            $exhibitor = Exhibitor::findOrFail($id);
            $exhibitor->name = $request->name;
            $exhibitor->category = $request->category;
            $exhibitor->url = $request->url;
            $success = $exhibitor->save();

            if ($success) {
                return return_json_message('Updated succesfully', $this->successStatus);
            } else {
                return return_json_message('Something went wrong while trying to update', 401);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return return_json_message('Invalid exhibitor id', 401);
        }
    }

    /**
     * Remove exhibitor by id.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id) {
        $success = Exhibitor::destroy($id);

        if ($success) {
            return return_json_message('Deleted succesfully', $this->successStatus);
        } else {
            return return_json_message('Did not find a exhibitor to remove', 401);
        }
    }
}
