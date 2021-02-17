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
        return $this->belongsTo(User::class);
    }

    public function events() {
        return $this->hasMany(Event::class);
    }

    public function exhibitors() {
        return $this->hasMany(Exhibitor::class);
    }

    public function guests() {
        return $this->hasMany(Guest::class);
    }

    public function locations() {
        return $this->hasMany(Location::class);
    }

    public function maps() {
        return $this->hasMany(Map::class);
    }

    public function rules() {
        return $this->hasMany(Rule::class);
    }
}
