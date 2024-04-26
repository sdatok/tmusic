<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'comment' => 'required|string|max:255',
            'post_id' => 'required|exists:posts,id',
        ]);

        $comment = $request->user()->create()->create($validatedData);

    }

    public function likeComment(Comment $comment, Request $request)
    {
        $liked = $comment->like($request->user());

    }
}
