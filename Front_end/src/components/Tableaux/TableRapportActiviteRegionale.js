
import React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

function TableRapportActiviteRegionale({ isLoading, setIsLoading, CirconscriptionId, etatTableaux, setetatTableaux, envoiDate, nomRegion }) {

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

            utilisateurCirconscriptionId: CirconscriptionId,
            date: envoiDate
        }
    }), [CirconscriptionId, envoiDate]);

    const [TotalColonneDistrict, settotalColonneDistrict] = useState(0);
    const [ThElementsHeader, setthElementsHeader] = useState([]);

    const [TdActivite_1_RecuMois, settdActivite_1_RecuMois] = useState([]);
    const [TdActivite_1_ExecuteMois, settdActivite_1_ExecuteMois] = useState([]);
    const [TdActivite_1_EnCoursTraitement, settdActivite_1_EnCoursTraitement] = useState([]);
    const [TdActivite_1_PayeNonExecute, settdActivite_1_PayeNonExecute] = useState([]);
    const [TdActivite_1_RemisMois, settdActivite_1_RemisMois] = useState([]);

    const [TdActivite_2_RecuMois, settdActivite_2_RecuMois] = useState([]);
    const [TdActivite_2_ExecuteMois, settdActivite_2_ExecuteMois] = useState([]);
    const [TdActivite_2_EnCoursTraitement, settdActivite_2_EnCoursTraitement] = useState([]);
    const [TdActivite_2_PayeNonExecute, settdActivite_2_PayeNonExecute] = useState([]);
    const [TdActivite_2_RemisMois, settdActivite_2_RemisMois] = useState([]);

    const [TdActivite_3_RecuMois, settdActivite_3_RecuMois] = useState([]);
    const [TdActivite_3_ExecuteMois, settdActivite_3_ExecuteMois] = useState([]);
    const [TdActivite_3_EnCoursTraitement, settdActivite_3_EnCoursTraitement] = useState([]);
    const [TdActivite_3_PayeNonExecute, settdActivite_3_PayeNonExecute] = useState([]);
    const [TdActivite_3_RemisMois, settdActivite_3_RemisMois] = useState([]);

    const [TdActivite_4_RecuMois, settdActivite_4_RecuMois] = useState([]);
    const [TdActivite_4_ExecuteMois, settdActivite_4_ExecuteMois] = useState([]);
    const [TdActivite_4_EnCoursTraitement, settdActivite_4_EnCoursTraitement] = useState([]);
    const [TdActivite_4_PayeNonExecute, settdActivite_4_PayeNonExecute] = useState([]);
    const [TdActivite_4_RemisMois, settdActivite_4_RemisMois] = useState([]);

    const [TdActivite_5_RecuMois, settdActivite_5_RecuMois] = useState([]);
    const [TdActivite_5_ExecuteMois, settdActivite_5_ExecuteMois] = useState([]);
    const [TdActivite_5_RemisMois, settdActivite_5_RemisMois] = useState([]);

    const [TdActivite_6_RecuMois, settdActivite_6_RecuMois] = useState([]);
    const [TdActivite_6_ExecuteMois, settdActivite_6_ExecuteMois] = useState([]);
    const [TdActivite_6_RemisMois, settdActivite_6_RemisMois] = useState([]);

    const [TdActivite_7_Bornees, settdActivite_7_Bornees] = useState([]);

    const [TdActivite_8_Restaures, settdActivite_8_Restaures] = useState([]);
    const [TdActivite_8_Scannes, settdActivite_8_Scannes] = useState([]);
    const [TdActivite_8_Vectorises, settdActivite_8_Vectorises] = useState([]);

    const [TdActivite_9_EnCoursTraitement, settdActivite_9_EnCoursTraitement] = useState([]);
    const [TdActivite_9_Valide, settdActivite_9_Valide] = useState([]);

    const [TdActivite_10_Bourrage, settdActivite_10_Bourrage] = useState([]);
    const [TdActivite_10_Decalage, settdActivite_10_Decalage] = useState([]);
    const [TdActivite_10_Autres, settdActivite_10_Autres] = useState([]);
    const [TdActivite_10_DemandeSpeciale, settdActivite_10_DemandeSpeciale] = useState([]);




    const actualisationTableau = useCallback(async (api) => {

        try {

            const response = await axios.get(api, formData);

            const totalColonneDistrict = response.data.TotalDistrict;
            const ObtenuFinal = response.data.ObtenuFinal;

            const thElementsHeader = [];
            const tdActivite_1_RecuMois = [];
            const tdActivite_1_ExecuteMois = [];
            const tdActivite_1_EnCoursTraitement = [];
            const tdActivite_1_PayeNonExecute = [];
            const tdActivite_1_RemisMois = [];

            const tdActivite_2_RecuMois = [];
            const tdActivite_2_ExecuteMois = [];
            const tdActivite_2_EnCoursTraitement = [];
            const tdActivite_2_PayeNonExecute = [];
            const tdActivite_2_RemisMois = [];

            const tdActivite_3_RecuMois = [];
            const tdActivite_3_ExecuteMois = [];
            const tdActivite_3_EnCoursTraitement = [];
            const tdActivite_3_PayeNonExecute = [];
            const tdActivite_3_RemisMois = [];

            const tdActivite_4_RecuMois = [];
            const tdActivite_4_ExecuteMois = [];
            const tdActivite_4_EnCoursTraitement = [];
            const tdActivite_4_PayeNonExecute = [];
            const tdActivite_4_RemisMois = [];

            const tdActivite_5_RecuMois = [];
            const tdActivite_5_ExecuteMois = [];
            const tdActivite_5_RemisMois = [];

            const tdActivite_6_RecuMois = [];
            const tdActivite_6_ExecuteMois = [];
            const tdActivite_6_RemisMois = [];

            const tdActivite_7_Bornees = [];

            const tdActivite_8_Restaures = [];
            const tdActivite_8_Scannes = [];
            const tdActivite_8_Vectorises = [];

            const tdActivite_9_EnCoursTraitement = [];
            const tdActivite_9_Valide = [];

            const tdActivite_10_Bourrage = [];
            const tdActivite_10_Decalage = [];
            const tdActivite_10_Autres = [];
            const tdActivite_10_DemandeSpeciale = [];


            var finalRecuMoisBornage = 0;
            var finalExecuteMoisBornage = 0;
            var finalEncoursTraitementBornage = 0;
            var finalPayeNonExecuteBornage = 0;
            var finalRemisMoisBornage = 0;
            var finalRecuMoisPlanRegulierProjetMorcellement = 0;
            var finalExecuteMoisPlanRegulierProjetMorcellement = 0;
            var finalEncoursTraitementPlanRegulierProjetMorcellement = 0;
            var finalPayeNonExecutePlanRegulierProjetMorcellement = 0;
            var finalRemisMoisPlanRegulierProjetMorcellement = 0;
            var finalRecuMoisAutresTravaux = 0;
            var finalExecuteMoisAutresTravaux = 0;
            var finalEncoursTraitementAutresTravaux = 0;
            var finalPayeNonExecuteAutresTravaux = 0;
            var finalRemisMoisAutresTravaux = 0;
            var finalRecuMoisReperage = 0;
            var finalExecuteMoisReperage = 0;
            var finalEncoursTraitementReperage = 0;
            var finalPayeNonExecuteReperage = 0;
            var finalRemisMoisReperage = 0;
            var finalRecuMoisReproductionPlan = 0;
            var finalExecuteMoisReproductionPlan = 0;
            var finalRemisMoisReproductionPlan = 0;
            var finalRecuMoisAutresReproduction = 0;
            var finalExecuteMoisAutresReproduction = 0;
            var finalRemisMoisAutresReproduction = 0;
            var finalBorneesSurfacesBornes = 0;
            var finalRestaureDematerialisation = 0;
            var finalScanneDematerialisation = 0;
            var finalVectoriseDematerialisation = 0;
            var finalEnCoursTraitementElaboValidPlof = 0;
            var finalValideElaboValidPlof = 0;
            var finalBourrageFondPlanDeterioreDmdSpeciale = 0;
            var finalDecalageFondPlanDeterioreDmdSpeciale = 0;
            var finalAutresFondPlanDeterioreDmdSpeciale = 0;
            var finalDemandeSpecialesFondPlanDeterioreDmdSpeciale = 0;

            //HEADER
            for (let index = 0; index < totalColonneDistrict; index++) {
                thElementsHeader.push(<th className='districtHeader' key={index}>{ObtenuFinal[index].TRAVAUX_BORNAGES.NomCirconscription}</th>);
            }

            //TRAVAUX DE BORNAGE
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RecuMoisBornage = ObtenuFinal[index].TRAVAUX_BORNAGES.recu_mois.split('/');
                var Total_RecuMoisBornage = parseInt(RecuMoisBornage[0], 10) + parseInt(RecuMoisBornage[1], 10) + parseInt(RecuMoisBornage[2], 10) + parseInt(RecuMoisBornage[3], 10);
                finalRecuMoisBornage += Total_RecuMoisBornage;
                tdActivite_1_RecuMois.push(<td key={index}>{Total_RecuMoisBornage}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const ExecuteMoisBornage = ObtenuFinal[index].TRAVAUX_BORNAGES.execute_mois.split('/');
                var Total_ExecuteMoisBornage = parseInt(ExecuteMoisBornage[0], 10) + parseInt(ExecuteMoisBornage[1], 10) + parseInt(ExecuteMoisBornage[2], 10) + parseInt(ExecuteMoisBornage[3], 10);
                finalExecuteMoisBornage += Total_ExecuteMoisBornage;
                tdActivite_1_ExecuteMois.push(<td key={index}>{Total_ExecuteMoisBornage}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const EncoursTraitementBornage = ObtenuFinal[index].TRAVAUX_BORNAGES.en_cours_traitement.split('/');
                var Total_EncoursTraitementBornage = parseInt(EncoursTraitementBornage[0], 10) + parseInt(EncoursTraitementBornage[1], 10) + parseInt(EncoursTraitementBornage[2], 10) + parseInt(EncoursTraitementBornage[3], 10);
                finalEncoursTraitementBornage += Total_EncoursTraitementBornage;
                tdActivite_1_EnCoursTraitement.push(<td key={index}>{Total_EncoursTraitementBornage}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const PayeNonExecuteBornage = ObtenuFinal[index].TRAVAUX_BORNAGES.paye_non_execute.split('/');
                var Total_PayeNonExecuteBornage = parseInt(PayeNonExecuteBornage[0], 10) + parseInt(PayeNonExecuteBornage[1], 10) + parseInt(PayeNonExecuteBornage[2], 10) + parseInt(PayeNonExecuteBornage[3], 10);
                finalPayeNonExecuteBornage += Total_PayeNonExecuteBornage;
                tdActivite_1_PayeNonExecute.push(<td key={index}>{Total_PayeNonExecuteBornage}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RemisMoisBornage = ObtenuFinal[index].TRAVAUX_BORNAGES.remis_mois.split('/');
                var Total_RemisMoisBornage = parseInt(RemisMoisBornage[0], 10) + parseInt(RemisMoisBornage[1], 10) + parseInt(RemisMoisBornage[2], 10) + parseInt(RemisMoisBornage[3], 10);
                finalRemisMoisBornage += Total_RemisMoisBornage;
                tdActivite_1_RemisMois.push(<td key={index}>{Total_RemisMoisBornage}</td>);
            }

            //TRAVAUX PLAN REGULIER ET PROJET DE MORCELLEMENT
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RecuMoisPlanRegulierProjetMorcellement = ObtenuFinal[index].TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT.recu_mois.split('/');
                var Total_RecuMoisPlanRegulierProjetMorcellement = parseInt(RecuMoisPlanRegulierProjetMorcellement[0], 10) + parseInt(RecuMoisPlanRegulierProjetMorcellement[1], 10) + parseInt(RecuMoisPlanRegulierProjetMorcellement[2], 10) + parseInt(RecuMoisPlanRegulierProjetMorcellement[3], 10);
                finalRecuMoisPlanRegulierProjetMorcellement += Total_RecuMoisPlanRegulierProjetMorcellement;
                tdActivite_2_RecuMois.push(<td key={index}>{Total_RecuMoisPlanRegulierProjetMorcellement}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const ExecuteMoisPlanRegulierProjetMorcellement = ObtenuFinal[index].TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT.execute_mois.split('/');
                var Total_ExecuteMoisPlanRegulierProjetMorcellement = parseInt(ExecuteMoisPlanRegulierProjetMorcellement[0], 10) + parseInt(ExecuteMoisPlanRegulierProjetMorcellement[1], 10) + parseInt(ExecuteMoisPlanRegulierProjetMorcellement[2], 10) + parseInt(ExecuteMoisPlanRegulierProjetMorcellement[3], 10);
                finalExecuteMoisPlanRegulierProjetMorcellement += Total_ExecuteMoisPlanRegulierProjetMorcellement;
                tdActivite_2_ExecuteMois.push(<td key={index}>{Total_ExecuteMoisPlanRegulierProjetMorcellement}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const EncoursTraitementPlanRegulierProjetMorcellement = ObtenuFinal[index].TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT.en_cours_traitement.split('/');
                var Total_EncoursTraitementPlanRegulierProjetMorcellement = parseInt(EncoursTraitementPlanRegulierProjetMorcellement[0], 10) + parseInt(EncoursTraitementPlanRegulierProjetMorcellement[1], 10) + parseInt(EncoursTraitementPlanRegulierProjetMorcellement[2], 10) + parseInt(EncoursTraitementPlanRegulierProjetMorcellement[3], 10);
                finalEncoursTraitementPlanRegulierProjetMorcellement += Total_EncoursTraitementPlanRegulierProjetMorcellement;
                tdActivite_2_EnCoursTraitement.push(<td key={index}>{Total_EncoursTraitementPlanRegulierProjetMorcellement}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const PayeNonExecutePlanRegulierProjetMorcellement = ObtenuFinal[index].TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT.paye_non_execute.split('/');
                var Total_PayeNonExecutePlanRegulierProjetMorcellement = parseInt(PayeNonExecutePlanRegulierProjetMorcellement[0], 10) + parseInt(PayeNonExecutePlanRegulierProjetMorcellement[1], 10) + parseInt(PayeNonExecutePlanRegulierProjetMorcellement[2], 10) + parseInt(PayeNonExecutePlanRegulierProjetMorcellement[3], 10);
                finalPayeNonExecutePlanRegulierProjetMorcellement += Total_PayeNonExecutePlanRegulierProjetMorcellement;
                tdActivite_2_PayeNonExecute.push(<td key={index}>{Total_PayeNonExecutePlanRegulierProjetMorcellement}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RemisMoisPlanRegulierProjetMorcellement = ObtenuFinal[index].TRAVAUX_PLAN_REGULIER_PROJET_MORCELLEMENT.remis_mois.split('/');
                var Total_RemisMoisPlanRegulierProjetMorcellement = parseInt(RemisMoisPlanRegulierProjetMorcellement[0], 10) + parseInt(RemisMoisPlanRegulierProjetMorcellement[1], 10) + parseInt(RemisMoisPlanRegulierProjetMorcellement[2], 10) + parseInt(RemisMoisPlanRegulierProjetMorcellement[3], 10);
                finalRemisMoisPlanRegulierProjetMorcellement += Total_RemisMoisPlanRegulierProjetMorcellement;
                tdActivite_2_RemisMois.push(<td key={index}>{Total_RemisMoisPlanRegulierProjetMorcellement}</td>);
            }

            //AUTRES TRAVAUX
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RecuMoisAutresTravaux = ObtenuFinal[index].AUTRES_TRAVAUX.recu_mois.split('/');
                var Total_RecuMoisAutresTravaux = parseInt(RecuMoisAutresTravaux[0], 10) + parseInt(RecuMoisAutresTravaux[1], 10) + parseInt(RecuMoisAutresTravaux[2], 10) + parseInt(RecuMoisAutresTravaux[3], 10) + parseInt(RecuMoisAutresTravaux[4], 10);
                finalRecuMoisAutresTravaux += Total_RecuMoisAutresTravaux;
                tdActivite_3_RecuMois.push(<td key={index}>{Total_RecuMoisAutresTravaux}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const ExecuteMoisAutresTravaux = ObtenuFinal[index].AUTRES_TRAVAUX.execute_mois.split('/');
                var Total_ExecuteMoisAutresTravaux = parseInt(ExecuteMoisAutresTravaux[0], 10) + parseInt(ExecuteMoisAutresTravaux[1], 10) + parseInt(ExecuteMoisAutresTravaux[2], 10) + parseInt(ExecuteMoisAutresTravaux[3], 10) + parseInt(ExecuteMoisAutresTravaux[4], 10);
                finalExecuteMoisAutresTravaux += Total_ExecuteMoisAutresTravaux;
                tdActivite_3_ExecuteMois.push(<td key={index}>{Total_ExecuteMoisAutresTravaux}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const EncoursTraitementAutresTravaux = ObtenuFinal[index].AUTRES_TRAVAUX.en_cours_traitement.split('/');
                var Total_EncoursTraitementAutresTravaux = parseInt(EncoursTraitementAutresTravaux[0], 10) + parseInt(EncoursTraitementAutresTravaux[1], 10) + parseInt(EncoursTraitementAutresTravaux[2], 10) + parseInt(EncoursTraitementAutresTravaux[3], 10) + parseInt(EncoursTraitementAutresTravaux[4], 10);
                finalEncoursTraitementAutresTravaux += Total_EncoursTraitementAutresTravaux
                tdActivite_3_EnCoursTraitement.push(<td key={index}>{Total_EncoursTraitementAutresTravaux}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const PayeNonExecuteAutresTravaux = ObtenuFinal[index].AUTRES_TRAVAUX.paye_non_execute.split('/');
                var Total_PayeNonExecuteAutresTravaux = parseInt(PayeNonExecuteAutresTravaux[0], 10) + parseInt(PayeNonExecuteAutresTravaux[1], 10) + parseInt(PayeNonExecuteAutresTravaux[2], 10) + parseInt(PayeNonExecuteAutresTravaux[3], 10) + parseInt(PayeNonExecuteAutresTravaux[4], 10);
                finalPayeNonExecuteAutresTravaux += Total_PayeNonExecuteAutresTravaux;
                tdActivite_3_PayeNonExecute.push(<td key={index}>{Total_PayeNonExecuteAutresTravaux}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RemisMoisAutresTravaux = ObtenuFinal[index].AUTRES_TRAVAUX.remis_mois.split('/');
                var Total_RemisMoisAutresTravaux = parseInt(RemisMoisAutresTravaux[0], 10) + parseInt(RemisMoisAutresTravaux[1], 10) + parseInt(RemisMoisAutresTravaux[2], 10) + parseInt(RemisMoisAutresTravaux[3], 10) + parseInt(RemisMoisAutresTravaux[4], 10);
                finalRemisMoisAutresTravaux += Total_RemisMoisAutresTravaux;
                tdActivite_3_RemisMois.push(<td key={index}>{Total_RemisMoisAutresTravaux}</td>);
            }

            //TRAVAUX DE REPERAGE
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RecuMoisReperage = ObtenuFinal[index].TRAVAUX_DE_REPERAGE.recu_mois.split('/');
                var Total_RecuMoisReperage = parseInt(RecuMoisReperage[0], 10) + parseInt(RecuMoisReperage[1], 10) + parseInt(RecuMoisReperage[2], 10) + parseInt(RecuMoisReperage[3], 10) + parseInt(RecuMoisReperage[4], 10);
                finalRecuMoisReperage += Total_RecuMoisReperage;
                tdActivite_4_RecuMois.push(<td key={index}>{Total_RecuMoisReperage}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const ExecuteMoisReperage = ObtenuFinal[index].TRAVAUX_DE_REPERAGE.execute_mois.split('/');
                var Total_ExecuteMoisReperage = parseInt(ExecuteMoisReperage[0], 10) + parseInt(ExecuteMoisReperage[1], 10) + parseInt(ExecuteMoisReperage[2], 10) + parseInt(ExecuteMoisReperage[3], 10) + parseInt(ExecuteMoisReperage[4], 10);
                finalExecuteMoisReperage += Total_ExecuteMoisReperage;
                tdActivite_4_ExecuteMois.push(<td key={index}>{Total_ExecuteMoisReperage}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const EncoursTraitementReperage = ObtenuFinal[index].TRAVAUX_DE_REPERAGE.en_cours_traitement.split('/');
                var Total_EncoursTraitementReperage = parseInt(EncoursTraitementReperage[0], 10) + parseInt(EncoursTraitementReperage[1], 10) + parseInt(EncoursTraitementReperage[2], 10) + parseInt(EncoursTraitementReperage[3], 10) + parseInt(EncoursTraitementReperage[4], 10);
                finalEncoursTraitementReperage += Total_EncoursTraitementReperage;
                tdActivite_4_EnCoursTraitement.push(<td key={index}>{Total_EncoursTraitementReperage}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const PayeNonExecuteReperage = ObtenuFinal[index].TRAVAUX_DE_REPERAGE.paye_non_execute.split('/');
                var Total_PayeNonExecuteReperage = parseInt(PayeNonExecuteReperage[0], 10) + parseInt(PayeNonExecuteReperage[1], 10) + parseInt(PayeNonExecuteReperage[2], 10) + parseInt(PayeNonExecuteReperage[3], 10) + parseInt(PayeNonExecuteReperage[4], 10);
                finalPayeNonExecuteReperage += Total_PayeNonExecuteReperage;
                tdActivite_4_PayeNonExecute.push(<td key={index}>{Total_PayeNonExecuteReperage}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RemisMoisReperage = ObtenuFinal[index].TRAVAUX_DE_REPERAGE.remis_mois.split('/');
                var Total_RemisMoisReperage = parseInt(RemisMoisReperage[0], 10) + parseInt(RemisMoisReperage[1], 10) + parseInt(RemisMoisReperage[2], 10) + parseInt(RemisMoisReperage[3], 10) + parseInt(RemisMoisReperage[4], 10);
                finalRemisMoisReperage += Total_RemisMoisReperage;
                tdActivite_4_RemisMois.push(<td key={index}>{Total_RemisMoisReperage}</td>);
            }

            //REPRODUCTION PLAN
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RecuMoisReproductionPlan = ObtenuFinal[index].REPRODUCTION_PLAN.recu_mois.split('/');
                var Total_RecuMoisReproductionPlan = parseInt(RecuMoisReproductionPlan[0], 10) + parseInt(RecuMoisReproductionPlan[1], 10) + parseInt(RecuMoisReproductionPlan[2], 10);
                finalRecuMoisReproductionPlan += Total_RecuMoisReproductionPlan;
                tdActivite_5_RecuMois.push(<td key={index}>{Total_RecuMoisReproductionPlan}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const ExecuteMoisReproductionPlan = ObtenuFinal[index].REPRODUCTION_PLAN.execute_mois.split('/');
                var Total_ExecuteMoisReproductionPlan = parseInt(ExecuteMoisReproductionPlan[0], 10) + parseInt(ExecuteMoisReproductionPlan[1], 10) + parseInt(ExecuteMoisReproductionPlan[2], 10);
                finalExecuteMoisReproductionPlan += Total_ExecuteMoisReproductionPlan;
                tdActivite_5_ExecuteMois.push(<td key={index}>{Total_ExecuteMoisReproductionPlan}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RemisMoisReproductionPlan = ObtenuFinal[index].REPRODUCTION_PLAN.remis_mois.split('/');
                var Total_RemisMoisReproductionPlan = parseInt(RemisMoisReproductionPlan[0], 10) + parseInt(RemisMoisReproductionPlan[1], 10) + parseInt(RemisMoisReproductionPlan[2], 10);
                finalRemisMoisReproductionPlan += Total_RemisMoisReproductionPlan;
                tdActivite_5_RemisMois.push(<td key={index}>{Total_RemisMoisReproductionPlan}</td>);
            }


            //AUTRES REPRODUCTION
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RecuMoisAutresReproduction = ObtenuFinal[index].AUTRES_REPRODUCTIONS.recu_mois.split('/');
                var Total_RecuMoisAutresReproduction = parseInt(RecuMoisAutresReproduction[0], 10) + parseInt(RecuMoisAutresReproduction[1], 10) + parseInt(RecuMoisAutresReproduction[2], 10) + parseInt(RecuMoisAutresReproduction[3], 10) + parseInt(RecuMoisAutresReproduction[4], 10);
                finalRecuMoisAutresReproduction += Total_RecuMoisAutresReproduction;
                tdActivite_6_RecuMois.push(<td key={index}>{Total_RecuMoisAutresReproduction}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const ExecuteMoisAutresReproduction = ObtenuFinal[index].AUTRES_REPRODUCTIONS.execute_mois.split('/');
                var Total_ExecuteMoisAutresReproduction = parseInt(ExecuteMoisAutresReproduction[0], 10) + parseInt(ExecuteMoisAutresReproduction[1], 10) + parseInt(ExecuteMoisAutresReproduction[2], 10) + parseInt(ExecuteMoisAutresReproduction[3], 10) + parseInt(ExecuteMoisAutresReproduction[4], 10);
                finalExecuteMoisAutresReproduction += Total_ExecuteMoisAutresReproduction;
                tdActivite_6_ExecuteMois.push(<td key={index}>{Total_ExecuteMoisAutresReproduction}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const RemisMoisAutresReproduction = ObtenuFinal[index].AUTRES_REPRODUCTIONS.remis_mois.split('/');
                var Total_RemisMoisAutresReproduction = parseInt(RemisMoisAutresReproduction[0], 10) + parseInt(RemisMoisAutresReproduction[1], 10) + parseInt(RemisMoisAutresReproduction[2], 10) + parseInt(RemisMoisAutresReproduction[3], 10) + parseInt(RemisMoisAutresReproduction[4], 10);
                finalRemisMoisAutresReproduction += Total_RemisMoisAutresReproduction;
                tdActivite_6_RemisMois.push(<td key={index}>{Total_RemisMoisAutresReproduction}</td>);
            }


            //SURFACES BORNEES
            for (let index = 0; index < totalColonneDistrict; index++) {
                const BorneesSurfacesBornes = ObtenuFinal[index].SURFACE_BORNEES.borne.split('/');
                var Total_BorneesSurfacesBornes = parseInt(BorneesSurfacesBornes[0], 10) + parseInt(BorneesSurfacesBornes[1], 10);
                finalBorneesSurfacesBornes += Total_BorneesSurfacesBornes;
                tdActivite_7_Bornees.push(<td key={index}>{Total_BorneesSurfacesBornes}</td>);
            }

            //DEMATERIALISATION

            for (let index = 0; index < totalColonneDistrict; index++) {
                const RestaureDematerialisation = ObtenuFinal[index].DEMATERIALISATION.restaure.split('/');
                var Total_RestaureDematerialisation = parseInt(RestaureDematerialisation[0], 10) + parseInt(RestaureDematerialisation[1], 10) + parseInt(RestaureDematerialisation[2], 10) + parseInt(RestaureDematerialisation[3], 10);
                finalRestaureDematerialisation += Total_RestaureDematerialisation;
                tdActivite_8_Restaures.push(<td key={index}>{Total_RestaureDematerialisation}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const ScanneDematerialisation = ObtenuFinal[index].DEMATERIALISATION.scane.split('/');
                var Total_ScanneDematerialisation = parseInt(ScanneDematerialisation[0], 10) + parseInt(ScanneDematerialisation[1], 10) + parseInt(ScanneDematerialisation[2], 10) + parseInt(ScanneDematerialisation[3], 10);
                finalScanneDematerialisation += Total_ScanneDematerialisation;
                tdActivite_8_Scannes.push(<td key={index}>{Total_ScanneDematerialisation}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const VectoriseDematerialisation = ObtenuFinal[index].DEMATERIALISATION.vectorise.split('/');
                var Total_VectoriseDematerialisation = parseInt(VectoriseDematerialisation[0], 10) + parseInt(VectoriseDematerialisation[1], 10) + parseInt(VectoriseDematerialisation[2], 10) + parseInt(VectoriseDematerialisation[3], 10);
                finalVectoriseDematerialisation += Total_VectoriseDematerialisation;
                tdActivite_8_Vectorises.push(<td key={index}>{Total_VectoriseDematerialisation}</td>);
            }

            //Elaboration Plof / Validation plof
            for (let index = 0; index < totalColonneDistrict; index++) {
                const EnCoursTraitementElaboValidPlof = ObtenuFinal[index].ELABORATION_PLOF_VALIDATION_PLOF.en_cours_traitement.split('/');
                var Total_EnCoursTraitementElaboValidPlof = parseInt(EnCoursTraitementElaboValidPlof[0], 10) + parseInt(EnCoursTraitementElaboValidPlof[1], 10);
                finalEnCoursTraitementElaboValidPlof += Total_EnCoursTraitementElaboValidPlof;
                tdActivite_9_EnCoursTraitement.push(<td key={index}>{Total_EnCoursTraitementElaboValidPlof}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const ValideElaboValidPlof = ObtenuFinal[index].ELABORATION_PLOF_VALIDATION_PLOF.valide.split('/');
                var Total_ValideElaboValidPlof = parseInt(ValideElaboValidPlof[0], 10) + parseInt(ValideElaboValidPlof[1], 10);
                finalValideElaboValidPlof += Total_ValideElaboValidPlof;
                tdActivite_9_Valide.push(<td key={index}>{Total_ValideElaboValidPlof}</td>);
            }

            //Fond plan deteriore et ou demande speciale
            for (let index = 0; index < totalColonneDistrict; index++) {
                const BourrageFondPlanDeterioreDmdSpeciale = ObtenuFinal[index].FOND_PLAN_DETERIORE_ET_OU_DEMANDES_SPECIALES.bourrage.split('/');
                var Total_BourrageFondPlanDeterioreDmdSpeciale = parseInt(BourrageFondPlanDeterioreDmdSpeciale[0], 10) + parseInt(BourrageFondPlanDeterioreDmdSpeciale[1], 10);
                finalBourrageFondPlanDeterioreDmdSpeciale += Total_BourrageFondPlanDeterioreDmdSpeciale;
                tdActivite_10_Bourrage.push(<td key={index}>{Total_BourrageFondPlanDeterioreDmdSpeciale}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const DecalageFondPlanDeterioreDmdSpeciale = ObtenuFinal[index].FOND_PLAN_DETERIORE_ET_OU_DEMANDES_SPECIALES.decalage.split('/');
                var Total_DecalageFondPlanDeterioreDmdSpeciale = parseInt(DecalageFondPlanDeterioreDmdSpeciale[0], 10) + parseInt(DecalageFondPlanDeterioreDmdSpeciale[1], 10);
                finalDecalageFondPlanDeterioreDmdSpeciale += Total_DecalageFondPlanDeterioreDmdSpeciale;
                tdActivite_10_Decalage.push(<td key={index}>{Total_DecalageFondPlanDeterioreDmdSpeciale}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const AutresFondPlanDeterioreDmdSpeciale = ObtenuFinal[index].FOND_PLAN_DETERIORE_ET_OU_DEMANDES_SPECIALES.autres.split('/');
                var Total_AutresFondPlanDeterioreDmdSpeciale = parseInt(AutresFondPlanDeterioreDmdSpeciale[0], 10) + parseInt(AutresFondPlanDeterioreDmdSpeciale[1], 10);
                finalAutresFondPlanDeterioreDmdSpeciale += Total_AutresFondPlanDeterioreDmdSpeciale;
                tdActivite_10_Autres.push(<td key={index}>{Total_AutresFondPlanDeterioreDmdSpeciale}</td>);
            }
            for (let index = 0; index < totalColonneDistrict; index++) {
                const DemandeSpecialesFondPlanDeterioreDmdSpeciale = ObtenuFinal[index].FOND_PLAN_DETERIORE_ET_OU_DEMANDES_SPECIALES.demande_speciale.split('/');
                var Total_DemandeSpecialesFondPlanDeterioreDmdSpeciale = parseInt(DemandeSpecialesFondPlanDeterioreDmdSpeciale[0], 10) + parseInt(DemandeSpecialesFondPlanDeterioreDmdSpeciale[1], 10);
                finalDemandeSpecialesFondPlanDeterioreDmdSpeciale += Total_DemandeSpecialesFondPlanDeterioreDmdSpeciale;
                tdActivite_10_DemandeSpeciale.push(<td key={index}>{Total_DemandeSpecialesFondPlanDeterioreDmdSpeciale}</td>);
            }

            seta1(finalRecuMoisBornage);
            seta2(finalExecuteMoisBornage);
            seta3(finalEncoursTraitementBornage);
            seta4(finalPayeNonExecuteBornage);
            seta5(finalRemisMoisBornage);

            seta6(finalRecuMoisPlanRegulierProjetMorcellement);
            seta7(finalExecuteMoisPlanRegulierProjetMorcellement);
            seta8(finalEncoursTraitementPlanRegulierProjetMorcellement);
            seta9(finalPayeNonExecutePlanRegulierProjetMorcellement);
            seta10(finalRemisMoisPlanRegulierProjetMorcellement);

            seta11(finalRecuMoisAutresTravaux);
            seta12(finalExecuteMoisAutresTravaux);
            seta13(finalEncoursTraitementAutresTravaux);
            seta14(finalPayeNonExecuteAutresTravaux);
            seta15(finalRemisMoisAutresTravaux);

            seta16(finalRecuMoisReperage);
            seta17(finalExecuteMoisReperage);
            seta18(finalEncoursTraitementReperage);
            seta19(finalPayeNonExecuteReperage);
            seta20(finalRemisMoisReperage);

            seta21(finalRecuMoisReproductionPlan);
            seta22(finalExecuteMoisReproductionPlan);
            seta23(finalRemisMoisReproductionPlan);

            seta24(finalRecuMoisAutresReproduction);
            seta25(finalExecuteMoisAutresReproduction);
            seta26(finalRemisMoisAutresReproduction);

            seta27(finalBorneesSurfacesBornes);

            seta28(finalRestaureDematerialisation);
            seta29(finalScanneDematerialisation);
            seta30(finalVectoriseDematerialisation);

            seta31(finalEnCoursTraitementElaboValidPlof);
            seta32(finalValideElaboValidPlof);

            seta33(finalBourrageFondPlanDeterioreDmdSpeciale);
            seta34(finalDecalageFondPlanDeterioreDmdSpeciale);
            seta35(finalAutresFondPlanDeterioreDmdSpeciale);
            seta36(finalDemandeSpecialesFondPlanDeterioreDmdSpeciale);

            /////////////////////////////////////////////////////////////
            settotalColonneDistrict(totalColonneDistrict);
            setthElementsHeader(thElementsHeader);

            settdActivite_1_RecuMois(tdActivite_1_RecuMois);
            settdActivite_1_ExecuteMois(tdActivite_1_ExecuteMois);
            settdActivite_1_EnCoursTraitement(tdActivite_1_EnCoursTraitement);
            settdActivite_1_PayeNonExecute(tdActivite_1_PayeNonExecute);
            settdActivite_1_RemisMois(tdActivite_1_RemisMois);

            settdActivite_2_RecuMois(tdActivite_2_RecuMois);
            settdActivite_2_ExecuteMois(tdActivite_2_ExecuteMois);
            settdActivite_2_EnCoursTraitement(tdActivite_2_EnCoursTraitement);
            settdActivite_2_PayeNonExecute(tdActivite_2_PayeNonExecute);
            settdActivite_2_RemisMois(tdActivite_2_RemisMois);

            settdActivite_3_RecuMois(tdActivite_3_RecuMois);
            settdActivite_3_ExecuteMois(tdActivite_3_ExecuteMois);
            settdActivite_3_EnCoursTraitement(tdActivite_3_EnCoursTraitement);
            settdActivite_3_PayeNonExecute(tdActivite_3_PayeNonExecute);
            settdActivite_3_RemisMois(tdActivite_3_RemisMois);

            settdActivite_4_RecuMois(tdActivite_4_RecuMois);
            settdActivite_4_ExecuteMois(tdActivite_4_ExecuteMois);
            settdActivite_4_EnCoursTraitement(tdActivite_4_EnCoursTraitement);
            settdActivite_4_PayeNonExecute(tdActivite_4_PayeNonExecute);
            settdActivite_4_RemisMois(tdActivite_4_RemisMois);

            settdActivite_5_RecuMois(tdActivite_5_RecuMois);
            settdActivite_5_ExecuteMois(tdActivite_5_ExecuteMois);
            settdActivite_5_RemisMois(tdActivite_5_RemisMois);

            settdActivite_6_RecuMois(tdActivite_6_RecuMois);
            settdActivite_6_ExecuteMois(tdActivite_6_ExecuteMois);
            settdActivite_6_RemisMois(tdActivite_6_RemisMois);

            settdActivite_7_Bornees(tdActivite_7_Bornees);

            settdActivite_8_Restaures(tdActivite_8_Restaures);
            settdActivite_8_Scannes(tdActivite_8_Scannes);
            settdActivite_8_Vectorises(tdActivite_8_Vectorises);

            settdActivite_9_EnCoursTraitement(tdActivite_9_EnCoursTraitement);
            settdActivite_9_Valide(tdActivite_9_Valide);

            settdActivite_10_Bourrage(tdActivite_10_Bourrage);
            settdActivite_10_Decalage(tdActivite_10_Decalage);
            settdActivite_10_Autres(tdActivite_10_Autres);
            settdActivite_10_DemandeSpeciale(tdActivite_10_DemandeSpeciale);

            setetatTableaux(1000);


        } catch (error) {
            // console.error('Erreur lors de l\'envoi de la requête:', error);
        }


        // setetatTableaux(1000);
    }, [setetatTableaux, formData]);

    // const actualisationTableau = async (api) => {

    // }

    useEffect(() => {
        if (etatTableaux === 0 && CirconscriptionId !== 0) {
            //Dernier enregistrement de toute les activité de cirtopo
            const api = "http://127.0.0.1:8000/api/rapportActivite/region";

            actualisationTableau(api);
        }
        else if (etatTableaux === 1 && envoiDate !== '') {
            //Recherche date
            const api = "http://127.0.0.1:8000/api/RechercheRapportActiviteRegionale/region";
            actualisationTableau(api);
        }
        else if (etatTableaux === 1000) {
            setIsLoading(false);
        }

    }, [etatTableaux, actualisationTableau, setIsLoading, CirconscriptionId, envoiDate]);


    return (
        <>
            {!isLoading && (
                <div className="container-tableau mt-3">
                    <table className="table table-hover tableau">

                        <thead className='titre-tableau'>
                            <tr className="tr1">
                                <th colSpan={3}></th>
                                <th className='title-region' colSpan={TotalColonneDistrict + 1} >{nomRegion}</th>
                            </tr>
                            <tr className="tr2">
                                {/* head activite / situation */}
                                <th>LES TRAVAUX</th>
                                <th>ACTIVITES</th>
                                <th>SITUATION</th>
                                {ThElementsHeader}
                                <th>TOTAL</th>
                            </tr>
                        </thead>

                        <tbody>

                            {/* OPERATIONS TOPOGRAPHIQUES COURANTES  */}

                            {/* TRAVAUX DE BORNAGE  */}
                            <tr className="activite-1">
                                <td rowSpan={27} className="tab-type-act operation">OPERATIONS TOPOGRAPHIQUES
                                    COURANTES</td>
                                <td rowSpan={5} className="nom-activite1">TRAVAUX DE BORNAGE</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                {TdActivite_1_RecuMois}
                                <th>{a1}</th>
                            </tr>
                            <tr className="activite-1">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                {TdActivite_1_ExecuteMois}
                                <th>{a2}</th>
                            </tr>
                            <tr className="activite-1">
                                <td className="situation-activite">En cours de traitement</td>
                                {TdActivite_1_EnCoursTraitement}
                                <th>{a3}</th>
                            </tr>
                            <tr className="activite-1">
                                <td className="situation-activite">Payés non exécutés</td>
                                {TdActivite_1_PayeNonExecute}
                                <th>{a4}</th>
                            </tr>
                            <tr className="activite-1">
                                <td className="situation-activite">Remis pendant le mois</td>
                                {TdActivite_1_RemisMois}
                                <th>{a5}</th>
                            </tr>

                            {/* TRAVEAUX DE PLAN REGULIER  */}
                            <tr className="activite-2">
                                <td rowSpan={5} className="nom-activite1">TRAVAUX DE PLAN REGULIER ET PROJET DE MORCELLEMENT</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                {TdActivite_2_RecuMois}
                                <th>{a6}</th>
                            </tr>
                            <tr className="activite-2">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                {TdActivite_2_ExecuteMois}
                                <th>{a7}</th>
                            </tr>
                            <tr className="activite-2">
                                <td className="situation-activite">En cours de traitement</td>
                                {TdActivite_2_EnCoursTraitement}
                                <th>{a8}</th>
                            </tr>
                            <tr className="activite-2">
                                <td className="situation-activite">Payés non exécutés</td>
                                {TdActivite_2_PayeNonExecute}
                                <th>{a9}</th>
                            </tr>
                            <tr className="activite-2">
                                <td className="situation-activite">Remis pendant le mois</td>
                                {TdActivite_2_RemisMois}
                                <th>{a10}</th>
                            </tr>

                            {/* AUTRES TRAVAUX */}
                            <tr className="activite-3">
                                <td rowSpan={5} className="nom-activite1">AUTRES TRAVAUX</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                {TdActivite_3_RecuMois}
                                <th>{a11}</th>
                            </tr>
                            <tr className="activite-3">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                {TdActivite_3_ExecuteMois}
                                <th>{a12}</th>
                            </tr>
                            <tr className="activite-3">
                                <td className="situation-activite">En cours de traitement</td>
                                {TdActivite_3_EnCoursTraitement}
                                <th>{a13}</th>
                            </tr>
                            <tr className="activite-3">
                                <td className="situation-activite">Payés non exécutés</td>
                                {TdActivite_3_PayeNonExecute}
                                <th>{a14}</th>
                            </tr>
                            <tr className="activite-3">
                                <td className="situation-activite">Remis pendant le mois</td>
                                {TdActivite_3_RemisMois}
                                <th>{a15}</th>
                            </tr>


                            {/* TRAVEAUX DE REPERAGE  */}
                            <tr className="activite-4">
                                <td rowSpan={5} className="nom-activite1">TRAVAUX DE REPERAGE</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                {TdActivite_4_RecuMois}
                                <th>{a16}</th>
                            </tr>
                            <tr className="activite-4">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                {TdActivite_4_ExecuteMois}
                                <th>{a17}</th>
                            </tr>
                            <tr className="activite-4">
                                <td className="situation-activite">En cours de traitement</td>
                                {TdActivite_4_EnCoursTraitement}
                                <th>{a18}</th>
                            </tr>
                            <tr className="activite-4">
                                <td className="situation-activite">Payés non exécutés</td>
                                {TdActivite_4_PayeNonExecute}
                                <th>{a19}</th>
                            </tr>
                            <tr className="activite-4">
                                <td className="situation-activite">Remis pendant le mois</td>
                                {TdActivite_4_RemisMois}
                                <th>{a20}</th>
                            </tr>


                            {/* REPRODUCTION PLAN */}
                            <tr className="activite-5">
                                <td rowSpan={3} className="nom-activite1">REPRODUCTION PLAN</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                {TdActivite_5_RecuMois}
                                <th>{a21}</th>
                            </tr >
                            <tr className="activite-5">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                {TdActivite_5_ExecuteMois}
                                <th>{a22}</th>
                            </tr>
                            <tr className="activite-5">
                                <td className="situation-activite">Remis pendant le mois</td>
                                {TdActivite_5_RemisMois}
                                <th>{a23}</th>
                            </tr>

                            {/* AUTRES REPRODUCTION */}
                            <tr className="activite-6">
                                <td rowSpan={3} className="nom-activite1">AUTRES REPRODUCTION</td>
                                <td className="situation-activite">Reçus pendant le mois</td>
                                {TdActivite_6_RecuMois}
                                <th>{a24}</th>
                            </tr >
                            <tr className="activite-6">
                                <td className="situation-activite">Exécutés pendant le mois</td>
                                {TdActivite_6_ExecuteMois}
                                <th>{a25}</th>
                            </tr>
                            <tr className="activite-6">
                                <td className="situation-activite">Remis pendant le mois</td>
                                {TdActivite_6_RemisMois}
                                <th>{a26}</th>
                            </tr>

                            {/* SURFACES BORNEES */}
                            <tr className="activite-7">
                                <td className="nom-activite1">SURFACES BORNEES</td>
                                <td className="situation-activite">Bornées</td>
                                {TdActivite_7_Bornees}
                                <th>{a27}</th>
                            </tr>


                            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
                            {/* TRAVAUX DE MODERNISATION  */}
                            {/* DEMATERIALISATION */}
                            <tr className="activite-8">
                                <td rowSpan={5} className="tab-type-act">TRAVAUX DE MODERNISATION</td>
                                <td rowSpan={3} className="nom-activite2">DEMATERIALISATION</td >
                                <td className="situation-activite" > Restaurés</td>
                                {TdActivite_8_Restaures}
                                <th>{a28}</th>
                            </tr >
                            <tr className="activite-8">
                                <td className="situation-activite">Scannés</td>
                                {TdActivite_8_Scannes}
                                <th>{a29}</th>
                            </tr>
                            <tr className="activite-8">
                                <td className="situation-activite">Vectorisés</td>
                                {TdActivite_8_Vectorises}
                                <th>{a30}</th>
                            </tr>

                            {/* ELABORATION PLOF / VALIDATION PLOF */}
                            <tr className="activite-9">
                                <td rowSpan={2} className="nom-activite2">ELABORATION PLOF / VALIDATION PLOF</td>
                                <td className="situation-activite">En cours de traitement</td>
                                {TdActivite_9_EnCoursTraitement}
                                <th>{a31}</th>
                            </tr >
                            <tr className="activite-9">
                                <td className="situation-activite">Validé</td>
                                {TdActivite_9_Valide}
                                <th>{a32}</th>
                            </tr>


                            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                             /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                             /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                             ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
                            {/* FOND PLAN  */}
                            <tr className="activite-10">
                                <td rowSpan={4} className="tab-type-act">FOND PLAN</td>
                                <td rowSpan={4} className="nom-activite3">FONDS PLAN DETERIORES ET / OU DEMANDES SPECIALES</td >
                                <td className="situation-activite" > Bourrage</td>
                                {TdActivite_10_Bourrage}
                                <th>{a33}</th>
                            </tr >
                            <tr className="activite-10">
                                <td className="situation-activite">Décalage</td>
                                {TdActivite_10_Decalage}
                                <th>{a34}</th>
                            </tr>
                            <tr className="activite-10">
                                <td className="situation-activite">Autres</td>
                                {TdActivite_10_Autres}
                                <th>{a35}</th>
                            </tr>
                            <tr className="activite-10">
                                <td className="situation-activite">Demande spéciales</td>
                                {TdActivite_10_DemandeSpeciale}
                                <th>{a36}</th>
                            </tr>

                        </tbody >
                    </table >
                </div >
            )
            }

        </>)
}

export default TableRapportActiviteRegionale