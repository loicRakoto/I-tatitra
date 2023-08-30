<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Circonscription;
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

        $latestEntry = DB::table('enregistrers')
            ->select(DB::raw('MONTH(created_at) as mois'), DB::raw('YEAR(created_at) as annee'))
            ->orderBy('created_at', 'desc')
            ->first();

        $circonscriptionId = $request->utilisateurCirconscriptionId;

        $mois = $latestEntry->mois;
        $annee = $latestEntry->annee;



        for ($activiteId = 1; $activiteId <= 11; $activiteId++) {
            # code...
            $LastEnregistrement = DB::table('enregistrers')
                ->where('activite_id', '=', $activiteId)
                ->where('circonscription_id', '=', $circonscriptionId)
                ->whereYear('created_at', $annee)
                ->whereMonth('created_at', $mois)
                ->latest()
                ->first();
            if ($LastEnregistrement) {
                $enregistrements[] = $LastEnregistrement; // Ajouter l'enregistrement au tableau
            } else {
                $recuMois = null;
                $executeMois = null;
                $encoursTraitement = null;
                $payeNonExecute = null;
                $remisMois = null;
                $borne = null;
                $restaure = null;
                $scane = null;
                $vectorise = null;
                $valide = null;
                $bourrage = null;
                $decalage = null;
                $autres = null;
                $demandeSpeciale = null;
                $payes = null;

                switch ($activiteId) {
                    case 1:
                        // 1 TRAVAUX DE BORNAGES
                        $recuMois = '0/0/0/0';
                        $executeMois = '0/0/0/0';
                        $encoursTraitement = '0/0/0/0';
                        $payeNonExecute = '0/0/0/0';
                        $remisMois = '0/0/0/0';
                        $borne = '0/0/0/0';
                        $restaure = '0/0/0/0';
                        $scane = '0/0/0/0';
                        $vectorise = '0/0/0/0';
                        $valide = '0/0/0/0';
                        $bourrage = '0/0/0/0';
                        $decalage = '0/0/0/0';
                        $autres = '0/0/0/0';
                        $demandeSpeciale = '0/0/0/0';
                        $payes = '0/0/0/0';
                        break;

                    case 2:
                        // 2 TRAVAUX DE PLAN REGULIER ET PROJET DE MORCELLEMENT
                        $recuMois = '0/0/0/0';
                        $executeMois = '0/0/0/0';
                        $encoursTraitement = '0/0/0/0';
                        $payeNonExecute = '0/0/0/0';
                        $remisMois = '0/0/0/0';
                        $borne = '0/0/0/0';
                        $restaure = '0/0/0/0';
                        $scane = '0/0/0/0';
                        $vectorise = '0/0/0/0';
                        $valide = '0/0/0/0';
                        $bourrage = '0/0/0/0';
                        $decalage = '0/0/0/0';
                        $autres = '0/0/0/0';
                        $demandeSpeciale = '0/0/0/0';
                        $payes = '0/0/0/0';

                        break;

                    case 3:
                        // 3 AUTRES TRAVAUX
                        $recuMois = '0/0/0/0/0';
                        $executeMois = '0/0/0/0/0';
                        $encoursTraitement = '0/0/0/0/0';
                        $payeNonExecute = '0/0/0/0/0';
                        $remisMois = '0/0/0/0/0';
                        $borne = '0/0/0/0/0';
                        $restaure = '0/0/0/0/0';
                        $scane = '0/0/0/0/0';
                        $vectorise = '0/0/0/0/0';
                        $valide = '0/0/0/0/0';
                        $bourrage = '0/0/0/0/0';
                        $decalage = '0/0/0/0/0';
                        $autres = '0/0/0/0/0';
                        $demandeSpeciale = '0/0/0/0/0';
                        $payes = '0/0/0/0/0';
                        break;

                    case 4:
                        // 4 TRAVAUX DE REPERAGE
                        $recuMois = '0/0/0/0/0';
                        $executeMois = '0/0/0/0/0';
                        $encoursTraitement = '0/0/0/0/0';
                        $payeNonExecute = '0/0/0/0/0';
                        $remisMois = '0/0/0/0/0';
                        $borne = '0/0/0/0/0';
                        $restaure = '0/0/0/0/0';
                        $scane = '0/0/0/0/0';
                        $vectorise = '0/0/0/0/0';
                        $valide = '0/0/0/0/0';
                        $bourrage = '0/0/0/0/0';
                        $decalage = '0/0/0/0/0';
                        $autres = '0/0/0/0/0';
                        $demandeSpeciale = '0/0/0/0/0';
                        $payes = '0/0/0/0/0';

                        break;

                    case 5:
                        // 5 REPRODUCTION PLAN
                        $recuMois = '0/0/0';
                        $executeMois = '0/0/0';
                        $encoursTraitement = '0/0/0';
                        $payeNonExecute = '0/0/0';
                        $remisMois = '0/0/0';
                        $borne = '0/0/0';
                        $restaure = '0/0/0';
                        $scane = '0/0/0';
                        $vectorise = '0/0/0';
                        $valide = '0/0/0';
                        $bourrage = '0/0/0';
                        $decalage = '0/0/0';
                        $autres = '0/0/0';
                        $demandeSpeciale = '0/0/0';
                        $payes = '0/0/0';
                        break;

                    case 6:
                        // 6 AUTRES REPRODUCTIONS
                        $recuMois = '0/0/0/0/0';
                        $executeMois = '0/0/0/0/0';
                        $encoursTraitement = '0/0/0/0/0';
                        $payeNonExecute = '0/0/0/0/0';
                        $remisMois = '0/0/0/0/0';
                        $borne = '0/0/0/0/0';
                        $restaure = '0/0/0/0/0';
                        $scane = '0/0/0/0/0';
                        $vectorise = '0/0/0/0/0';
                        $valide = '0/0/0/0/0';
                        $bourrage = '0/0/0/0/0';
                        $decalage = '0/0/0/0/0';
                        $autres = '0/0/0/0/0';
                        $demandeSpeciale = '0/0/0/0/0';
                        $payes = '0/0/0/0/0';
                        break;


                    case 7:
                        // 7 SURFACE BORNEES
                        $recuMois = '0/0';
                        $executeMois = '0/0';
                        $encoursTraitement = '0/0';
                        $payeNonExecute = '0/0';
                        $remisMois = '0/0';
                        $borne = '0/0';
                        $restaure = '0/0';
                        $scane = '0/0';
                        $vectorise = '0/0';
                        $valide = '0/0';
                        $bourrage = '0/0';
                        $decalage = '0/0';
                        $autres = '0/0';
                        $demandeSpeciale = '0/0';
                        $payes = '0/0';
                        break;


                    case 8:
                        // 8 DEMATERIALISATION
                        $recuMois = '0/0/0/0';
                        $executeMois = '0/0/0/0';
                        $encoursTraitement = '0/0/0/0';
                        $payeNonExecute = '0/0/0/0';
                        $remisMois = '0/0/0/0';
                        $borne = '0/0/0/0';
                        $restaure = '0/0/0/0';
                        $scane = '0/0/0/0';
                        $vectorise = '0/0/0/0';
                        $valide = '0/0/0/0';
                        $bourrage = '0/0/0/0';
                        $decalage = '0/0/0/0';
                        $autres = '0/0/0/0';
                        $demandeSpeciale = '0/0/0/0';
                        $payes = '0/0/0/0';
                        break;


                    case 9:
                        // 9 ELABORATION PLOF / VALIDATION PLOF
                        $recuMois = '0/0';
                        $executeMois = '0/0';
                        $encoursTraitement = '0/0';
                        $payeNonExecute = '0/0';
                        $remisMois = '0/0';
                        $borne = '0/0';
                        $restaure = '0/0';
                        $scane = '0/0';
                        $vectorise = '0/0';
                        $valide = '0/0';
                        $bourrage = '0/0';
                        $decalage = '0/0';
                        $autres = '0/0';
                        $demandeSpeciale = '0/0';
                        $payes = '0/0';
                        break;


                    case 10:
                        // 10 FOND PLAN DETERIORE ET / OU DEMANDES SPECIALES
                        $recuMois = '0/0';
                        $executeMois = '0/0';
                        $encoursTraitement = '0/0';
                        $payeNonExecute = '0/0';
                        $remisMois = '0/0';
                        $borne = '0/0';
                        $restaure = '0/0';
                        $scane = '0/0';
                        $vectorise = '0/0';
                        $valide = '0/0';
                        $bourrage = '0/0';
                        $decalage = '0/0';
                        $autres = '0/0';
                        $demandeSpeciale = '0/0';
                        $payes = '0/0';
                        break;


                    case 11:
                        // 11 BUDGET GENERALE
                        $recuMois = '0/0/0/0/0/0';
                        $executeMois = '0/0/0/0/0/0';
                        $encoursTraitement = '0/0/0/0/0/0';
                        $payeNonExecute = '0/0/0/0/0/0';
                        $remisMois = '0/0/0/0/0/0';
                        $borne = '0/0/0/0/0/0';
                        $restaure = '0/0/0/0/0/0';
                        $scane = '0/0/0/0/0/0';
                        $vectorise = '0/0/0/0/0/0';
                        $valide = '0/0/0/0/0/0';
                        $bourrage = '0/0/0/0/0/0';
                        $decalage = '0/0/0/0/0/0';
                        $autres = '0/0/0/0/0/0';
                        $demandeSpeciale = '0/0/0/0/0/0';
                        $payes = '0/0/0/0/0/0';
                        break;

                    default:
                        # code...
                        break;
                }

                $enregistrements[] = [
                    "activite_id" => $activiteId,
                    "circonscription_id" => $circonscriptionId,
                    "recu_mois" => $recuMois,
                    "execute_mois" => $executeMois,
                    "en_cours_traitement" => $encoursTraitement,
                    "paye_non_execute" => $payeNonExecute,
                    "remis_mois" => $remisMois,
                    "borne" => $borne,
                    "restaure" => $restaure,
                    "scane" => $scane,
                    "vectorise" => $vectorise,
                    "valide" => $valide,
                    "bourrage" => $bourrage,
                    "decalage" => $decalage,
                    "autres" => $autres,
                    "demande_speciale" => $demandeSpeciale,
                    "payes" => $payes
                ];
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

    public function rechercheRapportActiviteCirtopo(Request $request)
    {
        $circonscriptionId = $request->utilisateurCirconscriptionId;

        $date = explode('/', $request->date);
        // Mois et année sélectionnés
        $mois = $date[0];
        $annee = $date[1];

        $convertMois = null;

        switch ($mois) {
            case 'janvier':
                $convertMois = "1";
                break;

            case 'février':
                $convertMois = "2";
                break;

            case 'mars':
                $convertMois = "3";
                break;

            case 'avril':
                $convertMois = "4";
                break;

            case 'mai':
                $convertMois = "5";
                break;

            case 'juin':
                $convertMois = "6";
                break;

            case 'juillet':
                $convertMois = "7";
                break;

            case 'août':
                $convertMois = "8";
                break;

            case 'septembre':
                $convertMois = "9";
                break;

            case 'octobre':
                $convertMois = "10";
                break;

            case 'novembre':
                $convertMois = "11";
                break;

            case 'décembre':
                $convertMois = "12";
                break;

            default:
                # code...
                break;
        }

        for ($activiteId = 1; $activiteId <= 11; $activiteId++) {
            # code...
            $LastEnregistrement = DB::table('enregistrers')
                ->where('activite_id', '=', $activiteId)
                ->where('circonscription_id', '=', $circonscriptionId)
                ->whereYear('created_at', $annee)
                ->whereMonth('created_at', $convertMois)
                ->latest()
                ->first();
            if ($LastEnregistrement) {
                $enregistrements[] = $LastEnregistrement; // Ajouter l'enregistrement au tableau
            } else {
                $recuMois = null;
                $executeMois = null;
                $encoursTraitement = null;
                $payeNonExecute = null;
                $remisMois = null;
                $borne = null;
                $restaure = null;
                $scane = null;
                $vectorise = null;
                $valide = null;
                $bourrage = null;
                $decalage = null;
                $autres = null;
                $demandeSpeciale = null;
                $payes = null;

                switch ($activiteId) {
                    case 1:
                        // 1 TRAVAUX DE BORNAGES
                        $recuMois = '0/0/0/0';
                        $executeMois = '0/0/0/0';
                        $encoursTraitement = '0/0/0/0';
                        $payeNonExecute = '0/0/0/0';
                        $remisMois = '0/0/0/0';
                        $borne = '0/0/0/0';
                        $restaure = '0/0/0/0';
                        $scane = '0/0/0/0';
                        $vectorise = '0/0/0/0';
                        $valide = '0/0/0/0';
                        $bourrage = '0/0/0/0';
                        $decalage = '0/0/0/0';
                        $autres = '0/0/0/0';
                        $demandeSpeciale = '0/0/0/0';
                        $payes = '0/0/0/0';
                        break;

                    case 2:
                        // 2 TRAVAUX DE PLAN REGULIER ET PROJET DE MORCELLEMENT
                        $recuMois = '0/0/0/0';
                        $executeMois = '0/0/0/0';
                        $encoursTraitement = '0/0/0/0';
                        $payeNonExecute = '0/0/0/0';
                        $remisMois = '0/0/0/0';
                        $borne = '0/0/0/0';
                        $restaure = '0/0/0/0';
                        $scane = '0/0/0/0';
                        $vectorise = '0/0/0/0';
                        $valide = '0/0/0/0';
                        $bourrage = '0/0/0/0';
                        $decalage = '0/0/0/0';
                        $autres = '0/0/0/0';
                        $demandeSpeciale = '0/0/0/0';
                        $payes = '0/0/0/0';

                        break;

                    case 3:
                        // 3 AUTRES TRAVAUX
                        $recuMois = '0/0/0/0/0';
                        $executeMois = '0/0/0/0/0';
                        $encoursTraitement = '0/0/0/0/0';
                        $payeNonExecute = '0/0/0/0/0';
                        $remisMois = '0/0/0/0/0';
                        $borne = '0/0/0/0/0';
                        $restaure = '0/0/0/0/0';
                        $scane = '0/0/0/0/0';
                        $vectorise = '0/0/0/0/0';
                        $valide = '0/0/0/0/0';
                        $bourrage = '0/0/0/0/0';
                        $decalage = '0/0/0/0/0';
                        $autres = '0/0/0/0/0';
                        $demandeSpeciale = '0/0/0/0/0';
                        $payes = '0/0/0/0/0';
                        break;

                    case 4:
                        // 4 TRAVAUX DE REPERAGE
                        $recuMois = '0/0/0/0/0';
                        $executeMois = '0/0/0/0/0';
                        $encoursTraitement = '0/0/0/0/0';
                        $payeNonExecute = '0/0/0/0/0';
                        $remisMois = '0/0/0/0/0';
                        $borne = '0/0/0/0/0';
                        $restaure = '0/0/0/0/0';
                        $scane = '0/0/0/0/0';
                        $vectorise = '0/0/0/0/0';
                        $valide = '0/0/0/0/0';
                        $bourrage = '0/0/0/0/0';
                        $decalage = '0/0/0/0/0';
                        $autres = '0/0/0/0/0';
                        $demandeSpeciale = '0/0/0/0/0';
                        $payes = '0/0/0/0/0';

                        break;

                    case 5:
                        // 5 REPRODUCTION PLAN
                        $recuMois = '0/0/0';
                        $executeMois = '0/0/0';
                        $encoursTraitement = '0/0/0';
                        $payeNonExecute = '0/0/0';
                        $remisMois = '0/0/0';
                        $borne = '0/0/0';
                        $restaure = '0/0/0';
                        $scane = '0/0/0';
                        $vectorise = '0/0/0';
                        $valide = '0/0/0';
                        $bourrage = '0/0/0';
                        $decalage = '0/0/0';
                        $autres = '0/0/0';
                        $demandeSpeciale = '0/0/0';
                        $payes = '0/0/0';
                        break;

                    case 6:
                        // 6 AUTRES REPRODUCTIONS
                        $recuMois = '0/0/0/0/0';
                        $executeMois = '0/0/0/0/0';
                        $encoursTraitement = '0/0/0/0/0';
                        $payeNonExecute = '0/0/0/0/0';
                        $remisMois = '0/0/0/0/0';
                        $borne = '0/0/0/0/0';
                        $restaure = '0/0/0/0/0';
                        $scane = '0/0/0/0/0';
                        $vectorise = '0/0/0/0/0';
                        $valide = '0/0/0/0/0';
                        $bourrage = '0/0/0/0/0';
                        $decalage = '0/0/0/0/0';
                        $autres = '0/0/0/0/0';
                        $demandeSpeciale = '0/0/0/0/0';
                        $payes = '0/0/0/0/0';
                        break;


                    case 7:
                        // 7 SURFACE BORNEES
                        $recuMois = '0/0';
                        $executeMois = '0/0';
                        $encoursTraitement = '0/0';
                        $payeNonExecute = '0/0';
                        $remisMois = '0/0';
                        $borne = '0/0';
                        $restaure = '0/0';
                        $scane = '0/0';
                        $vectorise = '0/0';
                        $valide = '0/0';
                        $bourrage = '0/0';
                        $decalage = '0/0';
                        $autres = '0/0';
                        $demandeSpeciale = '0/0';
                        $payes = '0/0';
                        break;


                    case 8:
                        // 8 DEMATERIALISATION
                        $recuMois = '0/0/0/0';
                        $executeMois = '0/0/0/0';
                        $encoursTraitement = '0/0/0/0';
                        $payeNonExecute = '0/0/0/0';
                        $remisMois = '0/0/0/0';
                        $borne = '0/0/0/0';
                        $restaure = '0/0/0/0';
                        $scane = '0/0/0/0';
                        $vectorise = '0/0/0/0';
                        $valide = '0/0/0/0';
                        $bourrage = '0/0/0/0';
                        $decalage = '0/0/0/0';
                        $autres = '0/0/0/0';
                        $demandeSpeciale = '0/0/0/0';
                        $payes = '0/0/0/0';
                        break;


                    case 9:
                        // 9 ELABORATION PLOF / VALIDATION PLOF
                        $recuMois = '0/0';
                        $executeMois = '0/0';
                        $encoursTraitement = '0/0';
                        $payeNonExecute = '0/0';
                        $remisMois = '0/0';
                        $borne = '0/0';
                        $restaure = '0/0';
                        $scane = '0/0';
                        $vectorise = '0/0';
                        $valide = '0/0';
                        $bourrage = '0/0';
                        $decalage = '0/0';
                        $autres = '0/0';
                        $demandeSpeciale = '0/0';
                        $payes = '0/0';
                        break;


                    case 10:
                        // 10 FOND PLAN DETERIORE ET / OU DEMANDES SPECIALES
                        $recuMois = '0/0';
                        $executeMois = '0/0';
                        $encoursTraitement = '0/0';
                        $payeNonExecute = '0/0';
                        $remisMois = '0/0';
                        $borne = '0/0';
                        $restaure = '0/0';
                        $scane = '0/0';
                        $vectorise = '0/0';
                        $valide = '0/0';
                        $bourrage = '0/0';
                        $decalage = '0/0';
                        $autres = '0/0';
                        $demandeSpeciale = '0/0';
                        $payes = '0/0';
                        break;


                    case 11:
                        // 11 BUDGET GENERALE
                        $recuMois = '0/0/0/0/0/0';
                        $executeMois = '0/0/0/0/0/0';
                        $encoursTraitement = '0/0/0/0/0/0';
                        $payeNonExecute = '0/0/0/0/0/0';
                        $remisMois = '0/0/0/0/0/0';
                        $borne = '0/0/0/0/0/0';
                        $restaure = '0/0/0/0/0/0';
                        $scane = '0/0/0/0/0/0';
                        $vectorise = '0/0/0/0/0/0';
                        $valide = '0/0/0/0/0/0';
                        $bourrage = '0/0/0/0/0/0';
                        $decalage = '0/0/0/0/0/0';
                        $autres = '0/0/0/0/0/0';
                        $demandeSpeciale = '0/0/0/0/0/0';
                        $payes = '0/0/0/0/0/0';
                        break;

                    default:
                        # code...
                        break;
                }

                $enregistrements[] = [
                    "activite_id" => $activiteId,
                    "circonscription_id" => $circonscriptionId,
                    "recu_mois" => $recuMois,
                    "execute_mois" => $executeMois,
                    "en_cours_traitement" => $encoursTraitement,
                    "paye_non_execute" => $payeNonExecute,
                    "remis_mois" => $remisMois,
                    "borne" => $borne,
                    "restaure" => $restaure,
                    "scane" => $scane,
                    "vectorise" => $vectorise,
                    "valide" => $valide,
                    "bourrage" => $bourrage,
                    "decalage" => $decalage,
                    "autres" => $autres,
                    "demande_speciale" => $demandeSpeciale,
                    "payes" => $payes
                ];
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

    public function ListeDateActiviteCirtopo(Request $request)
    {
        $circonscriptionId = $request->utilisateurCirconscriptionId;

        $ListEnregistrement = DB::table('enregistrers')->select(DB::raw('MONTH(created_at) as mois'), DB::raw('YEAR(created_at) as annee'), DB::raw('COUNT(*) as total'))
            ->groupBy('mois', 'annee')
            ->orderBy('annee', 'desc')
            ->orderBy('mois', 'desc')
            ->where('circonscription_id', '=', $circonscriptionId)->get();

        $moisNoms = [
            1 => 'janvier',
            2 => 'février',
            3 => 'mars',
            4 => 'avril',
            5 => 'mai',
            6 => 'juin',
            7 => 'juillet',
            8 => 'août',
            9 => 'septembre',
            10 => 'octobre',
            11 => 'novembre',
            12 => 'décembre',
        ];

        $ListEnregistrementRegroupe = [];

        foreach ($ListEnregistrement as $row) {
            $mois = $moisNoms[$row->mois];
            $annee = $row->annee;
            $moisAnnee = $mois . ' ' . $annee;

            if (!isset($ListEnregistrementRegroupe[$moisAnnee])) {
                $ListEnregistrementRegroupe[$moisAnnee] = [
                    'mois' => $mois,
                    'annee' => $annee,
                    'total' => 0,
                ];
            }

            $ListEnregistrementRegroupe[$moisAnnee]['total'] += $row->total;
        }

        return response()->json(array_values($ListEnregistrementRegroupe));
    }
}
