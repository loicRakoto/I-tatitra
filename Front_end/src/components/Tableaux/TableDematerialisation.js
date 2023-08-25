import React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

function TableDematerialisation({ isLoading, setIsLoading, CirconscriptionId, etatTableaux, setetatTableaux, envoiDate }) {

    // const [dataLoaded, setDataLoaded] = useState(false);



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



    const formData = useMemo(() => ({
        params: {
            activiteId: 8,
            utilisateurCirconscriptionId: CirconscriptionId,
            date: envoiDate
        }
    }), [CirconscriptionId, envoiDate]);


    const actualisationTableau = useCallback(async (api) => {


        try {

            const response = await axios.get(api, formData);

            var restaure = response.data.last.restaure;
            var scanne = response.data.last.scane;
            var vectorise = response.data.last.vectorise;

            //Assignation
            const Restaure = restaure.split('/');
            const Scanne = scanne.split('/');
            const Vectorise = vectorise.split('/');


            seta1(Restaure[0]);
            seta2(Restaure[1]);
            seta3(Restaure[2]);
            seta4(Restaure[3]);

            setb1(Scanne[0]);
            setb2(Scanne[1]);
            setb3(Scanne[2]);
            setb4(Scanne[3]);

            setc1(Vectorise[0]);
            setc2(Vectorise[1]);
            setc3(Vectorise[2]);
            setc4(Vectorise[3]);


            var TotalRestaure = parseInt(Restaure[0], 10) + parseInt(Restaure[1], 10) + parseInt(Restaure[2], 10) + parseInt(Restaure[3], 10);
            var TotalScanne = parseInt(Scanne[0], 10) + parseInt(Scanne[1], 10) + parseInt(Scanne[2], 10) + parseInt(Scanne[3], 10);
            var TotalVectorise = parseInt(Vectorise[0], 10) + parseInt(Vectorise[1], 10) + parseInt(Vectorise[2], 10) + parseInt(Vectorise[3], 10);

            seta5(TotalRestaure);
            setb5(TotalScanne);
            setc5(TotalVectorise);

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
            //Dernier enregistrement

            const api = "http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/RecuperationLastActivite";
            actualisationTableau(api);
        } else if (etatTableaux === 1) {
            //Recherche date

            const api = "http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/RechercheDateActivite";
            actualisationTableau(api);
        }
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
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">RESTAURE</th>
                                <th scope="col">SCANNES	</th>
                                <th scope="col">VECTORISES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className='soustitre-tableau'>Plan individuel</th>
                                <td> {a1}</td>
                                <td> {b1}</td>
                                <td> {c1}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Plan cadastrale</th>
                                <td> {a2}</td>
                                <td> {b2}</td>
                                <td> {c2}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>PVCB / Jorm</th>
                                <td> {a3}</td>
                                <td> {b3}</td>
                                <td> {c3}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Plan de reperage</th>
                                <td> {a4}</td>
                                <td> {b4}</td>
                                <td> {c4}</td>
                            </tr>
                            <tr>
                                <th className='total-tableau'>Total</th>
                                <td> {a5}</td>
                                <td> {b5}</td>
                                <td> {c5}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

        </>)
}

export default TableDematerialisation