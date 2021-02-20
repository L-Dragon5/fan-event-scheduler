<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spark\Billable;

class User extends Authenticatable
{
    use Billable, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password',
    ];
    
    protected $casts = [
        'trial_ends_at' => 'datetime',
    ];

    public function schedule() {
        return $this->hasMany(Schedule::class);
    }

    public function getNameAttribute() {
        return $this->attributes['email'];
    }
}
