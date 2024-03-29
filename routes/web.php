<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Auth\ProviderController;
use App\Http\Controllers\HomeController;
use App\Models\User;
use App\Http\Controllers\PostController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/auth/google/redirect', function () {
    return Socialite::driver('google')->redirect();
})->name('google.redirect');

Route::get('/auth/google/callback', function () {
    $googleUser = Socialite::driver('google')->user(); // use $googleUser instead of $user

    $user = User::where('google_id', $googleUser->id)->first();

    if (!$user) {
        $user = User::create([
            'google_id' => $googleUser->id,
            'name' => $googleUser->name,
            'username' => User::generateUserName($googleUser->nickname),
            'email' => $googleUser->email,
            'google_token' => $googleUser->token,
        ]);
    }

    $user->last_login_at = now();
    $user->update();

    Auth::login($user);
    return redirect()->route('dashboard');
});

// Moved following logic into HomeController.php for admin & user login authentication

// Route::get('/dashboard', function () {
//     $posts = \App\Models\Post::latest()->get();
//     return Inertia::render('Dashboard', compact('posts'));
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/dashboard', [HomeController::class, 'index'])->name('dashboard'); 


Route::get('/authorize-spotify', [\App\Http\Controllers\SpotifyAuthorizeController::class, 'authorizeSpotify'])->name('spotify.authorize');
Route::get('/spotify-callback', [\App\Http\Controllers\SpotifyAuthorizeController::class, 'callback'])->name('spotify.callback');

Route::middleware('auth')->group(function () {
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
