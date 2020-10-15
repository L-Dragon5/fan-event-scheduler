<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLogin() {
        if (Auth::check()) {
            return redirect()->route('admin-base');
        }

        return Inertia::render('Public/Login')->withViewData(['title' => 'Login']);
    }
}
