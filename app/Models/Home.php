<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
    protected $table = 'home';
    protected $fillable = ['content'];

    public function schedule() {
        return $this->belongsTo(Schedule::class);
    }
}
