<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'schedule_id',
        'title',
        'event_type',
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
        return $this->hasOne(Location::class);
    }

    public function event_types() {
        return $this->hasMany(EventType::class);
    }
}
