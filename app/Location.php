<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = ['scheduleId', 'name', 'url'];
    public $timestamps = false;

    public function schedule() {
        return $this->belongsTo(Schedule::class);
    }
    
    public function event() {
        return $this->belongsToMany(Event::class);
    }
}
