import React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';

function TableFondsPlanDeteriore({ isLoading, setIsLoading, CirconscriptionId, etatTableaux, setetatTableaux, envoiDate }) {

    // const [dataLoaded, setDataLoaded] = useState(false);


    //STATE DU TABLEAU
    const [a1, seta1] = useState(0);
    const [a2, seta2] = useState(0);
    const [a3, seta3] = useState(0);


    const [b1, setb1] = useState(0);
    const [b2, setb2] = useState(0);
    const [b3, setb3] = useState(0);


    const [c1, setc1] = useState(0);
    const [c2, setc2] = useState(0);
    const [c3, setc3] = useState(0);


    const [d1, setd1] = useState(0);
    const [d2, setd2] = useState(0);
    const [d3, setd3] = useState(0);


    const formData = useMemo(() => ({
        params: {
            activiteId: 10,
            utilisateurCirconscriptionId: CirconscriptionId,
            date: envoiDate
        }
    }), [CirconscriptionId, envoiDate]);


    const actualisationTableau = useCallback(async (api) => {


        try {

            const response = await axios.get(api, formData);

            var bourrage = response.data.last.bourrage;
            var decalage = response.data.last.decalage;
            var autres = response.data.last.autres;
            var demandeSpeciales = response.data.last.demande_speciale;


            //Assignation
            const Bourrage = bourrage.split('/');
            const Decalage = decalage.split('/');
            const Autres = autres.split('/');
            const DemandeSpeciales = demandeSpeciales.split('/');

            seta1(Bourrage[0]);
            seta2(Bourrage[1]);


            setb1(Decalage[0]);
            setb2(Decalage[1]);


            setc1(Autres[0]);
            setc2(Autres[1]);


            setd1(DemandeSpeciales[0]);
            setd2(DemandeSpeciales[1]);


            var TotalBourrage = parseInt(Bourrage[0], 10) + parseInt(Bourrage[1], 10);
            var TotalDecalage = parseInt(Decalage[0], 10) + parseInt(Decalage[1], 10);
            var TotalAutres = parseInt(Autres[0], 10) + parseInt(Autres[1], 10);
            var TotalDemandeSpeciales = parseInt(DemandeSpeciales[0], 10) + parseInt(DemandeSpeciales[1], 10);

            seta3(TotalBourrage);
            setb3(TotalDecalage);
            setc3(TotalAutres);
            setd3(TotalDemandeSpeciales);

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
                                <th scope="col">BOURRAGE</th>
                                <th scope="col">DECALAGE</th>
                                <th scope="col">AUTRES</th>
                                <th scope="col">DEMANDES SPECIALES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className='soustitre-tableau'>Numero de série du fond plan A3</th>
                                <td> {a1}</td>
                                <td> {b1}</td>
                                <td> {c1}</td>
                                <td> {d1}</td>
                            </tr>
                            <tr>
                                <th className='soustitre-tableau'>Numero de série du fond plan A4</th>
                                <td> {a2}</td>
                                <td> {b2}</td>
                                <td> {c2}</td>
                                <td> {d2}</td>
                            </tr>
                            <tr>
                                <th className='total-tableau'>Total</th>
                                <td> {a3}</td>
                                <td> {b3}</td>
                                <td> {c3}</td>
                                <td> {d3}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

        </>)
}

export default TableFondsPlanDeteriore