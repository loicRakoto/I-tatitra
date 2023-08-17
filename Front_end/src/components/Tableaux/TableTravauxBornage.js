import React from 'react'
import { useState, useMemo } from 'react';
import axios from 'axios';

function TableTravauxBornage({ CirconscriptionId, etatTableaux, setetatTableaux, envoiDate }) {



    //STATE DU TABLEAU
    const [a1, seta1] = useState(0);
    const [a2, seta2] = useState(0);
    const [a3, seta3] = useState(0);
    const [a4, seta4] = useState(0);
    const [a5, seta5] = useState(0);

    const [b1, setb1] = useState(0);
    const [b2, setb2] = useState(0);
    const [b3, setb3] = useState(0);
    const [b4, setb4] = useState(0);
    const [b5, setb5] = useState(0);

    const [c1, setc1] = useState(0);
    const [c2, setc2] = useState(0);
    const [c3, setc3] = useState(0);
    const [c4, setc4] = useState(0);
    const [c5, setc5] = useState(0);

    const [d1, setd1] = useState(0);
    const [d2, setd2] = useState(0);
    const [d3, setd3] = useState(0);
    const [d4, setd4] = useState(0);
    const [d5, setd5] = useState(0);

    const [e1, sete1] = useState(0);
    const [e2, sete2] = useState(0);
    const [e3, sete3] = useState(0);
    const [e4, sete4] = useState(0);
    const [e5, sete5] = useState(0);


    const formData = useMemo(() => ({
        params: {
            activiteId: 1,
            utilisateurCirconscriptionId: CirconscriptionId,
            date: envoiDate
        }
    }), [CirconscriptionId, envoiDate]);



    const actualisationTableau = async (api) => {
        try {
            // const api = "http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/RecuperationLastActivite";
            const response = await axios.get(api, formData);
            // console.log('date=', envoiDate);
            // console.log('Réponse de l\'API:', response.data.last);


            var recuMois = response.data.last.recu_mois;
            var executeMois = response.data.last.execute_mois;
            var encoursTraitement = response.data.last.en_cours_traitement;
            var payeNonExecute = response.data.last.paye_non_execute;
            var remisMois = response.data.last.remis_mois;

            //Assignation
            const RecuMois = recuMois.split('/');
            const ExecuteMois = executeMois.split('/');
            const EncoursTraitement = encoursTraitement.split('/');
            const PayeNonExecute = payeNonExecute.split('/');
            const RemisMois = remisMois.split('/');

            seta1(RecuMois[0]);
            seta2(RecuMois[1]);
            seta3(RecuMois[2]);
            seta4(RecuMois[3]);

            setb1(ExecuteMois[0]);
            setb2(ExecuteMois[1]);
            setb3(ExecuteMois[2]);
            setb4(ExecuteMois[3]);

            setc1(EncoursTraitement[0]);
            setc2(EncoursTraitement[1]);
            setc3(EncoursTraitement[2]);
            setc4(EncoursTraitement[3]);

            setd1(PayeNonExecute[0]);
            setd2(PayeNonExecute[1]);
            setd3(PayeNonExecute[2]);
            setd4(PayeNonExecute[3]);

            sete1(RemisMois[0]);
            sete2(RemisMois[1]);
            sete3(RemisMois[2]);
            sete4(RemisMois[3]);

            var TotalRecuMois = parseInt(RecuMois[0], 10) + parseInt(RecuMois[1], 10) + parseInt(RecuMois[2], 10) + parseInt(RecuMois[3], 10);
            var TotalExecuteMois = parseInt(ExecuteMois[0], 10) + parseInt(ExecuteMois[1], 10) + parseInt(ExecuteMois[2], 10) + parseInt(ExecuteMois[3], 10);
            var TotalEncoursTrTotalaitement = parseInt(EncoursTraitement[0], 10) + parseInt(EncoursTraitement[1], 10) + parseInt(EncoursTraitement[2], 10) + parseInt(EncoursTraitement[3], 10);
            var TotalPayeNonExecute = parseInt(PayeNonExecute[0], 10) + parseInt(PayeNonExecute[1], 10) + parseInt(PayeNonExecute[2], 10) + parseInt(PayeNonExecute[3], 10);
            var TotalRemisMois = parseInt(RemisMois[0], 10) + parseInt(RemisMois[1], 10) + parseInt(RemisMois[2], 10) + parseInt(RemisMois[3], 10);

            seta5(TotalRecuMois);
            setb5(TotalExecuteMois);
            setc5(TotalEncoursTrTotalaitement);
            setd5(TotalPayeNonExecute);
            sete5(TotalRemisMois);

            setetatTableaux(1000);
        } catch (error) {
            // console.error('Erreur lors de l\'envoi de la requête:', error);
        }
    }

    if (etatTableaux === 0) {
        //Dernier enregistrement
        const api = "http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/RecuperationLastActivite";
        actualisationTableau(api);
    } else if (etatTableaux === 1) {
        //Recherche date
        const api = "http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/RechercheDateActivite";
        actualisationTableau(api);
    }


    return (
        <>
            <table className="table table-hover tableau">

                <thead className='titre-tableau'>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">RECUS PENDANT LE MOIS</th>
                        <th scope="col">EXECUTE PENDANT LE MOIS	</th>
                        <th scope="col">EN COURS DE TRAITEMENT</th>
                        <th scope="col">PAYER NON EXECUTE</th>
                        <th scope="col">REMIS PENDANT LE MOIS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className='soustitre-tableau'>Immatriculation</th>
                        <td>a1 {a1}</td>
                        <td>b1 {b1}</td>
                        <td>c1 {c1}</td>
                        <td>d1 {d1}</td>
                        <td>e1 {e1}</td>
                    </tr>
                    <tr>
                        <th className='soustitre-tableau'>Morcellement / Fusion de morcellement</th>
                        <td>a2 {a2}</td>
                        <td>b2 {b2}</td>
                        <td>c2 {c2}</td>
                        <td>d2 {d2}</td>
                        <td>e2 {e2}</td>
                    </tr>
                    <tr>
                        <th className='soustitre-tableau'>Transformation parcelle cadastrale en titre foncier</th>
                        <td>a3 {a3}</td>
                        <td>b3 {b3}</td>
                        <td>c3 {c3}</td>
                        <td>d3 {d3}</td>
                        <td>e3 {e3}</td>
                    </tr>
                    <tr>
                        <th className='soustitre-tableau'>Changement de nom / titre</th>
                        <td>a4 {a4}</td>
                        <td>b4 {b4}</td>
                        <td>c4 {c4}</td>
                        <td>d4 {d4}</td>
                        <td>e4 {e4}</td>
                    </tr>
                    <tr>
                        <th className='total-tableau'>Total</th>
                        <td>a5 {a5}</td>
                        <td>b5 {b5}</td>
                        <td>c5 {c5}</td>
                        <td>d5 {d5}</td>
                        <td>e5 {e5}</td>
                    </tr>

                </tbody>
            </table>
        </>)
}

export default TableTravauxBornage