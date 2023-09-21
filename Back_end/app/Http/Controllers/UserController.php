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
            'nom.required' => 'Le champ nom est requis.',
            'prenom.required' => 'Le champ prenom est requis.',
            'cin.required' => 'Le champ cin est requis.',
            'email.required' => 'Le champ email est requis.',
            'numero.required' => 'Le champ numero est requis.',
            'email.email' => 'Le champ email doit être une adresse email valide.',
            'password.required' => 'Le champ mot de passe est requis.',
            'confirmpassword.required' => 'Le champ confirmation du mot de passe est requis.',
            'fonction.required' => "Veuillez choisir une fonction.",
            'confirmpassword.same' => 'Les champs mot de passe et confirmation du mot de passe doivent être identiques.',
            // 'numero.integer' => 'Le champ numéro doit être un entier.',
            // 'cin.integer' => 'Le champ CIN doit être un entier.',
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
     * @return \Illuminate\Http\Response
     */
    public function showDemande()
    {
        $usersAttente = DB::table('users')
            ->where('status', 0)
            ->get();
        return response()->json($usersAttente);
    }
    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showAllMembres()
    {
        //Sauf administrateur
        $usersWithCirconscriptions = DB::table('users')
            ->join('circonscriptions', 'users.circonscription_id', '=', 'circonscriptions.id')
            ->select(
                'users.id as user_id',
                'circonscriptions.id as circonscription_id',
                'users.Nom',
                'users.Prenom',
                'users.Telephone',
                'users.CIN',
                'users.email',
                'users.Nom',
                'users.status',
                'users.fonction',
                'circonscriptions.NomRegion',
                'circonscriptions.NomCirconscription'
            )
            ->where('users.fonction', '<>', 0)
            ->where('status', 1)
            ->orWhere('status', 2)
            ->get();
        return response()->json($usersWithCirconscriptions);
    }

    public function acceptMembre(Request $request)
    {
        $idMembre = $request->idMembre;
        $user = User::all();
        $data = $user->find($idMembre);
        $data->status = 1;
        $data->update();

        return response()->json(['Reponse' => "Accepter"]);
    }

    public function rejectMembre(Request $request)
    {
        $idMembre = $request->idMembre;
        $user = User::all();
        $data = $user->find($idMembre);
        $data->delete();

        return response()->json(['Reponse' => "Suppression"]);
    }

    public function blockMembre(Request $request)
    {
        $idMembre = $request->idMembre;
        $user = User::all();
        $data = $user->find($idMembre);
        $data->status = 2;
        $data->update();

        return response()->json(['Reponse' => "Bloquer"]);
    }

    public function allowMembre(Request $request)
    {
        $idMembre = $request->idMembre;
        $user = User::all();
        $data = $user->find($idMembre);
        $data->status = 1;
        $data->update();

        return response()->json(['Reponse' => "Autoriser"]);
    }

    public function findMembre(Request $request)
    {
        $idMembre = $request->idMembre;
        $data = DB::table('users')
            ->join('circonscriptions', 'users.circonscription_id', '=', 'circonscriptions.id')
            ->select(
                'users.id as user_id',
                'circonscriptions.id as circonscription_id',
                'users.Nom',
                'users.Prenom',
                'users.Telephone',
                'users.CIN',
                'users.email',
                'users.Nom',
                'users.status',
                'users.fonction',
                'circonscriptions.NomRegion',
                'circonscriptions.NomCirconscription',
                'users.updated_at'
            )
            ->where('users.id', $idMembre)
            ->get();


        return response()->json(['Reponse' => $data[0]]);
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
