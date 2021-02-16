<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'schedule_id',
        'name',
        'date',
        'time_start',
        'time_end',
        'location_id',
        'description',
        'is_cancelled'
    ];

    public function schedule() {
        return $this->belongsTo(Schedule::class);
    }

    public function location() {
        return $this->belongsTo(Location::class);
    }

    public function event_types() {
        return $this->belongsToMany(EventType::class, 'pivot_events_types', 'event_id', 'event_type_id');
    }
}
