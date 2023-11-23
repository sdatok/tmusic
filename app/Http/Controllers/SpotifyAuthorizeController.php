<?php

namespace App\Http\Controllers;

use App\Settings\GeneralSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SpotifyAuthorizeController extends Controller
{
    public function authorizeSpotify()
    {
        $query = http_build_query([
            'client_id' => config('spotify.client_id'),
            'redirect_uri' => route('spotify.callback'),
            'response_type' => 'code',
            'scope' => 'user-library-read playlist-modify-public user-read-currently-playing user-top-read',
            'show_dialog' => 'true',
        ]);

        return redirect("https://accounts.spotify.com/authorize?$query");
    }

    public function callback(GeneralSetting $settings)
    {
        $response = Http::asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'authorization_code',
            'code' => request()->code,
            'redirect_uri' => route('spotify.callback'),
            'client_id' => config('spotify.client_id'),
            'client_secret' => config('spotify.client_secret'),
        ]);

        $spotify_response = $response->json();

        $settings->spotify_token = $spotify_response['access_token'] ?? '';
        $settings->spotify_token_expiry = $spotify_response['expires_in'] ?? '';
        $settings->save();

        return redirect(route('dashboard'));

    }
}
