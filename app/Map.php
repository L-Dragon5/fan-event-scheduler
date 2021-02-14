<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Map extends Model
{
    protected $fillable = ['title', 'image'];
    public $timestamps = false;

    public function schedule() {
        return $this->belongsTo(Schedule::class);
    }
}
