<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class YourController extends Controller
{
    public function yourMethod()
    {
        return Inertia::render('YourComponent', [
            'propName' => 'propValue',
        ]);
    }
}
