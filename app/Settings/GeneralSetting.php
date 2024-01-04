<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSetting extends Settings
{

    public string $spotify_token;
    public string $spotify_token_expiry;

    public static function group(): string
    {
        return 'general';
    }
}
