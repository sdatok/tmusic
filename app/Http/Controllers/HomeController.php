<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if (Auth::check()) { // Use Auth::check() for a cleaner approach
            $usertype = Auth::user()->usertype;
            if ($usertype == 'user') {
                $posts = \App\Models\Post::latest()->get();
                return Inertia::render('Dashboard', compact('posts'));
            } elseif ($usertype == 'admin') {
                $posts = \App\Models\Post::latest()->get();
                return Inertia::render('AdminDashboard', compact('posts'));
            }
        }
        return redirect()->back(); // Fallback in case of failure
    }
}
