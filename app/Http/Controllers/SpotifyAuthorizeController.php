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

        if (isset($data['access_token'])) {
            // Store access token and expiry in session
            $request->session()->put('spotify_access_token', $data['access_token']);
            $request->session()->put('spotify_token_expires', time() + $data['expires_in']);

            return redirect()->route('dashboard'); // Adjusted redirect
        } else {
            return Redirect::route('dashboard')->with('error', 'Spotify authorization failed. Please try again.');
        }

    }
}
