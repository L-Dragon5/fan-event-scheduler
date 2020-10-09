<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'name',
        'user_id',
    ];
    public $timestamps = false;

    public function user() {
        return $this->belongsTo('App\User');
    }
}
