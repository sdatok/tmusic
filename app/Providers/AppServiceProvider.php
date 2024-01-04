<?php

namespace App\Providers;

use App\Settings\GeneralSetting;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'spotify' => function () {
                return [
                    'client_id' => config('spotify.client_id'),
                    // It's not safe to expose your client secret to the frontend.
                     'client_secret' => config('spotify.client_secret'),
                    'token' => app(GeneralSetting::class)->spotify_token,
                ];
            },
        ]);
    }
}
