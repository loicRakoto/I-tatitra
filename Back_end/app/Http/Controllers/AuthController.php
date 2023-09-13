<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

                // Vérifiez la valeur de l'attribut 'status' de l'utilisateur.
                if ($user->status == 1) {
                    $token = $user->createToken('authToken')->plainTextToken;

                    return response()->json([
                        'status' => "200",
                        'token' => $token,
                        'user' => $user,
                    ]);
                } elseif ($user->status == 0) {
                    return response()->json([
                        'status' => "208",
                        'message' => "Vous avez déja envoyer une demande d'adhésion, Veuillez attendre la confirmation de l'administrateur",
                    ]);
                } else {
                    // L'utilisateur n'a pas le statut requis (status != 1).
                    return response()->json([
                        'status' => "403", // Vous pouvez utiliser un code d'erreur approprié, par exemple 403 pour interdit.
                        'message' => 'Accès interdit. Votre compte n\'a pas l\'autorisation requise.',
                    ]);
                }
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
