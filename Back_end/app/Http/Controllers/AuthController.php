<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{


    public function login(Request $request)
    {
        $validation = Validator::make(request()->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ], [
            'email.required' => 'Le champ email est requis.',
            'email.email' => 'Le champ email doit être une adresse email valide.',
            'password.required' => 'Le champ mot de passe est requis.',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => "401",
                'messageError' => $validation->errors()->all()
            ]);
        } else {

            if (Auth()->attempt($request->only('email', 'password'))) {

                $user = $request->user();

                $token = $user->createToken('authToken')->plainTextToken;

                return response()->json([
                    'status' => "200",
                    'token' => $token,
                    'user' => $user,
                ]);
            } else {
                return response()->json([
                    'status' => "0"
                ]);
            }
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
