<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    protected $fillable = ['schedule_id', 'title', 'description'];
    public $timestamps = false;

    public function schedule() {
        return $this->belongsTo(Schedule::class);
    }
}
