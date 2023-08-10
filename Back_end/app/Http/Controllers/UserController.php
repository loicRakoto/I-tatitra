<?php

namespace App\Http\Controllers;

use App\Models\Circonscription;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{





    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validation = Validator::make(request()->all(), [
            'nom' => 'required',
            'prenom' => 'required',
            'cin' => 'required',
            'numero' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'confirmpassword' => 'required|same:password',
            'fonction' => 'required',
            // 'region' => 'required',
            // 'district' => 'required'

        ], [
            'email.required' => 'Le champ email est requis.',
            'email.email' => 'Le champ email doit être une adresse email valide.',
            'password.required' => 'Le champ mot de passe est requis.',
            'confirmpassword.required' => 'Le champ confirmation du mot de passe est requis.',
            'confirmpassword.same' => 'Les champs mot de passe et confirmation du mot de passe doivent être identiques.',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 400,
                'messageError' => $validation->errors()->all()
            ]);
        } else {
            $nom = $request->nom;
            $prenom = $request->prenom;
            $numero = $request->numero;
            $cin = $request->cin;
            $fonction = $request->fonction;
            $email = $request->email;
            $mdp = Hash::make($request->confirmpassword);
            $idcircons = null;

            $emailRecu = DB::table('users')->where("email", $email)->get();


            if ($emailRecu->count() > 0) {
                //ADRESSE EMAIL EXISTE DEJA
                return response()->json([
                    'status' => 100
                ]);
            } else {
                //Dans le cas où l'utilisateur est autre que SRT et CT
                $nonCirc = DB::table('circonscriptions')->where('NomCirconscription', 'ALL')->get();
                $idNonCir = $nonCirc[0]->id;

                switch ($fonction) {
                    case 0:
                        //ADMINISTRATEUR
                        $idcircons = $idNonCir;
                        break;
                    case 1:
                        //Directeur des Services Topographique
                        $idcircons = $idNonCir;
                        break;
                    case 2:
                        //Conservateur Nationale
                        $idcircons = $idNonCir;
                        break;

                    case 3:
                        //Chef des Services Régional Topographique

                        $Region = DB::table('circonscriptions')->where('NomRegion', $request->region)->get();
                        $idRegion = $Region[0]->id;
                        $idcircons = $idRegion;

                        break;

                    default:
                        $circons = DB::table('circonscriptions')->where('NomCirconscription', $request->district)->get();
                        // Chef des Circonscription Topographique
                        $idcircons = $circons[0]->id;
                        break;
                }


                $users = new User();

                $users->Nom = $nom;
                $users->Prenom = $prenom;
                $users->Telephone = $numero;
                $users->CIN = $cin;
                $users->fonction = $fonction;
                $users->email = $email;
                $users->password = $mdp;
                $users->circonscription_id = $idcircons;
                $users->status = false;

                $users->save();
                return response()->json([
                    'status' => 200
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
