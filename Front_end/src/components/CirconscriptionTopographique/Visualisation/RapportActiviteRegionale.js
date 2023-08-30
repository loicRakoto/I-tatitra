import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import TableRapportActiviteRegionale from '../../Tableaux/TableRapportActiviteRegionale';



function RapportActiviteRegionale({ nomCirconscription, nomRegion }) {

    const [isLoading, setIsLoading] = useState(true);

    const [etatTableaux, setetatTableaux] = useState(0);


    //U T I L I S A T E U R
    const token = localStorage.getItem('token');

    // Définissez l'en-tête Authorization avec le jeton
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [userCirconscriptionId, setuserCirconscriptionId] = useState(0);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user', config)
            .then(response => {
                setuserCirconscriptionId(response.data.circonscription_id);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    const [date, setdate] = useState([]);
    const [envoiDate, setenvoiDate] = useState('');

    const majTableau = (event) => {
        var date = event.target.value;
        setenvoiDate(date);
        setetatTableaux(1);
    }

    const paramm = useMemo(() => ({
        params: {
            utilisateurCirconscriptionId: userCirconscriptionId
        }
    }), [userCirconscriptionId]);

    useEffect(() => {
        if (userCirconscriptionId !== 0) {
            axios.get('http://127.0.0.1:8000/api/ListeDateActiviteRegionale/region', paramm).then(Response => {
                setdate(Response.data);

            }).catch(error => {
                // console.error(error);
            })
        }

    }, [paramm]);

    return (
        <>

            <div>
                <div className="loading-animation" style={{ display: isLoading ? 'flex' : 'none' }}>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

                {!isLoading && (

                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col" >
                            <div className='row'>
                                <div className='col-7'></div>
                                <div className="col input-group input-group-sm ">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Date</label>
                                    <select name='district'
                                        className="form-select"
                                        id="inputGroupSelect03"
                                        onChange={majTableau}
                                    >
                                        {date.map(item => (
                                            <option key={`${item.mois}/${item.annee}`} value={`${item.mois}/${item.annee}`}>
                                                {item.mois} {item.annee}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="row">
                    <TableRapportActiviteRegionale nomCirconscription={nomCirconscription} nomRegion={nomRegion} isLoading={isLoading} setIsLoading={setIsLoading} envoiDate={envoiDate} setetatTableaux={setetatTableaux} etatTableaux={etatTableaux} CirconscriptionId={userCirconscriptionId} />
                </div>
            </div >
        </>
    )
}

export default RapportActiviteRegionale