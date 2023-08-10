<?php

use App\Http\Controllers\AuthController;
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

Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/circonscriptionRegion', [CirconscriptionController::class, 'recuperationRegion']);
Route::get('/circonscriptionDistrict', [CirconscriptionController::class, 'recuperationDistrict']);

Route::post('/Utilisateur/add', [UserController::class, 'store']);


//TEST TUTO

Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/Administrateur', [CirconscriptionController::class, 'recuperationRegion']);
});
