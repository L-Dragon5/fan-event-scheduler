<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = ['name', 'scheduleId'];
    public $timestamps = false;
    
    public function event() {
        return $this->belongsTo('App\Event');
    }
}
