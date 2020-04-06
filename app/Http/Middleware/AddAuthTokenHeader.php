<?php

namespace App\Http\Middleware;

use Closure;

class AddAuthTokenHeader
{
    /**
     * Check for access token cookie for user and use it.
     * 
     * @param \Illuminate\Http\Request  $request
     * @param \Closure  $next
     * @return mixed
     * 
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function handle($request, Closure $next) {
        $cookie_name = env('AUTH_COOKIE_NAME');

        if (!$request->bearerToken()) {
            if ($request->hasCookie($cookie_name)) {
                $token = $request->cookie($cookie_name);

                $request->headers->add([
                    'Authorization' => 'Bearer' . $token
                ]);
            }
        }

        return $next($request);
    }
}
