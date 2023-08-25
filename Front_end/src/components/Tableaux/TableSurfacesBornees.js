import React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

function TableSurfacesBornees({ isLoading, setIsLoading, CirconscriptionId, etatTableaux, setetatTableaux, envoiDate }) {

    // const [dataLoaded, setDataLoaded] = useState(false);



    //STATE DU TABLEAU
    const [a1, seta1] = useState(0);
    const [a2, seta2] = useState(0);
    const [a3, seta3] = useState(0);


    const formData = useMemo(() => ({
        params: {
            activiteId: 7,
            utilisateurCirconscriptionId: CirconscriptionId,
            date: envoiDate
        }
    }), [CirconscriptionId, envoiDate]);


    const actualisationTableau = useCallback(async (api) => {


        try {

            const response = await axios.get(api, formData);

            var bornees = response.data.last.borne;


            //Assignation
            const Bornees = bornees.split('/');

            seta1(Bornees[0]);
            seta2(Bornees[1]);


            var TotalBornee = parseInt(Bornees[0], 10) + parseInt(Bornees[1], 10);

            seta3(TotalBornee);
            setetatTableaux(1000);

        } catch (error) {
            // console.error('Erreur lors de l\'envoi de la requête:', error);
        }


        // setetatTableaux(1000);
    }, [setetatTableaux, formData]);


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
                                <th scope="col">Bornées</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className='soustitre-tableau'>Bornage individuel</th>
                                <td> {a1}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Bornage collectif</th>
                                <td> {a2}</td>
                            </tr>
                            <tr>
                                <th className='total-tableau'>Total</th>
                                <td> {a3}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            )}

        </>)
}

export default TableSurfacesBornees