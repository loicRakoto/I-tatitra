import React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

function TableRapportActiviteCirtopo({ isLoading, setIsLoading, CirconscriptionId, etatTableaux, setetatTableaux, envoiDate }) {

    // const [dataLoaded, setDataLoaded] = useState(false);



    //STATE DU TABLEAU
    const [a1, seta1] = useState(0);
    const [a2, seta2] = useState(0);
    const [a3, seta3] = useState(0);
    const [a4, seta4] = useState(0);
    const [a5, seta5] = useState(0);
    const [a6, seta6] = useState(0);
    const [a7, seta7] = useState(0);
    const [a8, seta8] = useState(0);
    const [a9, seta9] = useState(0);
    const [a10, seta10] = useState(0);
    const [a11, seta11] = useState(0);
    const [a12, seta12] = useState(0);
    const [a13, seta13] = useState(0);
    const [a14, seta14] = useState(0);
    const [a15, seta15] = useState(0);
    const [a16, seta16] = useState(0);
    const [a17, seta17] = useState(0);
    const [a18, seta18] = useState(0);
    const [a19, seta19] = useState(0);
    const [a20, seta20] = useState(0);
    const [a21, seta21] = useState(0);
    const [a22, seta22] = useState(0);
    const [a23, seta23] = useState(0);
    const [a24, seta24] = useState(0);
    const [a25, seta25] = useState(0);
    const [a26, seta26] = useState(0);
    const [a27, seta27] = useState(0);
    const [a28, seta28] = useState(0);
    const [a29, seta29] = useState(0);
    const [a30, seta30] = useState(0);
    const [a31, seta31] = useState(0);
    const [a32, seta32] = useState(0);
    const [a33, seta33] = useState(0);
    const [a34, seta34] = useState(0);
    const [a35, seta35] = useState(0);
    const [a36, seta36] = useState(0);



    const formData = useMemo(() => ({
        params: {
            // activiteId: 1,
            utilisateurCirconscriptionId: CirconscriptionId,
            // date: envoiDate
        }
    }), [CirconscriptionId]);


    const actualisationTableau = useCallback(async (api) => {


        try {

            const response = await axios.get(api, formData);

            //TRAVAUX_BORNAGES
            var recuMoisBornage = response.data.TRAVAUX_BORNAGES.recu_mois;
            var executeMoisBornage = response.data.TRAVAUX_BORNAGES.execute_mois;
            var encoursTraitementBornage = response.data.TRAVAUX_BORNAGES.en_cours_traitement;
            var payeNonExecuteBornage = response.data.TRAVAUX_BORNAGES.paye_non_execute;
            var remisMoisBornage = response.data.TRAVAUX_BORNAGES.remis_mois;

            //TRAVAUX PLAN REGULIER ET PROJET DE MORCELLEMENT
            var recuMoisPlanRegulierProjetMorcellement = response.data.TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT.recu_mois;
            var executeMoisPlanRegulierProjetMorcellement = response.data.TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT.execute_mois;
            var encoursTraitementPlanRegulierProjetMorcellement = response.data.TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT.en_cours_traitement;
            var payeNonExecutePlanRegulierProjetMorcellement = response.data.TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT.paye_non_execute;
            var remisMoisPlanRegulierProjetMorcellement = response.data.TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT.remis_mois;

            //AUTRES TRAVAUX
            var recuMoisAutresTravaux = response.data.AUTRES_TRAVAUX.recu_mois;
            var executeMoisAutresTravaux = response.data.AUTRES_TRAVAUX.execute_mois;
            var encoursTraitementAutresTravaux = response.data.AUTRES_TRAVAUX.en_cours_traitement;
            var payeNonExecuteAutresTravaux = response.data.AUTRES_TRAVAUX.paye_non_execute;
            var remisMoisAutresTravaux = response.data.AUTRES_TRAVAUX.remis_mois;

            //TRAVAUX DE REPERAGE
            var recuMoisReperage = response.data.TRAVAUX_DE_REPERAGE.recu_mois;
            var executeMoisReperage = response.data.TRAVAUX_DE_REPERAGE.execute_mois;
            var encoursTraitementReperage = response.data.TRAVAUX_DE_REPERAGE.en_cours_traitement;
            var payeNonExecuteReperage = response.data.TRAVAUX_DE_REPERAGE.paye_non_execute;
            var remisMoisReperage = response.data.TRAVAUX_DE_REPERAGE.remis_mois;


            //REPRODUCTION PLAN
            var recuMoisReproductionPlan = response.data.REPRODUCTION_PLAN.recu_mois;
            var executeMoisReproductionPlan = response.data.REPRODUCTION_PLAN.execute_mois;
            var remisMoisReproductionPlan = response.data.REPRODUCTION_PLAN.remis_mois;

            //AUTRES REPRODUCTION
            var recuMoisAutresReproduction = response.data.AUTRES_REPRODUCTIONS.recu_mois;
            var executeMoisAutresReproduction = response.data.AUTRES_REPRODUCTIONS.execute_mois;
            var remisMoisAutresReproduction = response.data.AUTRES_REPRODUCTIONS.remis_mois;

            //SURFACES BORNEES
            var borneesSurfacesBornes = response.data.SURFACE_BORNEES.borne;

            //DEMATERIALISATION
            var restaureDematerialisation = response.data.DEMATERIALISATION.restaure;
            var scanneDematerialisation = response.data.DEMATERIALISATION.scane;
            var vectoriseDematerialisation = response.data.DEMATERIALISATION.vectorise;

            //Elaboration Plof / Validation plof
            var enCoursTraitementElaboValidPlof = response.data.ELABORATION_PLOF_VALIDATION_PLOF.en_cours_traitement;
            var valideElaboValidPlof = response.data.last.valide;

            //Fond plan deteriore et ou demande speciale
            var bourrageFondPlanDeterioreDmdSpeciale = response.data.FOND_PLAN_DETERIORE_ET_OU_DEMANDES_SPECIALES.bourrage;
            var decalageFondPlanDeterioreDmdSpeciale = response.data.FOND_PLAN_DETERIORE_ET_OU_DEMANDES_SPECIALES.decalage;
            var autresFondPlanDeterioreDmdSpeciale = response.data.FOND_PLAN_DETERIORE_ET_OU_DEMANDES_SPECIALES.autres;
            var demandeSpecialesFondPlanDeterioreDmdSpeciale = response.data.FOND_PLAN_DETERIORE_ET_OU_DEMANDES_SPECIALES.demande_speciale;

            //Budget generale
            // var payesBudgetGenerale = response.data.BUDGET_GENERALE.payes;



            //Assignation

            const RecuMoisBornage = recuMoisBornage.split('/');
            const ExecuteMoisBornage = executeMoisBornage.split('/');
            const EncoursTraitementBornage = encoursTraitementBornage.split('/');
            const PayeNonExecuteBornage = payeNonExecuteBornage.split('/');
            const RemisMoisBornage = remisMoisBornage.split('/');

            const RecuMoisPlanRegulierProjetMorcellement = recuMoisPlanRegulierProjetMorcellement.split('/');
            const ExecuteMoisPlanRegulierProjetMorcellement = executeMoisPlanRegulierProjetMorcellement.split('/');
            const EncoursTraitementPlanRegulierProjetMorcellement = encoursTraitementPlanRegulierProjetMorcellement.split('/');
            const PayeNonExecutePlanRegulierProjetMorcellement = payeNonExecutePlanRegulierProjetMorcellement.split('/');
            const RemisMoisPlanRegulierProjetMorcellement = remisMoisPlanRegulierProjetMorcellement.split('/');

            const RecuMoisAutresTravaux = recuMoisAutresTravaux.split('/');
            const ExecuteMoisAutresTravaux = executeMoisAutresTravaux.split('/');
            const EncoursTraitementAutresTravaux = encoursTraitementAutresTravaux.split('/');
            const PayeNonExecuteAutresTravaux = payeNonExecuteAutresTravaux.split('/');
            const RemisMoisAutresTravaux = remisMoisAutresTravaux.split('/');

            const RecuMoisReperage = recuMoisReperage.split('/');
            const ExecuteMoisReperage = executeMoisReperage.split('/');
            const EncoursTraitementReperage = encoursTraitementReperage.split('/');
            const PayeNonExecuteReperage = payeNonExecuteReperage.split('/');
            const RemisMoisReperage = remisMoisReperage.split('/');

            const RecuMoisReproductionPlan = recuMoisReproductionPlan.split('/');
            const ExecuteMoisReproductionPlan = executeMoisReproductionPlan.split('/');
            const RemisMoisReproductionPlan = remisMoisReproductionPlan.split('/');

            const RecuMoisAutresReproduction = recuMoisAutresReproduction.split('/');
            const ExecuteMoisAutresReproduction = executeMoisAutresReproduction.split('/');
            const RemisMoisAutresReproduction = remisMoisAutresReproduction.split('/');

            const BorneesSurfacesBornes = borneesSurfacesBornes.split('/');

            const RestaureDematerialisation = restaureDematerialisation.split('/');
            const ScanneDematerialisation = scanneDematerialisation.split('/');
            const VectoriseDematerialisation = vectoriseDematerialisation.split('/');

            const EnCoursTraitementElaboValidPlof = enCoursTraitementElaboValidPlof.split('/');
            const ValideElaboValidPlof = valideElaboValidPlof.split('/');

            const BourrageFondPlanDeterioreDmdSpeciale = bourrageFondPlanDeterioreDmdSpeciale.split('/');
            const DecalageFondPlanDeterioreDmdSpeciale = decalageFondPlanDeterioreDmdSpeciale.split('/');
            const AutresFondPlanDeterioreDmdSpeciale = autresFondPlanDeterioreDmdSpeciale.split('/');
            const DemandeSpecialesFondPlanDeterioreDmdSpeciale = demandeSpecialesFondPlanDeterioreDmdSpeciale.split('/');

            // const PayesBudgetGenerale = payesBudgetGenerale.split('/');

            var Total_RecuMoisBornage = parseInt(RecuMoisBornage[0], 10) + parseInt(RecuMoisBornage[1], 10) + parseInt(RecuMoisBornage[2], 10) + parseInt(RecuMoisBornage[3], 10);
            var Total_ExecuteMoisBornage = parseInt(ExecuteMoisBornage[0], 10) + parseInt(ExecuteMoisBornage[1], 10) + parseInt(ExecuteMoisBornage[2], 10) + parseInt(ExecuteMoisBornage[3], 10);
            var Total_EncoursTraitementBornage = parseInt(EncoursTraitementBornage[0], 10) + parseInt(EncoursTraitementBornage[1], 10) + parseInt(EncoursTraitementBornage[2], 10) + parseInt(EncoursTraitementBornage[3], 10);
            var Total_PayeNonExecuteBornage = parseInt(PayeNonExecuteBornage[0], 10) + parseInt(PayeNonExecuteBornage[1], 10) + parseInt(PayeNonExecuteBornage[2], 10) + parseInt(PayeNonExecuteBornage[3], 10);
            var Total_RemisMoisBornage = parseInt(RemisMoisBornage[0], 10) + parseInt(RemisMoisBornage[1], 10) + parseInt(RemisMoisBornage[2], 10) + parseInt(RemisMoisBornage[3], 10);

            var Total_RecuMoisPlanRegulierProjetMorcellement = parseInt(RecuMoisPlanRegulierProjetMorcellement[0], 10) + parseInt(RecuMoisPlanRegulierProjetMorcellement[1], 10) + parseInt(RecuMoisPlanRegulierProjetMorcellement[2], 10) + parseInt(RecuMoisPlanRegulierProjetMorcellement[3], 10);
            var Total_ExecuteMoisPlanRegulierProjetMorcellement = parseInt(ExecuteMoisPlanRegulierProjetMorcellement[0], 10) + parseInt(ExecuteMoisPlanRegulierProjetMorcellement[1], 10) + parseInt(ExecuteMoisPlanRegulierProjetMorcellement[2], 10) + parseInt(ExecuteMoisPlanRegulierProjetMorcellement[3], 10);
            var Total_EncoursTraitementPlanRegulierProjetMorcellement = parseInt(EncoursTraitementPlanRegulierProjetMorcellement[0], 10) + parseInt(EncoursTraitementPlanRegulierProjetMorcellement[1], 10) + parseInt(EncoursTraitementPlanRegulierProjetMorcellement[2], 10) + parseInt(EncoursTraitementPlanRegulierProjetMorcellement[3], 10);
            var Total_PayeNonExecutePlanRegulierProjetMorcellement = parseInt(PayeNonExecutePlanRegulierProjetMorcellement[0], 10) + parseInt(PayeNonExecutePlanRegulierProjetMorcellement[1], 10) + parseInt(PayeNonExecutePlanRegulierProjetMorcellement[2], 10) + parseInt(PayeNonExecutePlanRegulierProjetMorcellement[3], 10);
            var Total_RemisMoisPlanRegulierProjetMorcellement = parseInt(RemisMoisPlanRegulierProjetMorcellement[0], 10) + parseInt(RemisMoisPlanRegulierProjetMorcellement[1], 10) + parseInt(RemisMoisPlanRegulierProjetMorcellement[2], 10) + parseInt(RemisMoisPlanRegulierProjetMorcellement[3], 10);

            var Total_RecuMoisAutresTravaux = parseInt(RecuMoisAutresTravaux[0], 10) + parseInt(RecuMoisAutresTravaux[1], 10) + parseInt(RecuMoisAutresTravaux[2], 10) + parseInt(RecuMoisAutresTravaux[3], 10) + parseInt(RecuMoisAutresTravaux[4], 10);
            var Total_ExecuteMoisAutresTravaux = parseInt(ExecuteMoisAutresTravaux[0], 10) + parseInt(ExecuteMoisAutresTravaux[1], 10) + parseInt(ExecuteMoisAutresTravaux[2], 10) + parseInt(ExecuteMoisAutresTravaux[3], 10) + parseInt(ExecuteMoisAutresTravaux[4], 10);
            var Total_EncoursTraitementAutresTravaux = parseInt(EncoursTraitementAutresTravaux[0], 10) + parseInt(EncoursTraitementAutresTravaux[1], 10) + parseInt(EncoursTraitementAutresTravaux[2], 10) + parseInt(EncoursTraitementAutresTravaux[3], 10) + parseInt(EncoursTraitementAutresTravaux[4], 10);
            var Total_PayeNonExecuteAutresTravaux = parseInt(PayeNonExecuteAutresTravaux[0], 10) + parseInt(PayeNonExecuteAutresTravaux[1], 10) + parseInt(PayeNonExecuteAutresTravaux[2], 10) + parseInt(PayeNonExecuteAutresTravaux[3], 10) + parseInt(PayeNonExecuteAutresTravaux[4], 10);
            var Total_RemisMoisAutresTravaux = parseInt(RemisMoisAutresTravaux[0], 10) + parseInt(RemisMoisAutresTravaux[1], 10) + parseInt(RemisMoisAutresTravaux[2], 10) + parseInt(RemisMoisAutresTravaux[3], 10) + parseInt(RemisMoisAutresTravaux[4], 10);

            var Total_RecuMoisReperage = parseInt(RecuMoisReperage[0], 10) + parseInt(RecuMoisReperage[1], 10) + parseInt(RecuMoisReperage[2], 10) + parseInt(RecuMoisReperage[3], 10) + parseInt(RecuMoisReperage[4], 10);
            var Total_ExecuteMoisReperage = parseInt(ExecuteMoisReperage[0], 10) + parseInt(ExecuteMoisReperage[1], 10) + parseInt(ExecuteMoisReperage[2], 10) + parseInt(ExecuteMoisReperage[3], 10) + parseInt(ExecuteMoisReperage[4], 10);
            var Total_EncoursTraitementReperage = parseInt(EncoursTraitementReperage[0], 10) + parseInt(EncoursTraitementReperage[1], 10) + parseInt(EncoursTraitementReperage[2], 10) + parseInt(EncoursTraitementReperage[3], 10) + parseInt(EncoursTraitementReperage[4], 10);
            var Total_PayeNonExecuteReperage = parseInt(PayeNonExecuteReperage[0], 10) + parseInt(PayeNonExecuteReperage[1], 10) + parseInt(PayeNonExecuteReperage[2], 10) + parseInt(PayeNonExecuteReperage[3], 10) + parseInt(PayeNonExecuteReperage[4], 10);
            var Total_RemisMoisReperage = parseInt(RemisMoisReperage[0], 10) + parseInt(RemisMoisReperage[1], 10) + parseInt(RemisMoisReperage[2], 10) + parseInt(RemisMoisReperage[3], 10) + parseInt(RemisMoisReperage[4], 10);

            var Total_RecuMoisReproductionPlan = parseInt(RecuMoisReproductionPlan[0], 10) + parseInt(RecuMoisReproductionPlan[1], 10) + parseInt(RecuMoisReproductionPlan[2], 10);
            var Total_ExecuteMoisReproductionPlan = parseInt(ExecuteMoisReproductionPlan[0], 10) + parseInt(ExecuteMoisReproductionPlan[1], 10) + parseInt(ExecuteMoisReproductionPlan[2], 10);
            var Total_RemisMoisReproductionPlan = parseInt(RemisMoisReproductionPlan[0], 10) + parseInt(RemisMoisReproductionPlan[1], 10) + parseInt(RemisMoisReproductionPlan[2], 10);

            var Total_RecuMoisAutresReproduction = parseInt(RecuMoisAutresReproduction[0], 10) + parseInt(RecuMoisAutresReproduction[1], 10) + parseInt(RecuMoisAutresReproduction[2], 10) + parseInt(RecuMoisAutresReproduction[3], 10) + parseInt(RecuMoisAutresReproduction[4], 10);
            var Total_ExecuteMoisAutresReproduction = parseInt(ExecuteMoisAutresReproduction[0], 10) + parseInt(ExecuteMoisAutresReproduction[1], 10) + parseInt(ExecuteMoisAutresReproduction[2], 10) + parseInt(ExecuteMoisAutresReproduction[3], 10) + parseInt(ExecuteMoisAutresReproduction[4], 10);
            var Total_RemisMoisAutresReproduction = parseInt(RemisMoisAutresReproduction[0], 10) + parseInt(RemisMoisAutresReproduction[1], 10) + parseInt(RemisMoisAutresReproduction[2], 10) + parseInt(RemisMoisAutresReproduction[3], 10) + parseInt(RemisMoisAutresReproduction[4], 10);

            var Total_BorneesSurfacesBornes = parseInt(BorneesSurfacesBornes[0], 10) + parseInt(BorneesSurfacesBornes[1], 10);

            var Total_RestaureDematerialisation = parseInt(RestaureDematerialisation[0], 10) + parseInt(RestaureDematerialisation[1], 10) + parseInt(RestaureDematerialisation[2], 10) + parseInt(RestaureDematerialisation[3], 10);
            var Total_ScanneDematerialisation = parseInt(ScanneDematerialisation[0], 10) + parseInt(ScanneDematerialisation[1], 10) + parseInt(ScanneDematerialisation[2], 10) + parseInt(ScanneDematerialisation[3], 10);
            var Total_VectoriseDematerialisation = parseInt(VectoriseDematerialisation[0], 10) + parseInt(VectoriseDematerialisation[1], 10) + parseInt(VectoriseDematerialisation[2], 10) + parseInt(VectoriseDematerialisation[3], 10);

            var Total_EnCoursTraitementElaboValidPlof = parseInt(EnCoursTraitementElaboValidPlof[0], 10) + parseInt(EnCoursTraitementElaboValidPlof[1], 10);
            var Total_ValideElaboValidPlof = parseInt(ValideElaboValidPlof[0], 10) + parseInt(ValideElaboValidPlof[1], 10);

            var Total_BourrageFondPlanDeterioreDmdSpeciale = parseInt(BourrageFondPlanDeterioreDmdSpeciale[0], 10) + parseInt(BourrageFondPlanDeterioreDmdSpeciale[1], 10);
            var Total_DecalageFondPlanDeterioreDmdSpeciale = parseInt(DecalageFondPlanDeterioreDmdSpeciale[0], 10) + parseInt(DecalageFondPlanDeterioreDmdSpeciale[1], 10);
            var Total_AutresFondPlanDeterioreDmdSpeciale = parseInt(AutresFondPlanDeterioreDmdSpeciale[0], 10) + parseInt(AutresFondPlanDeterioreDmdSpeciale[1], 10);
            var Total_DemandeSpecialesFondPlanDeterioreDmdSpeciale = parseInt(DemandeSpecialesFondPlanDeterioreDmdSpeciale[0], 10) + parseInt(DemandeSpecialesFondPlanDeterioreDmdSpeciale[1], 10);

            seta1(Total_RecuMoisBornage);
            seta2(Total_ExecuteMoisBornage);
            seta3(Total_EncoursTraitementBornage);
            seta4(Total_PayeNonExecuteBornage);
            seta5(Total_RemisMoisBornage);

            seta6(Total_RecuMoisPlanRegulierProjetMorcellement);
            seta7(Total_ExecuteMoisPlanRegulierProjetMorcellement);
            seta8(Total_EncoursTraitementPlanRegulierProjetMorcellement);
            seta9(Total_PayeNonExecutePlanRegulierProjetMorcellement);
            seta10(Total_RemisMoisPlanRegulierProjetMorcellement);

            seta11(Total_RecuMoisAutresTravaux);
            seta12(Total_ExecuteMoisAutresTravaux);
            seta13(Total_EncoursTraitementAutresTravaux);
            seta14(Total_PayeNonExecuteAutresTravaux);
            seta15(Total_RemisMoisAutresTravaux);

            seta16(Total_RecuMoisReperage);
            seta17(Total_ExecuteMoisReperage);
            seta18(Total_EncoursTraitementReperage);
            seta19(Total_PayeNonExecuteReperage);
            seta20(Total_RemisMoisReperage);

            seta21(Total_RecuMoisReproductionPlan);
            seta22(Total_ExecuteMoisReproductionPlan);
            seta23(Total_RemisMoisReproductionPlan);

            seta24(Total_RecuMoisAutresReproduction);
            seta25(Total_ExecuteMoisAutresReproduction);
            seta26(Total_RemisMoisAutresReproduction);

            seta27(Total_BorneesSurfacesBornes);

            seta28(Total_RestaureDematerialisation);
            seta29(Total_ScanneDematerialisation);
            seta30(Total_VectoriseDematerialisation);

            seta31(Total_EnCoursTraitementElaboValidPlof);
            seta32(Total_ValideElaboValidPlof);

            seta33(Total_BourrageFondPlanDeterioreDmdSpeciale);
            seta34(Total_DecalageFondPlanDeterioreDmdSpeciale);
            seta35(Total_AutresFondPlanDeterioreDmdSpeciale);
            seta36(Total_DemandeSpecialesFondPlanDeterioreDmdSpeciale);


            setetatTableaux(1000);


        } catch (error) {
            // console.error('Erreur lors de l\'envoi de la requête:', error);
        }


        // setetatTableaux(1000);
    }, [setetatTableaux, formData]);

    // const actualisationTableau = async (api) => {

    // }

    useEffect(() => {


        if (etatTableaux === 0) {
            //Dernier enregistrement de toute les activité de cirtopo

            const api = "http://127.0.0.1:8000/api/rapportActivite/cirtopo";
            actualisationTableau(api);
        }
        // else if (etatTableaux === 1) {
        //     //Recherche date

        //     const api = "http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/RechercheDateActivite";
        //     actualisationTableau(api);
        // }
        else if (etatTableaux === 1000) {
            setIsLoading(false);
        }

    }, [etatTableaux, actualisationTableau, setIsLoading]);


    return (
        <>
            {!isLoading && (
                <div className="container-tableau mt-3">
                    <table className="table table-hover tableau">

                        <thead className='titre-tableau'>
                            <tr className="tr1">
                                <th colspan={3}></th>
                                <th colspan={2} style="background-color: rgb(194, 102, 4);">ANOSY</th>
                            </tr>
                            <tr className="tr2">
                                {/* head activite / situation */}
                                <th className="tab-type-act"></th>
                                <th>ACTIVITES</th>
                                <th>SITUATION</th>
                                <th>TOLAGNARO</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>

                        <tbody>

                            {/* OPERATIONS TOPOGRAPHIQUES COURANTES  */}

                            {/* TRAVAUX DE BORNAGE  */}
                            <tr className="activite-1">
                                <td rowspan={27} class="tab-type-act operation">OPERATIONS TOPOGRAPHIQUES
                                    COURANTES</td>
                                <td rowspan={5} class="nom-activite">TRAVAUX DE BORNAGE</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                <td>{a1}</td>
                                <th>{a1}</th>
                            </tr>
                            <tr className="activite-1">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                <td>{a2}</td>
                                <th>{a2}</th>
                            </tr>
                            <tr className="activite-1">
                                <td className="situation-activite">En cours de traitement</td>
                                <td>{a3}</td>
                                <th>{a3}</th>
                            </tr>
                            <tr className="activite-1">
                                <td className="situation-activite">Payés non exécutés</td>
                                <td>{a4}</td>
                                <th>{a4}</th>
                            </tr>
                            <tr className="activite-1">
                                <td className="situation-activite">Remis pendant le mois</td>
                                <td>{a5}</td>
                                <th>{a5}</th>
                            </tr>

                            {/* TRAVEAUX DE PLAN REGULIER  */}
                            <tr className="activite-2">
                                <td rowspan={5} className="nom-activite">TRAVAUX DE PLAN REGULIER ET PROJET DE MORCELLEMENT</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                <td>{a6}</td>
                                <th>{a6}</th>
                            </tr>
                            <tr className="activite-2">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                <td>{a7}</td>
                                <th>{a7}</th>
                            </tr>
                            <tr className="activite-2">
                                <td className="situation-activite">En cours de traitement</td>
                                <td>{a8}</td>
                                <th>{a8}</th>
                            </tr>
                            <tr className="activite-2">
                                <td className="situation-activite">Payés non exécutés</td>
                                <td>{a9}</td>
                                <th>{a9}</th>
                            </tr>
                            <tr className="activite-2">
                                <td className="situation-activite">Remis pendant le mois</td>
                                <td>{a10}</td>
                                <th>{a10}</th>
                            </tr>

                            {/* AUTRES TRAVAUX */}
                            <tr className="activite-3">
                                <td rowspan={5} className="nom-activite">AUTRES TRAVAUX</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                <td>{a11}</td>
                                <th>{a11}</th>
                            </tr>
                            <tr className="activite-3">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                <td>{a12}</td>
                                <th>{a12}</th>
                            </tr>
                            <tr className="activite-3">
                                <td className="situation-activite">En cours de traitement</td>
                                <td>{a13}</td>
                                <th>{a13}</th>
                            </tr>
                            <tr className="activite-3">
                                <td className="situation-activite">Payés non exécutés</td>
                                <td>{a14}</td>
                                <th>{a14}</th>
                            </tr>
                            <tr className="activite-3">
                                <td className="situation-activite">Remis pendant le mois</td>
                                <td>{a15}</td>
                                <th>{a15}</th>
                            </tr>


                            {/* TRAVEAUX DE REPERAGE  */}
                            <tr className="activite-4">
                                <td rowspan={5} className="nom-activite">TRAVAUX DE REPERAGE</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                <td>{a16}</td>
                                <th>{a16}</th>
                            </tr>
                            <tr className="activite-4">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                <td>{a17}</td>
                                <th>{a17}</th>
                            </tr>
                            <tr className="activite-4">
                                <td className="situation-activite">En cours de traitement</td>
                                <td>{a18}</td>
                                <th>{a18}</th>
                            </tr>
                            <tr className="activite-4">
                                <td className="situation-activite">Payés non exécutés</td>
                                <td>{a19}</td>
                                <th>{a19}</th>
                            </tr>
                            <tr className="activite-4">
                                <td className="situation-activite">Remis pendant le mois</td>
                                <td>{a20}</td>
                                <th>{a20}</th>
                            </tr>


                            {/* REPRODUCTION PLAN */}
                            <tr className="activite-5">
                                <td rowspan={3} className="nom-activite">REPRODUCTION PLAN</td>
                                <td>{a21}</td>
                                <th>{a21}</th>
                            </tr >
                            <tr className="activite-5">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                <td>{a22}</td>
                                <th>{a22}</th>
                            </tr>
                            <tr className="activite-5">
                                <td className="situation-activite">Remis pendant le mois</td>
                                <td>{a23}</td>
                                <th>{a23}</th>
                            </tr>

                            {/* AUTRES REPRODUCTION */}
                            <tr className="activite-6">
                                <td rowspan={3} className="nom-activite">AUTRES REPRODUCTION</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                <td>{a24}</td>
                                <th>{a24}</th>
                            </tr >
                            <tr className="activite-6">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                <td>{a25}</td>
                                <th>{a25}</th>
                            </tr>
                            <tr className="activite-6">
                                <td className="situation-activite">Remis pendant le mois</td>
                                <td>{a26}</td>
                                <th>{a26}</th>
                            </tr>

                            {/* SURFACES BORNEES */}
                            <tr className="activite-7">
                                <td className="nom-activite">SURFACES BORNEES</td>
                                <td className="situation-activite">Bornées</td>
                                <td>{a27}</td>
                                <th>{a27}</th>
                            </tr>


                            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
                            {/* TRAVAUX DE MODERNISATION  */}
                            {/* DEMATERIALISATION */}
                            <tr className="activite-8">
                                <td rowspan={5} className="tab-type-act">TRAVAUX DE MODERNISATION</td>
                                <td rowspan={3} className="nom - activite">DEMATERIALISATION</td >
                                <td td className="situation-activite" > Restaurés</td>
                                <td>{a28}</td>
                                <th>{a28}</th>
                            </tr >
                            <tr className="activite-8">
                                <td className="situation-activite">Scannés</td>
                                <td>{a29}</td>
                                <th>{a29}</th>
                            </tr>
                            <tr className="activite-8">
                                <td className="situation-activite">Vectorisés</td>
                                <td>{a30}</td>
                                <th>{a30}</th>
                            </tr>

                            {/* ELABORATION PLOF / VALIDATION PLOF */}
                            <tr className="activite-9">
                                <td rowspan={2} className="nom-activite">ELABORATION PLOF / VALIDATION PLOF</td>
                                <td className="situation-activite">En cours de traitement</td>
                                <td>{a31}</td>
                                <th>{a31}</th>
                            </tr >
                            <tr className="activite-9">
                                <td className="situation-activite">Validé</td>
                                <td>{a32}</td>
                                <th>{a32}</th>
                            </tr>


                            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                             /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                             /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                             ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
                            {/* FOND PLAN  */}
                            <tr className="activite-10">
                                <td rowspan={4} className="tab-type-act">FOND PLAN</td>
                                <td rowspan={4} className="nom - activite">FONDS PLAN DETERIORES ET / OU DEMANDES SPECIALES</td >
                                <td td className="situation-activite" > Bourrage</td>
                                <td>{a33}</td>
                                <th>{a33}</th>
                            </tr >
                            <tr className="activite-10">
                                <td className="situation-activite">Décalage</td>
                                <td>{a34}</td>
                                <th>{a34}</th>
                            </tr>
                            <tr className="activite-10">
                                <td className="situation-activite">Autres</td>
                                <td>{a35}</td>
                                <th>{a35}</th>
                            </tr>
                            <tr className="activite-11">
                                <td className="situation-activite">Demande spéciales</td>
                                <td>{a36}</td>
                                <th>{a36}</th>
                            </tr>

                        </tbody >
                    </table >
                </div >
            )
            }

        </>)
}

export default TableRapportActiviteCirtopo