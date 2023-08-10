<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdministrateurController extends Controller
{
    public function listUtilisateur()
    {
        $utilisateur = User::all();

        return response()->json($utilisateur);
    }
}
