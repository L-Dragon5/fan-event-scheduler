<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Models\Mail\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Attempt to login user.
     * 
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request) {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            return true;
            //return return_json_message($user->createToken('SaaSEventSchedule')->accessToken, self::STATUS_SUCCESS);
        } else {
            return return_json_message('Incorrect login credentials provided', self::STATUS_BAD_REQUEST);
        }
    }

    /**
     * Register a user account.
     * 
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'g-recaptcha-response' => 'required|recaptcha',
        ]);

        if ($validator->fails()) {
            return return_json_message($validator->errors(), self::STATUS_BAD_REQUEST);
        }

        $existing_user = User::where('email', $request->email)->first();
        if (!empty($existing_user)) {
            return return_json_message(['email' => 'E-mail is already registered'], self::STATUS_BAD_REQUEST);
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);

        return true;
        //return return_json_message($user->createToken('SaaSEventSchedule')->accessToken, self::STATUS_CREATED);
    }

    /**
     * Updated user account password.
     * 
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'string|required',
            'new_password' => 'string|required',
        ]);

        if ($validator->fails()) {
            return return_json_message($validator->errors(), self::STATUS_BAD_REQUEST);
        }

        $existing_user = User::where('id', Auth::user()->id)->first();
        if (empty($existing_user)) {
            return return_json_message('User doesn\'t exist', self::STATUS_BAD_REQUEST);
        } else {
            if (Hash::check($request->old_password, $existing_user->password)) {
                $existing_user->password = Hash::make($request->new_password);
                $success = $existing_user->save();

                if ($success) {
                    return return_json_message('Password updated successfully', self::STATUS_SUCCESS);
                } else {
                    return return_json_message('Something went wrong trying to update the password', self::STATUS_UNPROCESSABLE);
                }
            } else {
                return return_json_message('Old password doesn\'t match', self::STATUS_BAD_REQUEST);
            }
        }
    }

    /**
     * Email reset password to specified email address.
     * 
     * @return \Illuminate\Http\Response
     */
    public function forgotPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return return_json_message($validator->errors(), self::STATUS_BAD_REQUEST);
        }

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

                return return_json_message('Email with reset password has been sent.', self::STATUS_SUCCESS);
            } else {
                return return_json_message('Something went wrong trying to reset your password.', self::STATUS_UNPROCESSABLE);
            }
        }

        return return_json_message('Email with reset password has been sent.', self::STATUS_SUCCESS);
    }

    /**
     * Check if user is signed in and has access.
     * 
     * @return \Illuminate\Http\Response
     */
    public function checkUser(Request $request) {
        $token = $request->token;

        if (empty($token) || $token === 'null') {
            return return_json_message(route('login'), self::STATUS_BAD_REQUEST);
        } else {
            $user = auth()->guard('api')->user();
            if (empty($user)) {
                return return_json_message(route('login'), self::STATUS_BAD_REQUEST);
            }
        }

        return return_json_message('User verified', self::STATUS_SUCCESS);
    }
}
