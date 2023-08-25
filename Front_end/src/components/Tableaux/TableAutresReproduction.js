import React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

function TableAutresReproduction({ isLoading, setIsLoading, CirconscriptionId, etatTableaux, setetatTableaux, envoiDate }) {



    //STATE DU TABLEAU
    const [a1, seta1] = useState(0);
    const [a2, seta2] = useState(0);
    const [a3, seta3] = useState(0);
    const [a4, seta4] = useState(0);
    const [a5, seta5] = useState(0);
    const [a6, seta6] = useState(0);


    const [b1, setb1] = useState(0);
    const [b2, setb2] = useState(0);
    const [b3, setb3] = useState(0);
    const [b4, setb4] = useState(0);
    const [b5, setb5] = useState(0);
    const [b6, setb6] = useState(0);


    const [c1, setc1] = useState(0);
    const [c2, setc2] = useState(0);
    const [c3, setc3] = useState(0);
    const [c4, setc4] = useState(0);
    const [c5, setc5] = useState(0);
    const [c6, setc6] = useState(0);



    const formData = useMemo(() => ({
        params: {
            activiteId: 6,
            utilisateurCirconscriptionId: CirconscriptionId,
            date: envoiDate
        }
    }), [CirconscriptionId, envoiDate]);


    const actualisationTableau = useCallback(async (api) => {


        try {

            const response = await axios.get(api, formData);

            var recuMois = response.data.last.recu_mois;
            var executeMois = response.data.last.execute_mois;
            var remisMois = response.data.last.remis_mois;

            //Assignation
            const RecuMois = recuMois.split('/');
            const ExecuteMois = executeMois.split('/');
            const RemisMois = remisMois.split('/');

            seta1(RecuMois[0]);
            seta2(RecuMois[1]);
            seta3(RecuMois[2]);
            seta4(RecuMois[3]);
            seta5(RecuMois[4]);

            setb1(ExecuteMois[0]);
            setb2(ExecuteMois[1]);
            setb3(ExecuteMois[2]);
            setb4(ExecuteMois[3]);
            setb5(ExecuteMois[4]);


            setc1(RemisMois[0]);
            setc2(RemisMois[1]);
            setc3(RemisMois[2]);
            setc4(RemisMois[3]);
            setc5(RemisMois[4]);



            var TotalRecuMois = parseInt(RecuMois[0], 10) + parseInt(RecuMois[1], 10) + parseInt(RecuMois[2], 10) + parseInt(RecuMois[3], 10) + parseInt(RecuMois[4], 10);
            var TotalExecuteMois = parseInt(ExecuteMois[0], 10) + parseInt(ExecuteMois[1], 10) + parseInt(ExecuteMois[2], 10) + parseInt(ExecuteMois[3], 10) + parseInt(ExecuteMois[4], 10);
            var TotalRemisMois = parseInt(RemisMois[0], 10) + parseInt(RemisMois[1], 10) + parseInt(RemisMois[2], 10) + parseInt(RemisMois[3], 10) + parseInt(RemisMois[4], 10);

            seta6(TotalRecuMois);
            setb6(TotalExecuteMois);
            setc6(TotalRemisMois);

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
                                <th scope="col">RECUS PENDANT LE MOIS</th>
                                <th scope="col">EXECUTE PENDANT LE MOIS	</th>
                                <th scope="col">REMIS PENDANT LE MOIS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className='soustitre-tableau'>Coordonnées laborde</th>
                                <td>{a1}</td>
                                <td>{b1}</td>
                                <td>{c1}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Origine</th>
                                <td>{a2}</td>
                                <td>{b2}</td>
                                <td>{c2}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Plan / Etat parcellaire</th>
                                <td>{a3}</td>
                                <td>{b3}</td>
                                <td>{c3}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Copie PV</th>
                                <td>{a4}</td>
                                <td>{b4}</td>
                                <td>{c4}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Certification conforme</th>
                                <td>{a5}</td>
                                <td>{b5}</td>
                                <td>{c5}</td>
                            </tr>
                            <tr>
                                <th className='total-tableau'>Total</th>
                                <td>{a6}</td>
                                <td>{b6}</td>
                                <td>{c6}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            )}

        </>)
}

export default TableAutresReproduction