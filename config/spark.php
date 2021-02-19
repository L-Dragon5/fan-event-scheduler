<?php

use App\Models\User;

return [

    /*
    |--------------------------------------------------------------------------
    | Spark Path
    |--------------------------------------------------------------------------
    |
    | This configuration option determines the URI at which the Spark billing
    | portal is available. You are free to change this URI to a value that
    | you prefer. You shall link to this location from your application.
    |
    */

    'path' => 'admin/billing',

    /*
    |--------------------------------------------------------------------------
    | Spark Dashboard URL
    |--------------------------------------------------------------------------
    |
    | This configuration option determines the URI at which to send the user
    | once they are done with the billing portal.
    |
    */
    'dashboard_url' => '/admin',

    /*
    |--------------------------------------------------------------------------
    | Spark Middleware
    |--------------------------------------------------------------------------
    |
    | These are the middleware that requests to the Spark billing portal must
    | pass through before being accepted. Typically, the default list that
    | is defined below should be suitable for most Laravel applications.
    |
    */

    'middleware' => ['web', 'auth'],

    /*
    |--------------------------------------------------------------------------
    | Branding
    |--------------------------------------------------------------------------
    |
    | These configuration values allow you to customize the branding of the
    | billing portal, including the primary color and the logo that will
    | be displayed within the billing portal. This logo value must be
    | the absolute path to an SVG logo within the local filesystem.
    |
    */

    // 'brand' =>  [
    //     'logo' => realpath(__DIR__.'/../public/svg/billing-logo.svg'),
    //     'color' => 'bg-gray-800',
    // ],

    /*
    |--------------------------------------------------------------------------
    | Proration Behavior
    |--------------------------------------------------------------------------
    |
    | This value determines if charges are prorated when making adjustments
    | to a plan such as incrementing or decrementing the quantity of the
    | plan. This also determines proration behavior if changing plans.
    |
    */

    'prorates' => true,

    /*
    |--------------------------------------------------------------------------
    | Spark Billables
    |--------------------------------------------------------------------------
    |
    | Below you may define billable entities supported by your Spark driven
    | application. You are free to have multiple billable entities which
    | can each define multiple subscription plans available for users.
    |
    | In addition to defining your billable entity, you may also define its
    | plans and the plan's features, including a short description of it
    | as well as a "bullet point" listing of its distinctive features.
    |
    */

    'billables' => [

        'user' => [
            'model' => User::class,
            'plans' => [
                [
                    'name' => 'Free (w/Ads)',
                    'short_description' => 'Free subscription to test features.',
                    'monthly_id' => 'price_1ILXwYL2f7m4oh9jJINn6q1O',
                    'features' => [
                        '1 Schedule Max',
                        'Email Support',
                    ],
                    'archived' => false,
                ],
                [
                    'name' => 'No Ads',
                    'short_description' => 'Free subscription to test features, but with no ads.',
                    'monthly_id' => 'price_1IMcKTL2f7m4oh9jRc69pIkx',
                    'features' => [
                        'Ads removed',
                        '5 Schedule Max',
                        'Email Support',
                    ],
                    'archived' => false,
                ],
            ],

        ],

    ]
];
