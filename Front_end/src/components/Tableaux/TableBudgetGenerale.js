import React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

function TableBudgetGenerale({ isLoading, setIsLoading, CirconscriptionId, etatTableaux, setetatTableaux, envoiDate }) {

    // const [dataLoaded, setDataLoaded] = useState(false);


    //STATE DU TABLEAU
    const [a1, seta1] = useState(0);
    const [a2, seta2] = useState(0);
    const [a3, seta3] = useState(0);
    const [a4, seta4] = useState(0);
    const [a5, seta5] = useState(0);
    const [a6, seta6] = useState(0);
    const [a7, seta7] = useState(0);



    const formData = useMemo(() => ({
        params: {
            activiteId: 11,
            utilisateurCirconscriptionId: CirconscriptionId,
            date: envoiDate
        }
    }), [CirconscriptionId, envoiDate]);


    const actualisationTableau = useCallback(async (api) => {


        try {

            const response = await axios.get(api, formData);

            var payes = response.data.last.payes;


            //Assignation
            const Payes = payes.split('/');

            seta1(Payes[0]);
            seta2(Payes[1]);
            seta3(Payes[2]);
            seta4(Payes[3]);
            seta5(Payes[4]);
            seta6(Payes[5]);

            var TotalPayes = parseInt(Payes[0], 10) + parseInt(Payes[1], 10) + parseInt(Payes[2], 10) + parseInt(Payes[3], 10) + parseInt(Payes[4], 10) + parseInt(Payes[5], 10);

            seta7(TotalPayes);

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
                                <th scope="col">PAYES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className='soustitre-tableau'>Travaux de descente sur terrain</th>
                                <td> {a1}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Travaux exécutés au bureau</th>
                                <td>{a2}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Reproduction document A4</th>
                                <td>{a3}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Reproduction document A3</th>
                                <td>{a4}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Reproduction plan guichet automatique</th>
                                <td>{a5}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Autres reproductions</th>
                                <td> {a6}</td>
                            </tr>
                            <tr>
                                <th className='total-tableau'>Total</th>
                                <td> {a7}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

        </>)
}

export default TableBudgetGenerale