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
            'scope' => 'user-library-read playlist-modify-public user-read-email user-read-private streaming user-modify-playback-state app-remote-control user-read-currently-playing user-top-read',
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

            $user = auth()->user();
            $user->spotify_token = $data['access_token'];
            $user->spotify_refresh_token = $data['refresh_token'];
            $user->spotify_token_expires_at = time() + $data['expires_in'];
            $user->save();

            return redirect()->route('dashboard'); // Adjusted redirect
        } else {
            return Redirect::route('dashboard')->with('error', 'Spotify authorization failed. Please try again.');
        }

    }
}
