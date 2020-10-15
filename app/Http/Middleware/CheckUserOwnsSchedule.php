<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Schedule;

class CheckUserOwnsSchedule
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $schedule_id = $request->route('scheduleId');

        $schedule = Schedule::where([
            ['id', '=', $schedule_id],
            ['user_id', '=', Auth::id()],
        ])->get();

        if (empty($schedule)) {
            return redirect('admin-base');
        }

        return $next($request);
    }
}
