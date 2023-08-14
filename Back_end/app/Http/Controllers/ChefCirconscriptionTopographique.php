<?php

namespace App\Http\Controllers;

use App\Models\Enregistrer;
use Illuminate\Http\Request;

class ChefCirconscriptionTopographique extends Controller
{
    // 1 TRAVAUX DE BORNAGES
    // 2 TRAVAUX DE PLAN REGULIER ET PROJET DE MORCELLEMENT
    // 3 AUTRES TRAVAUX
    // 4 TRAVAUX DE REPERAGE
    // 5 REPRODUCTION PLAN
    // 6 AUTRES REPRODUCTIONS
    // 7 SURFACE BORNEES
    // 8 DEMATERIALISATION
    // 9 ELABORATION PLOF / VALIDATION PLOF
    // 10 FOND PLAN DETERIORE ET / OU DEMANDES SPECIALES
    // 11 BUDGET GENERALE


    public function TravauxBornageAdd(Request $request)
    {
        //Les requetes reçu
        $situation = $request->situations;
        $immatriculation = $request->immatriculation;
        $morcellement = $request->morcellement;
        $transformation = $request->transformation;
        $changementNom = $request->changementNom;

        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 1;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;




        //Verifie s'il existe déjà un enregistrement sur le même activité et meme circonscription 
        $existeEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->exists();

        if (!$existeEnregistrement) {
            //L'élément n'existe pas

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

            // Immatriculation/Morcellement/TransformationParcelle/ChangementNom
            switch ($situation) {
                case '0':
                    //Reçu pendant le mois
                    $recuMois = $immatriculation . '/' . $morcellement . '/' . $transformation . '/' . $changementNom;
                    break;

                case '1':
                    //Executé pendant le mois
                    $executeMois = $immatriculation . '/' . $morcellement . '/' . $transformation . '/' . $changementNom;
                    break;

                case '2':
                    //En cours de traitement
                    $encoursTraitement = $immatriculation . '/' . $morcellement . '/' . $transformation . '/' . $changementNom;
                    break;

                case '3':
                    //Payés non executés
                    $payeNonExecute = $immatriculation . '/' . $morcellement . '/' . $transformation . '/' . $changementNom;
                    break;

                case '4':
                    //Remis pendant le mois
                    $remisMois = $immatriculation . '/' . $morcellement . '/' . $transformation . '/' . $changementNom;
                    break;
                default:
                    # code...
                    break;
            }

            $enregistrer = new Enregistrer();
            $enregistrer->activite_id = $activiteId;
            $enregistrer->user_id = $userId;
            $enregistrer->circonscription_id = $circonscriptionId;
            $enregistrer->recu_mois = $recuMois;
            $enregistrer->execute_mois = $executeMois;
            $enregistrer->en_cours_traitement = $encoursTraitement;
            $enregistrer->paye_non_execute = $payeNonExecute;
            $enregistrer->remis_mois = $remisMois;
            $enregistrer->borne = $borne;
            $enregistrer->restaure = $restaure;
            $enregistrer->scane = $scane;
            $enregistrer->vectorise = $vectorise;
            $enregistrer->valide = $valide;
            $enregistrer->bourrage = $bourrage;
            $enregistrer->decalage = $decalage;
            $enregistrer->autres = $autres;
            $enregistrer->demande_speciale = $demandeSpeciale;
            $enregistrer->payes = $payes;
            $enregistrer->save();

            return response()->json(["reponse" => "nouveau reussie"]);
        } else {

            $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
                ->where('circonscription_id', '=', $circonscriptionId)
                ->latest()
                ->first();

            $Last_recuMois = $LastEnregistrement->recu_mois;
            $Last_executeMois = $LastEnregistrement->execute_mois;
            $Last_encoursTraitement = $LastEnregistrement->en_cours_traitement;
            $Last_payeNonExecute = $LastEnregistrement->paye_non_execute;
            $Last_remisMois = $LastEnregistrement->remis_mois;
            $Last_borne = $LastEnregistrement->borne;
            $Last_restaure = $LastEnregistrement->restaure;
            $Last_scane = $LastEnregistrement->scane;
            $Last_vectorise = $LastEnregistrement->vectorise;
            $Last_valide = $LastEnregistrement->valide;
            $Last_bourrage = $LastEnregistrement->bourrage;
            $Last_decalage = $LastEnregistrement->decalage;
            $Last_autres = $LastEnregistrement->autres;
            $Last_demandeSpeciale = $LastEnregistrement->demande_speciale;
            $Last_payes = $LastEnregistrement->payes;

            //Definir comme valeurs par defaut la derniere ligne au cas où il n'y a pas changement 
            $recuMois = $Last_recuMois;
            $executeMois = $Last_executeMois;
            $encoursTraitement = $Last_encoursTraitement;
            $payeNonExecute =  $Last_payeNonExecute;
            $remisMois =  $Last_remisMois;
            $borne = $Last_borne;
            $restaure = $Last_restaure;
            $scane = $Last_scane;
            $vectorise = $Last_vectorise;
            $valide = $Last_valide;
            $bourrage = $Last_bourrage;
            $decalage = $Last_decalage;
            $autres = $Last_autres;
            $demandeSpeciale = $Last_demandeSpeciale;
            $payes = $Last_payes;

            // Immatriculation/Morcellement/TransformationParcelle/ChangementNom
            switch ($situation) {
                case '0':
                    //Reçu pendant le mois
                    $elements = explode('/', $Last_recuMois);
                    $newImmatriculation = (int)$elements[0] + (int)$immatriculation;
                    $newMorcellement = (int)$elements[1] + (int)$morcellement;
                    $newTransformationParcelle = (int)$elements[2] + (int)$transformation;
                    $newChangementNom = (int)$elements[3] + (int)$changementNom;

                    $recuMois = $newImmatriculation . '/' . $newMorcellement . '/' . $newTransformationParcelle . '/' . $newChangementNom;
                    break;

                case '1':
                    //Executé pendant le mois
                    $elements = explode('/', $Last_executeMois);
                    $newImmatriculation = (int)$elements[0] + (int)$immatriculation;
                    $newMorcellement = (int)$elements[1] + (int)$morcellement;
                    $newTransformationParcelle = (int)$elements[2] + (int)$transformation;
                    $newChangementNom = (int)$elements[3] + (int)$changementNom;

                    $executeMois = $newImmatriculation . '/' . $newMorcellement . '/' . $newTransformationParcelle . '/' . $newChangementNom;
                    break;

                case '2':
                    //En cours de traitement
                    $elements = explode('/', $Last_encoursTraitement);
                    $newImmatriculation = (int)$elements[0] + (int)$immatriculation;
                    $newMorcellement = (int)$elements[1] + (int)$morcellement;
                    $newTransformationParcelle = (int)$elements[2] + (int)$transformation;
                    $newChangementNom = (int)$elements[3] + (int)$changementNom;

                    $encoursTraitement = $newImmatriculation . '/' . $newMorcellement . '/' . $newTransformationParcelle . '/' . $newChangementNom;
                    break;

                case '3':
                    //Payés non executés
                    $elements = explode('/', $Last_payeNonExecute);
                    $newImmatriculation = (int)$elements[0] + (int)$immatriculation;
                    $newMorcellement = (int)$elements[1] + (int)$morcellement;
                    $newTransformationParcelle = (int)$elements[2] + (int)$transformation;
                    $newChangementNom = (int)$elements[3] + (int)$changementNom;

                    $payeNonExecute = $newImmatriculation . '/' . $newMorcellement . '/' . $newTransformationParcelle . '/' . $newChangementNom;
                    break;

                case '4':
                    //Remis pendant le mois
                    $elements = explode('/', $Last_remisMois);
                    $newImmatriculation = (int)$elements[0] + (int)$immatriculation;
                    $newMorcellement = (int)$elements[1] + (int)$morcellement;
                    $newTransformationParcelle = (int)$elements[2] + (int)$transformation;
                    $newChangementNom = (int)$elements[3] + (int)$changementNom;

                    $remisMois = $newImmatriculation . '/' . $newMorcellement . '/' . $newTransformationParcelle . '/' . $newChangementNom;
                    break;
                default:
                    # code...
                    break;
            }

            $newEnregistre = new Enregistrer();
            $newEnregistre->activite_id = $activiteId;
            $newEnregistre->user_id = $userId;
            $newEnregistre->circonscription_id = $circonscriptionId;
            $newEnregistre->recu_mois = $recuMois;
            $newEnregistre->execute_mois = $executeMois;
            $newEnregistre->en_cours_traitement = $encoursTraitement;
            $newEnregistre->paye_non_execute = $payeNonExecute;
            $newEnregistre->remis_mois = $remisMois;
            $newEnregistre->borne = $borne;
            $newEnregistre->restaure = $restaure;
            $newEnregistre->scane = $scane;
            $newEnregistre->vectorise = $vectorise;
            $newEnregistre->valide = $valide;
            $newEnregistre->bourrage = $bourrage;
            $newEnregistre->decalage = $decalage;
            $newEnregistre->autres = $autres;
            $newEnregistre->demande_speciale = $demandeSpeciale;
            $newEnregistre->payes = $payes;
            $newEnregistre->save();

            return response()->json(["reponse" => "maj reussie"]);
        }
    }

    public function TravauxPlanRegulierAdd()
    {
    }

    public function AutresTravauxAdd()
    {
    }

    public function TravauxReperageAdd()
    {
    }

    public function ReproductionPlanAdd()
    {
    }

    public function AutresReproductionAdd()
    {
    }

    public function SurfaceBorneAdd()
    {
    }
}
