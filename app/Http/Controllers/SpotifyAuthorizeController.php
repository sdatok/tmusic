<?php

namespace App\Http\Controllers;

use App\Settings\GeneralSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

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

        return redirect()->to("https://accounts.spotify.com/authorize?$query");
    }

    public function callback(Request $request)
    {
        $response = Http::asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'authorization_code',
            'code' => $request->code,
            'redirect_uri' => route('spotify.callback'),
            'client_id' => config('spotify.client_id'),
            'client_secret' => config('spotify.client_secret'),
        ]);

        $data = $response->json();

        $data = $response->json();

        if (isset($data['access_token'])) {
            // Redirect with token and expiry time
            return redirect()->to('/spotify-auth-success?token=' . $data['access_token'] . '&expiresIn=' . $data['expires_in']);
        } else {
            // Log the error or handle it as needed
            // Redirect to the homepage with an error message that authorization failed
            return Redirect::to('/')->with('error', 'Spotify authorization failed. Please try again.');
        }

    }
}
