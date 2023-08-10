<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // public function register(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string',
    //         'email' => 'required|email|unique:users',
    //         'password' => 'required|string|min:6',
    //         'role' => 'required|in:user,admin', // Define valid roles here
    //     ]);

    //     $user = new User([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => bcrypt($request->password),
    //         'role' => $request->role,
    //     ]);

    //     $user->save();

    //     return response()->json(['message' => 'User registered successfully'], 201);
    // }

    // public function login(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);



    //     if (!Auth::attempt($credentials)) {
    //         return response()->json(['message' => 'Unauthorized', 'status' => '401'], 401);
    //     } else {

    //         $user = $request->user();

    //         $token = $user->createToken('authToken')->plainTextToken;

    //         return response()->json([
    //             'user' => $user,
    //             'token' => $token,
    //             'status' => '200'
    //         ]);
    //     }
    // }

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
