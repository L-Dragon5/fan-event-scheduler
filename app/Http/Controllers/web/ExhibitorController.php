<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Http\Request;
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
        $request->validate([
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
            'category' => 'string|nullable',
            'url' => 'url|nullable',
        ]);

        if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'exhibitors', 'name')) {
            return back()->withErrors('Exhibitor already exists with this name');
        }

        $exhibitor = new Exhibitor;
        $exhibitor->schedule_id = $request->scheduleId;
        $exhibitor->name = $request->name;
        $exhibitor->category = $request->category;
        $exhibitor->url = $request->url;
        $success = $exhibitor->save();

        if ($success) {
            return back()->with('message', 'Created new exhibitor');
        } else {
            return back()->withErrors('Something went wrong while trying to create a new exhibitor');
        }
    }

    /**
     * Update the exhibitor content.
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
            'category' => 'string|nullable',
            'url' => 'url|nullable',
        ]);

        try {
            $exhibitor = Exhibitor::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            
            if (strcmp($request->name, $exhibitor->name) !== 0) {
                if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'exhibitors', 'name')) {
                    return back()->withErrors('Exhibitor already exists with this name');
                } else {
                    $exhibitor->name = $request->name;
                }
            }
            
            $exhibitor->category = $request->category;
            $exhibitor->url = $request->url;
            $success = $exhibitor->save();

            if ($success) {
                return back()->with('message', 'Updated exhibitor');
            } else {
                return back()->withErrors('Something went wrong while trying to update exhibitor');
            }
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find exhibitor');
        }
    }

    /**
     * Remove exhibitor by id.
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
            $exhibitor = Exhibitor::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            $exhibitor->delete();
            
            return back()->with('message', 'Removed exhibitor');
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find exhibitor');
        }
    }
}
