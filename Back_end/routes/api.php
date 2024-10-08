<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChefCirconscriptionTopographique;
use App\Http\Controllers\CirconscriptionController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/circonscriptionRegion', [CirconscriptionController::class, 'recuperationRegion']);
Route::get('/circonscriptionDistrict', [CirconscriptionController::class, 'recuperationDistrict']);

Route::post('/Utilisateur/add', [UserController::class, 'store']);


//Chef Circonscription Topographique
Route::post('/ChefCirconsctiptionTopo/OperationTopoCourant/Add/TravauxBornage', [ChefCirconscriptionTopographique::class, 'TravauxBornageAdd']);
Route::post('/ChefCirconsctiptionTopo/OperationTopoCourant/Add/TravauxPlanRegulier', [ChefCirconscriptionTopographique::class, 'TravauxPlanRegulierAdd']);
Route::post('/ChefCirconsctiptionTopo/OperationTopoCourant/Add/AutresTravaux', [ChefCirconscriptionTopographique::class, 'AutresTravauxAdd']);
Route::post('/ChefCirconsctiptionTopo/OperationTopoCourant/Add/TravauxReperage', [ChefCirconscriptionTopographique::class, 'TravauxReperageAdd']);
Route::post('/ChefCirconsctiptionTopo/OperationTopoCourant/Add/ReproductionPlan', [ChefCirconscriptionTopographique::class, 'ReproductionPlanAdd']);
Route::post('/ChefCirconsctiptionTopo/OperationTopoCourant/Add/AutresReproduction', [ChefCirconscriptionTopographique::class, 'AutresReproductionAdd']);
Route::post('/ChefCirconsctiptionTopo/OperationTopoCourant/Add/SurfaceBorne', [ChefCirconscriptionTopographique::class, 'SurfaceBorneAdd']);

Route::get('/ChefCirconsctiptionTopo/RecuperationLastActivite', [ChefCirconscriptionTopographique::class, 'LastActivite']);
Route::get('/ChefCirconsctiptionTopo/RecuperationDateActivite', [ChefCirconscriptionTopographique::class, 'DateActivite']);
Route::get('/ChefCirconsctiptionTopo/RechercheDateActivite', [ChefCirconscriptionTopographique::class, 'RechercheDateActivite']);

Route::post('/ChefCirconsctiptionTopo/modificationAncien', [ChefCirconscriptionTopographique::class, 'modificationAncien']);


//TEST TUTO

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/logout', [AuthController::class, 'logout']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    // Route::get('/Administrateur', [CirconscriptionController::class, 'recuperationRegion']);
});
