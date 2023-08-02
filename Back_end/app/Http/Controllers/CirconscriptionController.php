<?php

namespace App\Http\Controllers;

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
}
