<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Rule;

class RuleController extends Controller
{
    /**
     * Retrieve all rules.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index($scheduleId) {
        $rules = Rule::where('schedule_id', $scheduleId)->orderBy('title', 'ASC')->get();

        return Inertia::render('Admin/Rules', [
            'rules' => $rules,
            'scheduleId' => $scheduleId,
        ])->withViewData(['title' => 'Rules']);
    }

    /**
     * Store rule in DB.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $request->validate([
            'scheduleId' => 'numeric|required',
            'title' => 'string|required',
            'description' => 'string|nullable'
        ]);

        if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->title, 'rules', 'title')) {
            return back()->withErrors('Rule already exists with this title');
        }

        $rule = new Rule;
        $rule->schedule_id = $request->scheduleId;
        $rule->title = $request->title;
        $rule->description = $request->description;

        $success = $rule->save();

        if ($success) {
            return back()->with('message', 'Created new rule');
        } else {
            return back()->withErrors(['Something went wrong while trying to create a new rule']);
        }
    }

    /**
     * Update the rule content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'numeric|required',
            'scheduleId' => 'numeric|required',
            'title' => 'string|required',
            'description' => 'string|nullable'
        ]);

        try {
            $rule = Rule::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();

            if (strcmp(trim($request->title), $location->title) !== 0) {
                if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->title, 'rules', 'title')) {
                    return back()->withErrors('Rule already exists with this title');
                } else {
                    $rule->name = trim($request->title);
                }
            }

            $rule->description = $request->description;
            $success = $rule->save();

            if ($success) {
                return back()->with('message', 'Updated rule');
            } else {
                return back()->withErrors('Something went wrong while trying to update rule');
            }
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find rule');
        }
    }

    /**
     * Remove rule by id.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request) {
        $request->validate([
            'id' => 'numeric|required',
            'scheduleId' => 'numeric|required',
        ]);

        try {
            $rule = Rule::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            $rule->delete();
            
            return back()->with('message', 'Removed rule');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->withErrors('Could not find rule');
        }
    }
}
