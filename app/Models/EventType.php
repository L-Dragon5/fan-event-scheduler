<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventType extends Model
{
    protected $fillable = ['schedule_id', 'name', 'color'];
    public $timestamps = false;

    public function schedule() {
        return $this->belongsTo(Schedule::class);
    }
    
    public function event() {
        return $this->belongsToMany(Event::class, 'pivot_events_types', 'event_type_id', 'event_id');
    }
}
