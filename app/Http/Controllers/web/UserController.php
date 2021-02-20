<?php

namespace App\Http\Controllers\web;

use Inertia\Inertia;
use App\Models\User;
use App\Mail\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Attempt to login user.
     * 
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request) {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], TRUE)) {
            return Inertia::location(route('admin-base'));
        } else {
            return back()->withErrors(['Incorrect login credentials provided']);
        }
    }

    /**
     * Register a user account.
     * 
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'g-recaptcha-response' => 'required|recaptcha',
        ]);

        $existing_user = User::where('email', $request->email)->first();
        if (!empty($existing_user)) {
            return back()->withErrors(['E-mail is already registered']);
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);

        return redirect()->route('login');
    }

    /**
     * Updated user account password.
     * 
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'string|required',
            'new_password' => 'string|required',
        ]);

        $existing_user = User::where('id', Auth::user()->id)->first();
        if (empty($existing_user)) {
            return back()->withErrors(['User doesn\'t exist']);
        } else {
            if (Hash::check($request->old_password, $existing_user->password)) {
                $existing_user->password = Hash::make($request->new_password);
                $success = $existing_user->save();

                if ($success) {
                    return back()->with('message', 'Updated password successfully');
                } else {
                    return back()->withErrors(['Something went wrong while saving']);
                }
            } else {
                return back()->withErrors(['Old password doesn\'t match']);
            }
        }
    }

    /**
     * Email reset password to specified email address.
     * 
     * @return \Illuminate\Http\Response
     */
    public function forgotPassword(Request $request) {
        $request->validate([
            'email' => 'required|email',
        ]);

        $existing_user = User::where('email', $request->email)->first();

        // If user by that email address doesn't exist, do nothing.
        // If it exists, reset password and send email.
        if (!empty($existing_user)) {
            $new_password = Str::random(16);
            $existing_user->password = Hash::make($new_password);
            $success = $existing_user->save();

            if ($success) {
                // Send email to specified email address.
                Mail::to($existing_user->email)->send(new ResetPassword($new_password));

                return back()->with('message', 'Sent password reset email');
            } else {
                return back()->withErrors(['Something went wrong while saving']);
            }
        }

        return back()->with('message', 'Sent password reset email');
    }
}
