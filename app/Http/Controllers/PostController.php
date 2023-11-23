<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PostController extends Controller
{
    public function store(Request $request)
    {
        Log::alert('yesssir', $request->all());
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'album' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'album_cover' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $post = $request->user()->posts()->create($validatedData);

        Log::alert('donezo ', $post->toArray());


        // If using Inertia, you can return a proper Inertia response.
        // Return a JSON response with the created post data or a success message


//        return response()->json([
//            'post' => $post,
//            'message' => 'Post created successfully.'
//        ]);
    }
}
