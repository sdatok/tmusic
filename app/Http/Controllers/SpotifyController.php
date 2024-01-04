<?php

namespace App\Http\Controllers;

use App\Settings\GeneralSetting;
use Illuminate\Http\Request;

class SpotifyController extends Controller
{
    public function searchByString(GeneralSetting $settings)
    {
        $token = $settings->spotify_token;
    }
}
