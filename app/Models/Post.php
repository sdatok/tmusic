<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'album',
        'artist',
        'description',
        'album_cover',
        'preview_url',
        'song_id',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // user_song_likes table has user_id and song_id columns
    public function likes()
    {
        return $this->belongsToMany(User::class, 'user_song_likes');
    }

    public function like(User $user) {
        return $this->likes()->sync($user->id);
    }

    public function unlike(User $user)
    {
        return $this->likes()->detach($user->id);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
