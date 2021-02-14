<?php

namespace App\Http\Controllers\web;

use App\Map;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MapController extends Controller
{
    /**
     * Get all map ids and names.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($scheduleId) {
        $maps = Map::where('schedule_id', $scheduleId)->orderBy('name', 'ASC')->get();

        return Inertia::render('Admin/Maps', [
            'maps' => $maps,
            'scheduleId' => $scheduleId,
        ])->withViewData(['title' => 'Maps']);
    }

    /**
     * Store map in DB.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $request->validate([
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
            'image' => 'string|nullable',
        ]);

        if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'maps', 'name')) {
            return back()->withErrors('Map already exists with this name');
        }

        $map = new Map;
        $map->name = $request->name;

        // TODO: Image upload and save (save_image_uploaded function)
        /*
        $image = file_get_contents($request->image);
        $image_data = base64_encode($image);
        
        $final_img = 'data:image/' . $request->image->extension() . ';base64,' . $image_data;

        $map->image = $final_img;
        */

        $success = $map->save();

        if ($success) {
            return return_json_message('Created new map succesfully', $this->successStatus);
        } else {
            return return_json_message('Something went wrong while trying to create a new map', 401);
        }
    }

    /**
     * Update the map content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'id' => 'numeric|required',
            'scheduleId' => 'numeric|required',
            'name' => 'string|required',
        ]);

        try {
            $map = Map::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            
            if (strcmp($request->name, $map->name) !== 0) {
                if (check_for_duplicate(['schedule_id' => $request->scheduleId], $request->name, 'maps', 'name')) {
                    return back()->withErrors('Map already exists with this name');
                } else {
                    $map->name = $request->name;
                }
            }
            
            $success = $map->save();

            if ($success) {
                return back()->with('message', 'Updated map');
            } else {
                return back()->withErrors('Something went wrong while trying to update map');
            }
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find map');
        }
    }

    /**
     * Remove map by id.
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
            $map = Map::where('id', '=', $request->id)
                ->where('schedule_id', '=', $request->scheduleId)
                ->firstOrFail();
            $map->delete();
            
            return back()->with('message', 'Removed map');
        } catch (\Illuminate\Database\Eloqeunt\ModelNotFoundException $e) {
            return back()->withErrors('Could not find map');
        }
    }
}
