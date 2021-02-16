<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'name',
        'user_id',
        'start_date',
        'end_date',
        'social_fb',
        'social_tw',
        'social_ig',
        'social_web',
        'is_live',
        'public_string',
    ];
    public $timestamps = false;

    public function user() {
        return $this->belongsTo('App\User');
    }
}
