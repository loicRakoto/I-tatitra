<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Circonscription;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CirconscriptionController extends Controller
{



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function recuperationRegion()
    {
        $listeRegion = DB::table('circonscriptions')->select('NomRegion')->distinct()->get();
        return response()->json($listeRegion);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function recuperationDistrict(Request $request)
    {
        $nomRegion =  $request->nomRegion;
        //$nomRegion = "ANALAMANGA";
        $recupDistrictCorrespondant = DB::table('circonscriptions')->select('NomCirconscription')->where('NomRegion', '=', $nomRegion)->get();
        return response()->json($recupDistrictCorrespondant);
    }

    public function infoUtilisateur(Request $request)
    {
        $userId = $request->utilisateurId;
        $userWithCirconscription = User::select('users.*', 'circonscriptions.*')
            ->join('circonscriptions', 'users.circonscription_id', '=', 'circonscriptions.id')
            ->where('users.id', $userId)
            ->first();

        return response()->json($userWithCirconscription);
    }

    public function activiteCirtopo(Request $request)
    {
        // $activiteId = $request->activiteId;
        $circonscriptionId = $request->utilisateurCirconscriptionId;

        for ($activiteId = 1; $activiteId <= 11; $activiteId++) {
            # code...
            $LastEnregistrement = DB::table('enregistrers')
                ->where('activite_id', '=', $activiteId)
                ->where('circonscription_id', '=', $circonscriptionId)
                ->latest()
                ->first();
            if ($LastEnregistrement) {
                $enregistrements[] = $LastEnregistrement; // Ajouter l'enregistrement au tableau
            }
        }


        return response()->json([
            "TRAVAUX_BORNAGES" => $enregistrements[0],
            "TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT" => $enregistrements[1],
            "AUTRES_TRAVAUX" => $enregistrements[2],
            "TRAVAUX_DE_REPERAGE" => $enregistrements[3],
            "REPRODUCTION_PLAN" => $enregistrements[4],
            "AUTRES_REPRODUCTIONS" => $enregistrements[5],
            "SURFACE_BORNEES" => $enregistrements[6],
            "DEMATERIALISATION" => $enregistrements[7],
            "ELABORATION_PLOF_VALIDATION_PLOF" => $enregistrements[8],
            "FOND_PLAN_DETERIORE_ET_OU_DEMANDES_SPECIALES" => $enregistrements[9],
            "BUDGET_GENERALE" => $enregistrements[10],
        ]);
    }
}
