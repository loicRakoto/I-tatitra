<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Enregistrer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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


        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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
            } else {
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
                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public function TravauxPlanRegulierAdd(Request $request)
    {
        //Les requetes reçu
        $situation = $request->situations;

        $etablissementPlan = $request->etablissementPlan;
        $projetMorcellement = $request->projetMorcellement;
        $servitudePassage = $request->servitudePassage;
        $planLocalisation = $request->planLocalisation;

        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 2;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;


        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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

                // etablissementPlan/projetMorcellement/servitudePassage/planLocalisation
                switch ($situation) {
                    case '0':
                        //Reçu pendant le mois
                        $elements = explode('/', $Last_recuMois);
                        $newEtablissementPlan = (int)$elements[0] + (int)$etablissementPlan;
                        $newProjetMorcellement = (int)$elements[1] + (int)$projetMorcellement;
                        $newServitudePassage = (int)$elements[2] + (int)$servitudePassage;
                        $newPlanLocalisation = (int)$elements[3] + (int)$planLocalisation;

                        $recuMois = $newEtablissementPlan . '/' . $newProjetMorcellement . '/' . $newServitudePassage . '/' . $newPlanLocalisation;
                        break;

                    case '1':
                        //Executé pendant le mois
                        $elements = explode('/', $Last_recuMois);
                        $newEtablissementPlan = (int)$elements[0] + (int)$etablissementPlan;
                        $newProjetMorcellement = (int)$elements[1] + (int)$projetMorcellement;
                        $newServitudePassage = (int)$elements[2] + (int)$servitudePassage;
                        $newPlanLocalisation = (int)$elements[3] + (int)$planLocalisation;

                        $executeMois = $newEtablissementPlan . '/' . $newProjetMorcellement . '/' . $newServitudePassage . '/' . $newPlanLocalisation;
                        break;

                    case '2':
                        //En cours de traitement
                        $elements = explode('/', $Last_recuMois);
                        $newEtablissementPlan = (int)$elements[0] + (int)$etablissementPlan;
                        $newProjetMorcellement = (int)$elements[1] + (int)$projetMorcellement;
                        $newServitudePassage = (int)$elements[2] + (int)$servitudePassage;
                        $newPlanLocalisation = (int)$elements[3] + (int)$planLocalisation;

                        $encoursTraitement = $newEtablissementPlan . '/' . $newProjetMorcellement . '/' . $newServitudePassage . '/' . $newPlanLocalisation;
                        break;

                    case '3':
                        //Payés non executés
                        $elements = explode('/', $Last_recuMois);
                        $newEtablissementPlan = (int)$elements[0] + (int)$etablissementPlan;
                        $newProjetMorcellement = (int)$elements[1] + (int)$projetMorcellement;
                        $newServitudePassage = (int)$elements[2] + (int)$servitudePassage;
                        $newPlanLocalisation = (int)$elements[3] + (int)$planLocalisation;

                        $payeNonExecute = $newEtablissementPlan . '/' . $newProjetMorcellement . '/' . $newServitudePassage . '/' . $newPlanLocalisation;
                        break;

                    case '4':
                        //Remis pendant le mois
                        $elements = explode('/', $Last_recuMois);
                        $newEtablissementPlan = (int)$elements[0] + (int)$etablissementPlan;
                        $newProjetMorcellement = (int)$elements[1] + (int)$projetMorcellement;
                        $newServitudePassage = (int)$elements[2] + (int)$servitudePassage;
                        $newPlanLocalisation = (int)$elements[3] + (int)$planLocalisation;

                        $remisMois = $newEtablissementPlan . '/' . $newProjetMorcellement . '/' . $newServitudePassage . '/' . $newPlanLocalisation;
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
            } else {
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

                // etablissementPlan/projetMorcellement/servitudePassage/planLocalisation
                switch ($situation) {
                    case '0':
                        //Reçu pendant le mois
                        $recuMois = $etablissementPlan . '/' . $projetMorcellement . '/' . $servitudePassage . '/' . $planLocalisation;
                        break;

                    case '1':
                        //Executé pendant le mois
                        $executeMois =  $etablissementPlan . '/' . $projetMorcellement . '/' . $servitudePassage . '/' . $planLocalisation;
                        break;

                    case '2':
                        //En cours de traitement
                        $encoursTraitement =  $etablissementPlan . '/' . $projetMorcellement . '/' . $servitudePassage . '/' . $planLocalisation;
                        break;

                    case '3':
                        //Payés non executés
                        $payeNonExecute =  $etablissementPlan . '/' . $projetMorcellement . '/' . $servitudePassage . '/' . $planLocalisation;
                        break;

                    case '4':
                        //Remis pendant le mois
                        $remisMois = $etablissementPlan . '/' . $projetMorcellement . '/' . $servitudePassage . '/' . $planLocalisation;
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
                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }

    public function AutresTravauxAdd(Request $request)
    {
        //Les requetes reçu
        $situation = $request->situations;

        $travauxExpertise = $request->travauxExpertise;
        $delimitation = $request->delimitation;
        $levePlanEnsemble = $request->levePlanEnsemble;
        $assistanceConstatation = $request->assistanceConstatation;
        $autress = $request->autres;


        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 3;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;





        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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

                // travauxExpertise/delimitation/levePlanEnsemble/assistanceConstatation/autres
                switch ($situation) {
                    case '0':
                        //Reçu pendant le mois
                        $elements = explode('/', $Last_recuMois);
                        $newTravauxExpertise = (int)$elements[0] + (int)$travauxExpertise;
                        $newDelimitation = (int)$elements[1] + (int)$delimitation;
                        $newLevePlanEnsemble = (int)$elements[2] + (int)$levePlanEnsemble;
                        $newAssistanceConstatation = (int)$elements[3] + (int)$assistanceConstatation;
                        $newAutres = (int)$elements[4] + (int)$autress;

                        $recuMois = $newTravauxExpertise . '/' . $newDelimitation . '/' . $newLevePlanEnsemble . '/' . $newAssistanceConstatation . '/' . $newAutres;
                        break;

                    case '1':
                        //Executé pendant le mois
                        $elements = explode('/', $Last_executeMois);
                        $newTravauxExpertise = (int)$elements[0] + (int)$travauxExpertise;
                        $newDelimitation = (int)$elements[1] + (int)$delimitation;
                        $newLevePlanEnsemble = (int)$elements[2] + (int)$levePlanEnsemble;
                        $newAssistanceConstatation = (int)$elements[3] + (int)$assistanceConstatation;
                        $newAutres = (int)$elements[4] + (int)$autress;

                        $executeMois = $newTravauxExpertise . '/' . $newDelimitation . '/' . $newLevePlanEnsemble . '/' . $newAssistanceConstatation . '/' . $newAutres;
                        break;

                    case '2':
                        //En cours de traitement
                        $elements = explode('/', $Last_encoursTraitement);
                        $newTravauxExpertise = (int)$elements[0] + (int)$travauxExpertise;
                        $newDelimitation = (int)$elements[1] + (int)$delimitation;
                        $newLevePlanEnsemble = (int)$elements[2] + (int)$levePlanEnsemble;
                        $newAssistanceConstatation = (int)$elements[3] + (int)$assistanceConstatation;
                        $newAutres = (int)$elements[4] + (int)$autress;

                        $encoursTraitement = $newTravauxExpertise . '/' . $newDelimitation . '/' . $newLevePlanEnsemble . '/' . $newAssistanceConstatation . '/' . $newAutres;
                        break;

                    case '3':
                        //Payés non executés
                        $elements = explode('/', $Last_payeNonExecute);
                        $newTravauxExpertise = (int)$elements[0] + (int)$travauxExpertise;
                        $newDelimitation = (int)$elements[1] + (int)$delimitation;
                        $newLevePlanEnsemble = (int)$elements[2] + (int)$levePlanEnsemble;
                        $newAssistanceConstatation = (int)$elements[3] + (int)$assistanceConstatation;
                        $newAutres = (int)$elements[4] + (int)$autress;

                        $payeNonExecute = $newTravauxExpertise . '/' . $newDelimitation . '/' . $newLevePlanEnsemble . '/' . $newAssistanceConstatation . '/' . $newAutres;
                        break;

                    case '4':
                        //Remis pendant le mois
                        $elements = explode('/', $Last_remisMois);
                        $newTravauxExpertise = (int)$elements[0] + (int)$travauxExpertise;
                        $newDelimitation = (int)$elements[1] + (int)$delimitation;
                        $newLevePlanEnsemble = (int)$elements[2] + (int)$levePlanEnsemble;
                        $newAssistanceConstatation = (int)$elements[3] + (int)$assistanceConstatation;
                        $newAutres = (int)$elements[4] + (int)$autress;

                        $remisMois = $newTravauxExpertise . '/' . $newDelimitation . '/' . $newLevePlanEnsemble . '/' . $newAssistanceConstatation . '/' . $newAutres;
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
            } else {

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

                // travauxExpertise/delimitation/levePlanEnsemble/assistanceConstatation/autres
                switch ($situation) {
                    case '0':
                        //Reçu pendant le mois
                        $recuMois = $travauxExpertise . '/' . $delimitation . '/' . $levePlanEnsemble . '/' . $assistanceConstatation . '/' . $autress;
                        break;

                    case '1':
                        //Executé pendant le mois
                        $executeMois = $travauxExpertise . '/' . $delimitation . '/' . $levePlanEnsemble . '/' . $assistanceConstatation . '/' . $autress;
                        break;

                    case '2':
                        //En cours de traitement
                        $encoursTraitement = $travauxExpertise . '/' . $delimitation . '/' . $levePlanEnsemble . '/' . $assistanceConstatation . '/' . $autress;
                        break;

                    case '3':
                        //Payés non executés
                        $payeNonExecute = $travauxExpertise . '/' . $delimitation . '/' . $levePlanEnsemble . '/' . $assistanceConstatation . '/' . $autress;
                        break;

                    case '4':
                        //Remis pendant le mois
                        $remisMois = $travauxExpertise . '/' . $delimitation . '/' . $levePlanEnsemble . '/' . $assistanceConstatation . '/' . $autress;
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

                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }

    public function TravauxReperageAdd(Request $request)
    {
        //Les requetes reçu
        $situation = $request->situations;

        $reperagePrealable = $request->reperagePrealable;
        $travauxSecondReperage = $request->travauxSecondReperage;
        $reperageDefinitif = $request->reperageDefinitif;
        $attributionNouveauNumero = $request->attributionNouveauNumero;
        $autress = $request->autres;


        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 4;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;





        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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

                $reperagePrealable = $request->reperagePrealable;
                $travauxSecondReperage = $request->travauxSecondReperage;
                $reperageDefinitif = $request->reperageDefinitif;
                $attributionNouveauNumero = $request->attributionNouveauNumero;
                $autress = $request->autres;

                // reperagePrealable/travauxSecondReperage/reperageDefinitif/attributionNouveauNumero/autress
                switch ($situation) {
                    case '0':
                        //Reçu pendant le mois
                        $elements = explode('/', $Last_recuMois);
                        $newReperagePrealable = (int)$elements[0] + (int)$reperagePrealable;
                        $newTravauxSecondReperage = (int)$elements[1] + (int)$travauxSecondReperage;
                        $newReperageDefinitif = (int)$elements[2] + (int)$reperageDefinitif;
                        $newAttributionNouveauNumero = (int)$elements[3] + (int)$attributionNouveauNumero;
                        $newAutres = (int)$elements[4] + (int)$autress;

                        $recuMois = $newReperagePrealable . '/' . $newTravauxSecondReperage . '/' . $newReperageDefinitif . '/' . $newAttributionNouveauNumero . '/' . $newAutres;
                        break;

                    case '1':
                        //Executé pendant le mois
                        $elements = explode('/', $Last_executeMois);
                        $newReperagePrealable = (int)$elements[0] + (int)$reperagePrealable;
                        $newTravauxSecondReperage = (int)$elements[1] + (int)$travauxSecondReperage;
                        $newReperageDefinitif = (int)$elements[2] + (int)$reperageDefinitif;
                        $newAttributionNouveauNumero = (int)$elements[3] + (int)$attributionNouveauNumero;
                        $newAutres = (int)$elements[4] + (int)$autress;

                        $executeMois = $newReperagePrealable . '/' . $newTravauxSecondReperage . '/' . $newReperageDefinitif . '/' . $newAttributionNouveauNumero . '/' . $newAutres;
                        break;

                    case '2':
                        //En cours de traitement
                        $elements = explode('/', $Last_encoursTraitement);
                        $newReperagePrealable = (int)$elements[0] + (int)$reperagePrealable;
                        $newTravauxSecondReperage = (int)$elements[1] + (int)$travauxSecondReperage;
                        $newReperageDefinitif = (int)$elements[2] + (int)$reperageDefinitif;
                        $newAttributionNouveauNumero = (int)$elements[3] + (int)$attributionNouveauNumero;
                        $newAutres = (int)$elements[4] + (int)$autress;

                        $encoursTraitement = $newReperagePrealable . '/' . $newTravauxSecondReperage . '/' . $newReperageDefinitif . '/' . $newAttributionNouveauNumero . '/' . $newAutres;
                        break;

                    case '3':
                        //Payés non executés
                        $elements = explode('/', $Last_payeNonExecute);
                        $newReperagePrealable = (int)$elements[0] + (int)$reperagePrealable;
                        $newTravauxSecondReperage = (int)$elements[1] + (int)$travauxSecondReperage;
                        $newReperageDefinitif = (int)$elements[2] + (int)$reperageDefinitif;
                        $newAttributionNouveauNumero = (int)$elements[3] + (int)$attributionNouveauNumero;
                        $newAutres = (int)$elements[4] + (int)$autress;

                        $payeNonExecute = $newReperagePrealable . '/' . $newTravauxSecondReperage . '/' . $newReperageDefinitif . '/' . $newAttributionNouveauNumero . '/' . $newAutres;
                        break;

                    case '4':
                        //Remis pendant le mois
                        $elements = explode('/', $Last_remisMois);
                        $newReperagePrealable = (int)$elements[0] + (int)$reperagePrealable;
                        $newTravauxSecondReperage = (int)$elements[1] + (int)$travauxSecondReperage;
                        $newReperageDefinitif = (int)$elements[2] + (int)$reperageDefinitif;
                        $newAttributionNouveauNumero = (int)$elements[3] + (int)$attributionNouveauNumero;
                        $newAutres = (int)$elements[4] + (int)$autress;

                        $remisMois = $newReperagePrealable . '/' . $newTravauxSecondReperage . '/' . $newReperageDefinitif . '/' . $newAttributionNouveauNumero . '/' . $newAutres;
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
            } else {

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

                // reperagePrealable/travauxSecondReperage/reperageDefinitif/attributionNouveauNumero/autress
                switch ($situation) {
                    case '0':
                        //Reçu pendant le mois
                        $recuMois = $reperagePrealable . '/' . $travauxSecondReperage . '/' . $reperageDefinitif . '/' . $attributionNouveauNumero . '/' . $autress;
                        break;

                    case '1':
                        //Executé pendant le mois
                        $executeMois = $reperagePrealable . '/' . $travauxSecondReperage . '/' . $reperageDefinitif . '/' . $attributionNouveauNumero . '/' . $autress;

                    case '2':
                        //En cours de traitement
                        $encoursTraitement = $reperagePrealable . '/' . $travauxSecondReperage . '/' . $reperageDefinitif . '/' . $attributionNouveauNumero . '/' . $autress;
                        break;

                    case '3':
                        //Payés non executés
                        $payeNonExecute = $reperagePrealable . '/' . $travauxSecondReperage . '/' . $reperageDefinitif . '/' . $attributionNouveauNumero . '/' . $autress;
                        break;

                    case '4':
                        //Remis pendant le mois
                        $remisMois = $reperagePrealable . '/' . $travauxSecondReperage . '/' . $reperageDefinitif . '/' . $attributionNouveauNumero . '/' . $autress;
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

                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }

    public function ReproductionPlanAdd(Request $request)
    {
        //Les requetes reçu
        $situation = $request->situations;

        $planIndividuel = $request->planIndividuel;
        $planIndividuelDistributeur = $request->planIndividuelDistributeur;
        $planCadastral = $request->planCadastral;



        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 5;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;





        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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



                // planIndividuel/planIndividuelDistributeur/planCadastral
                switch ($situation) {
                    case '0':
                        //Reçu pendant le mois
                        $elements = explode('/', $Last_recuMois);
                        $newplanIndividuel = (int)$elements[0] + (int)$planIndividuel;
                        $newplanIndividuelDistributeur = (int)$elements[1] + (int)$planIndividuelDistributeur;
                        $newplanCadastral = (int)$elements[2] + (int)$planCadastral;
                        $recuMois = $newplanIndividuel . '/' . $newplanIndividuelDistributeur . '/' . $newplanCadastral;
                        break;

                    case '1':
                        //Executé pendant le mois
                        $elements = explode('/', $Last_executeMois);
                        $newplanIndividuel = (int)$elements[0] + (int)$planIndividuel;
                        $newplanIndividuelDistributeur = (int)$elements[1] + (int)$planIndividuelDistributeur;
                        $newplanCadastral = (int)$elements[2] + (int)$planCadastral;
                        $executeMois = $newplanIndividuel . '/' . $newplanIndividuelDistributeur . '/' . $newplanCadastral;
                        break;

                    case '2':
                        //Remis pendant le mois
                        $elements = explode('/', $Last_remisMois);
                        $newplanIndividuel = (int)$elements[0] + (int)$planIndividuel;
                        $newplanIndividuelDistributeur = (int)$elements[1] + (int)$planIndividuelDistributeur;
                        $newplanCadastral = (int)$elements[2] + (int)$planCadastral;
                        $remisMois = $newplanIndividuel . '/' . $newplanIndividuelDistributeur . '/' . $newplanCadastral;
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
            } else {

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

                // planIndividuel/planIndividuelDistributeur/planCadastral
                switch ($situation) {
                    case '0':
                        //Reçu pendant le mois
                        $recuMois = $planIndividuel . '/' . $planIndividuelDistributeur . '/' . $planCadastral;
                        break;

                    case '1':
                        //Executé pendant le mois
                        $executeMois =  $planIndividuel . '/' . $planIndividuelDistributeur . '/' . $planCadastral;

                    case '2':
                        //Remis pendant le mois
                        $remisMois =  $planIndividuel . '/' . $planIndividuelDistributeur . '/' . $planCadastral;
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

                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }

    public function AutresReproductionAdd(Request $request)
    {

        //Les requetes reçu
        $situation = $request->situations;

        $coordonneLaborde = $request->coordonneLaborde;
        $origine = $request->origine;
        $planEtatParcellaire = $request->planEtatParcellaire;
        $copiePV = $request->copiePV;
        $certificationConforme = $request->certificationConforme;



        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 6;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;





        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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



                // coordonneLaborde/origine/planEtatParcellaire/copiePV/certificationConforme
                switch ($situation) {
                    case '0':
                        //Reçu pendant le mois
                        $elements = explode('/', $Last_recuMois);
                        $newcoordonneLaborde = (int)$elements[0] + (int)$coordonneLaborde;
                        $neworigine = (int)$elements[1] + (int)$origine;
                        $newplanEtatParcellaire = (int)$elements[2] + (int)$planEtatParcellaire;
                        $newcopiePV = (int)$elements[3] + (int)$copiePV;
                        $newcertificationConforme = (int)$elements[4] + (int)$certificationConforme;
                        $recuMois = $newcoordonneLaborde . '/' . $neworigine . '/' . $newplanEtatParcellaire . '/' . $newcopiePV . '/' . $newcertificationConforme;
                        break;

                    case '1':
                        //Executé pendant le mois
                        $elements = explode('/', $Last_executeMois);
                        $newcoordonneLaborde = (int)$elements[0] + (int)$coordonneLaborde;
                        $neworigine = (int)$elements[1] + (int)$origine;
                        $newplanEtatParcellaire = (int)$elements[2] + (int)$planEtatParcellaire;
                        $newcopiePV = (int)$elements[3] + (int)$copiePV;
                        $newcertificationConforme = (int)$elements[4] + (int)$certificationConforme;
                        $executeMois = $newcoordonneLaborde . '/' . $neworigine . '/' . $newplanEtatParcellaire . '/' . $newcopiePV . '/' . $newcertificationConforme;
                        break;

                    case '2':
                        //Remis pendant le mois
                        $elements = explode('/', $Last_remisMois);
                        $newcoordonneLaborde = (int)$elements[0] + (int)$coordonneLaborde;
                        $neworigine = (int)$elements[1] + (int)$origine;
                        $newplanEtatParcellaire = (int)$elements[2] + (int)$planEtatParcellaire;
                        $newcopiePV = (int)$elements[3] + (int)$copiePV;
                        $newcertificationConforme = (int)$elements[4] + (int)$certificationConforme;
                        $remisMois = $newcoordonneLaborde . '/' . $neworigine . '/' . $newplanEtatParcellaire . '/' . $newcopiePV . '/' . $newcertificationConforme;
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
            } else {

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

                // coordonneLaborde/origine/planEtatParcellaire/copiePV/certificationConforme
                switch ($situation) {
                    case '0':
                        //Reçu pendant le mois
                        $recuMois = $coordonneLaborde . '/' . $origine . '/' . $planEtatParcellaire . '/' . $copiePV . '/' . $certificationConforme;
                        break;

                    case '1':
                        //Executé pendant le mois
                        $executeMois =   $coordonneLaborde . '/' . $origine . '/' . $planEtatParcellaire . '/' . $copiePV . '/' . $certificationConforme;

                    case '2':
                        //Remis pendant le mois
                        $remisMois =   $coordonneLaborde . '/' . $origine . '/' . $planEtatParcellaire . '/' . $copiePV . '/' . $certificationConforme;
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

                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }

    public function SurfaceBorneAdd(Request $request)
    {
        //Les requetes reçu
        $situation = $request->situations;

        $bornageIndividuel = $request->bornageIndividuel;
        $bornageCollectif = $request->bornageCollectif;

        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 7;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;





        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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


                // bornageIndividuel/bornageCollectif
                switch ($situation) {
                    case '0':
                        //Bornée
                        $elements = explode('/', $Last_borne);
                        $newbornageIndividuel = (int)$elements[0] + (int)$bornageIndividuel;
                        $newbornageCollectif = (int)$elements[1] + (int)$bornageCollectif;
                        $borne = $newbornageIndividuel . '/' . $newbornageCollectif;
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
            } else {

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

                // bornageIndividuel/bornageCollectif
                switch ($situation) {
                    case '0':
                        //Bornée
                        $borne =  $bornageIndividuel . '/' . $bornageCollectif;;
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

                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }

    /////////////////////                  TRAVAUX DE MODERNISATION      ////////////////////////////////////////////////////////////////////////

    public function DematerialisationAdd(Request $request)
    {
        //Les requetes reçu
        $situation = $request->situations;

        $planIndividuel = $request->planIndividuel;
        $planCadastrale = $request->planCadastrale;
        $pvcb = $request->pvcb;
        $planReperage = $request->planReperage;

        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 8;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;


        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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


                // planIndividuel/planCadastrale/pvcb/planReperage
                switch ($situation) {
                    case '0':
                        //Restaurés
                        $elements = explode('/', $Last_restaure);
                        $newPlanIndividuel = (int)$elements[0] + (int)$planIndividuel;
                        $newPlanCadastrale = (int)$elements[1] + (int)$planCadastrale;
                        $newPvcb = (int)$elements[2] + (int)$pvcb;
                        $newPlanReperage = (int)$elements[3] + (int)$planReperage;

                        $restaure = $newPlanIndividuel . '/' . $newPlanCadastrale . '/' . $newPvcb . '/' . $newPlanReperage;
                        break;

                    case '1':
                        //Scannés
                        $elements = explode('/', $Last_scane);
                        $newPlanIndividuel = (int)$elements[0] + (int)$planIndividuel;
                        $newPlanCadastrale = (int)$elements[1] + (int)$planCadastrale;
                        $newPvcb = (int)$elements[2] + (int)$pvcb;
                        $newPlanReperage = (int)$elements[3] + (int)$planReperage;

                        $scane = $newPlanIndividuel . '/' . $newPlanCadastrale . '/' . $newPvcb . '/' . $newPlanReperage;
                        break;

                    case '2':
                        //Vectorisé
                        $elements = explode('/', $Last_vectorise);
                        $newPlanIndividuel = (int)$elements[0] + (int)$planIndividuel;
                        $newPlanCadastrale = (int)$elements[1] + (int)$planCadastrale;
                        $newPvcb = (int)$elements[2] + (int)$pvcb;
                        $newPlanReperage = (int)$elements[3] + (int)$planReperage;

                        $vectorise = $newPlanIndividuel . '/' . $newPlanCadastrale . '/' . $newPvcb . '/' . $newPlanReperage;
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
            } else {
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

                // planIndividuel/planCadastrale/pvcb/planReperage
                switch ($situation) {


                    case '0':
                        //Restaurés
                        $restaure = $planIndividuel . '/' . $planCadastrale . '/' . $pvcb . '/' . $planReperage;
                        break;

                    case '1':
                        //Scannés
                        $scane = $planIndividuel . '/' . $planCadastrale . '/' . $pvcb . '/' . $planReperage;
                        break;

                    case '2':
                        //Vectorisé
                        $vectorise = $planIndividuel . '/' . $planCadastrale . '/' . $pvcb . '/' . $planReperage;
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
                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }

    function ElaborationPlofValidationPlofAdd(Request $request)
    {

        //Les requetes reçu
        $situation = $request->situations;

        $nombrePlofElabore = $request->nombrePlofElabore;
        $nombrePlofExploitable = $request->nombrePlofExploitable;


        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 9;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;


        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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



                // nombrePlofElabore/nombrePlofExploitable
                switch ($situation) {
                    case '0':
                        //En cours de traitement
                        $elements = explode('/', $Last_encoursTraitement);

                        $newnombrePlofElabore = (int)$elements[0] + (int)$nombrePlofElabore;
                        $newnombrePlofExploitable = (int)$elements[1] + (int)$nombrePlofExploitable;

                        $encoursTraitement = $newnombrePlofElabore . '/' . $newnombrePlofExploitable;
                        break;

                    case '1':
                        //Valides
                        $elements = explode('/', $Last_valide);

                        $newnombrePlofElabore = (int)$elements[0] + (int)$nombrePlofElabore;
                        $newnombrePlofExploitable = (int)$elements[1] + (int)$nombrePlofExploitable;

                        $valide = $newnombrePlofElabore . '/' . $newnombrePlofExploitable;
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

                return response()->json(["reponse" => 'MAJ reussie']);
            } else {
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

                // nombrePlofElabore/nombrePlofExploitable
                switch ($situation) {


                    case '0':
                        //En cours de traitement
                        $encoursTraitement = $nombrePlofElabore . '/' . $nombrePlofExploitable;
                        break;

                    case '1':
                        //Valides
                        $valide =  $nombrePlofElabore . '/' . $nombrePlofExploitable;
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
                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }

    /////////////////////                  FOND PLAN      ////////////////////////////////////////////////////////////////////////

    public function FondPlanDeterioreAdd(Request $request)
    {
        //Les requetes reçu
        $situation = $request->situations;



        $numSerieFondA3 = $request->numSerieFondA3;
        $numSerieFondA4 = $request->numSerieFondA4;

        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 10;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;


        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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

                // numSerieFondA3/numSerieFondA4
                switch ($situation) {
                    case '0':
                        //Bourrage
                        $elements = explode('/', $Last_bourrage);
                        $newnumSerieFondA3 = (int)$elements[0] + (int)$numSerieFondA3;
                        $newnumSerieFondA4 = (int)$elements[1] + (int)$numSerieFondA4;

                        $bourrage = $newnumSerieFondA3 . '/' . $newnumSerieFondA4;
                        break;

                    case '1':
                        //Decalage
                        $elements = explode('/', $Last_decalage);
                        $newnumSerieFondA3 = (int)$elements[0] + (int)$numSerieFondA3;
                        $newnumSerieFondA4 = (int)$elements[1] + (int)$numSerieFondA4;

                        $decalage =  $newnumSerieFondA3 . '/' . $newnumSerieFondA4;
                        break;

                    case '2':
                        //Autres
                        $elements = explode('/', $Last_autres);
                        $newnumSerieFondA3 = (int)$elements[0] + (int)$numSerieFondA3;
                        $newnumSerieFondA4 = (int)$elements[1] + (int)$numSerieFondA4;

                        $autres = $newnumSerieFondA3 . '/' . $newnumSerieFondA4;
                        break;

                    case '3':
                        //Demande spéciales
                        $elements = explode('/', $Last_demandeSpeciale);
                        $newnumSerieFondA3 = (int)$elements[0] + (int)$numSerieFondA3;
                        $newnumSerieFondA4 = (int)$elements[1] + (int)$numSerieFondA4;

                        $demandeSpeciale = $newnumSerieFondA3 . '/' . $newnumSerieFondA4;
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
            } else {
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

                // numSerieFondA3/numSerieFondA4
                switch ($situation) {

                    case '0':
                        //Bourrage
                        $bourrage = $numSerieFondA3 . '/' . $numSerieFondA4;
                        break;

                    case '1':
                        //Decalage
                        $decalage =  $numSerieFondA3 . '/' . $numSerieFondA4;
                        break;

                    case '2':
                        //Autres
                        $autres = $numSerieFondA3 . '/' . $numSerieFondA4;
                        break;

                    case '3':
                        //Demande spéciales
                        $demandeSpeciale = $numSerieFondA3 . '/' . $numSerieFondA4;
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
                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }

    /////////////////////               RAPPORT BUDGETAIRE      ////////////////////////////////////////////////////////////////////////

    function BudgetGeneraleAdd(Request $request)
    {
        //Les requetes reçu
        $situation = $request->situations;

        $travauxDescenteTerrain = $request->travauxDescenteTerrain;
        $travauxExecuteBureau = $request->travauxExecuteBureau;
        $reproductionDocumentA4 = $request->reproductionDocumentA4;
        $reproductionDocumentA3 = $request->reproductionDocumentA3;
        $reproductionPlanGuichetAuto = $request->reproductionPlanGuichetAuto;
        $autresReproduction = $request->autresReproduction;



        $utilisateurId = $request->utilisateurId;
        $utilisateurFonction = $request->utilisateurFonction;
        $utilisateurCirconscriptionId = $request->utilisateurCirconscriptionId;


        ////////////////////////////////////////////////
        $activiteId = 11;
        $userId = $utilisateurId;
        $circonscriptionId = $utilisateurCirconscriptionId;


        //Verifier si c'est la fin du mois
        $LastEnregistrement = Enregistrer::where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();


        if ($LastEnregistrement) {
            // Récupére le mois de l'enregistrement le plus récent
            $moisEnregistrement = date('m', strtotime($LastEnregistrement->created_at));

            // Récupére le mois actuel
            $moisActuel = date('m');

            // Vérifie si le mois de l'enregistrement est le même que le mois actuel
            if ($moisEnregistrement == $moisActuel) {

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


                // travauxDescenteTerrain/travauxExecuteBureau/reproductionDocumentA4/reproductionDocumentA3/reproductionPlanGuichetAuto/autresReproduction
                switch ($situation) {
                    case '0':
                        //Payés
                        $elements = explode('/', $Last_payes);

                        $newtravauxDescenteTerrain = (int)$elements[0] + (int)$travauxDescenteTerrain;
                        $newtravauxExecuteBureau = (int)$elements[1] + (int)$travauxExecuteBureau;
                        $newreproductionDocumentA4 = (int)$elements[2] + (int)$reproductionDocumentA4;
                        $newreproductionDocumentA3 = (int)$elements[3] + (int)$reproductionDocumentA3;
                        $newreproductionPlanGuichetAuto = (int)$elements[4] + (int)$reproductionPlanGuichetAuto;
                        $newautresReproduction = (int)$elements[5] + (int)$autresReproduction;

                        $payes = $newtravauxDescenteTerrain . '/' . $newtravauxExecuteBureau . '/' . $newreproductionDocumentA4 . '/' . $newreproductionDocumentA3 . '/' . $newreproductionPlanGuichetAuto . '/' . $newautresReproduction;
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

                return response()->json(["reponse" => 'MAJ reussie']);
            } else {
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

                // travauxDescenteTerrain/travauxExecuteBureau/reproductionDocumentA4/reproductionDocumentA3/reproductionPlanGuichetAuto/autresReproduction
                switch ($situation) {


                    case '0':
                        //Payes
                        $payes = $travauxDescenteTerrain . '/' . $travauxExecuteBureau . '/' . $reproductionDocumentA4 . '/' . $reproductionDocumentA3 . '/' . $reproductionPlanGuichetAuto . '/' . $autresReproduction;
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
                return response()->json(["reponse" => "nouveau mois succes"]);
            }
        } else {
            echo "Aucun enregistrement trouvé.";
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public function LastActivite(Request $request)
    {

        $activiteId = $request->activiteId;
        $circonscriptionId = $request->utilisateurCirconscriptionId;
        $utilisateurId = $request->utilisateurId;

        $LastEnregistrement = DB::table('enregistrers')
            ->where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest()
            ->first();

        return response()->json([
            "last" => $LastEnregistrement
        ]);
    }


    public function InitialisationActivite(Request $request)
    {
        $activiteId = 1;
        $circonscriptionId = $request->utilisateurCirconscriptionId;
        $utilisateurId = 0;


        while ($activiteId < 12) {

            $LastEnregistrement = DB::table('enregistrers')
                ->where('activite_id', '=', $activiteId)
                ->where('circonscription_id', '=', $circonscriptionId)
                ->first();

            if (!$LastEnregistrement) {
                //Creation d'un activité dont les valeur sont tous 0
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

                $enregistrer = new Enregistrer();
                $enregistrer->activite_id = $activiteId;
                $enregistrer->user_id = $utilisateurId;
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
            }
            $activiteId += 1;
        }

        return response()->json(["resultat" => "Table checked"]);
    }

    public function DateActivite(Request $request)
    {
        $activiteId = $request->activiteId;
        $circonscriptionId = $request->utilisateurCirconscriptionId;

        $ListEnregistrement = DB::table('enregistrers')->select(DB::raw('MONTH(created_at) as mois'), DB::raw('YEAR(created_at) as annee'), DB::raw('COUNT(*) as total'))
            ->groupBy('mois', 'annee')
            ->orderBy('annee', 'desc')
            ->orderBy('mois', 'desc')
            ->where('activite_id', '=', $activiteId)
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

    public function RechercheDateActivite(Request $request)
    {
        $activiteId = $request->activiteId;
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


        // Date de début et fin du mois et année sélectionnés
        $dateDebut = Carbon::createFromDate($annee, $convertMois, 1)->startOfMonth();
        $dateFin = Carbon::createFromDate($annee, $convertMois, 1)->endOfMonth();

        // Recherche du dernier enregistrement du mois et année sélectionnés
        $dernierEnregistrement = DB::table('enregistrers')
            ->whereBetween('created_at', [$dateDebut, $dateFin])
            ->where('activite_id', '=', $activiteId)
            ->where('circonscription_id', '=', $circonscriptionId)
            ->latest('created_at')
            ->first();

        if ($dernierEnregistrement) {
            // Vous pouvez accéder aux champs de l'enregistrement trouvé
            // $valeurChamp1 = $dernierEnregistrement->champ1;
            // $valeurChamp2 = $dernierEnregistrement->champ2;
            // ...

            return response()->json(["last" => $dernierEnregistrement]);
            // Faites ce que vous souhaitez avec les valeurs de l'enregistrement
        } else {
            return response()->json("aucun");
            // Aucun enregistrement trouvé pour le mois et l'année sélectionnés
        }
    }

    public function modificationAncien()
    {
        return response()->json(["modification de l'ancienne activité"]);
    }
}
