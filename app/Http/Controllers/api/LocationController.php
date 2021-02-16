<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Models\Location;

class LocationController extends Controller
{
    /**
     * Retrieve all locations.
     */
    public function index() {
        $locations = Location::all();

        return $locations;
    }
}
