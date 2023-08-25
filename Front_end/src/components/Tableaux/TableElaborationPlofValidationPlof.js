import React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

function TableElaborationPlofValidationPlof({ isLoading, setIsLoading, CirconscriptionId, etatTableaux, setetatTableaux, envoiDate }) {



    //STATE DU TABLEAU
    const [a1, seta1] = useState(0);
    const [a2, seta2] = useState(0);
    const [a3, seta3] = useState(0);

    const [b1, setb1] = useState(0);
    const [b2, setb2] = useState(0);
    const [b3, setb3] = useState(0);


    const formData = useMemo(() => ({
        params: {
            activiteId: 9,
            utilisateurCirconscriptionId: CirconscriptionId,
            date: envoiDate
        }
    }), [CirconscriptionId, envoiDate]);


    const actualisationTableau = useCallback(async (api) => {

        try {

            const response = await axios.get(api, formData);

            var enCoursTraitement = response.data.last.en_cours_traitement;
            var valide = response.data.last.valide;


            //Assignation
            const EnCoursTraitement = enCoursTraitement.split('/');
            const Valide = valide.split('/');

            seta1(EnCoursTraitement[0]);
            seta2(EnCoursTraitement[1]);


            setb1(Valide[0]);
            setb2(Valide[1]);



            var TotalEnCoursTraitement = parseInt(EnCoursTraitement[0], 10) + parseInt(EnCoursTraitement[1], 10);
            var TotalValide = parseInt(Valide[0], 10) + parseInt(Valide[1], 10);


            seta3(TotalEnCoursTraitement);
            setb3(TotalValide);

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
                                <th scope="col">EN COURS DE TRAITEMENT</th>
                                <th scope="col">VALIDE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className='soustitre-tableau'>Nombre de plof elabore</th>
                                <td> {a1}</td>
                                <td> {b1}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Nombre de plof exploitable</th>
                                <td> {a2}</td>
                                <td> {b2}</td>
                            </tr>
                            <tr>
                                <th className='total-tableau'>Total</th>
                                <td> {a3}</td>
                                <td> {b3}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

        </>)
}

export default TableElaborationPlofValidationPlof