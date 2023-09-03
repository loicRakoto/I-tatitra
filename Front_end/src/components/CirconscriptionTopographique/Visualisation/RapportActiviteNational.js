import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import TableRapportActiviteNational from '../../Tableaux/TableRapportActiviteNational';



function RapportActiviteNational() {

    const [isLoading, setIsLoading] = useState(true);
    const [etatTableaux, setetatTableaux] = useState(0);


    const [date, setdate] = useState([]);
    const [envoiDate, setenvoiDate] = useState('');
    const [envoiRegion, setenvoiRegion] = useState('')







    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ListeDateActiviteNationale/nationale').then(Response => {
            setdate(Response.data);
            setenvoiDate(`${Response.data[0].mois}/${Response.data[0].annee}`);

        }).catch(error => {
            // console.error(error);
        })
    }, []);


    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/circonscriptionRegion').then(Response => {
            setPosts(Response.data);
            setenvoiRegion(Response.data[0].NomRegion);
        }).catch(error => {
            console.error(error);
        })
    }, []);


    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        if (name === 'select1') {
            setenvoiRegion(value);
        } else if (name === 'select2') {
            setenvoiDate(value);
        }

        setetatTableaux(1);
    };

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
                                <div className='col'></div>
                                <div className="col input-group input-group-sm ">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Region</label>
                                    <select

                                        name='select1' className="form-select" id="inputGroupSelect02" onChange={handleSelectChange} >
                                        {posts.map(item => (
                                            <option key={item.NomRegion} value={item.NomRegion}>
                                                {item.NomRegion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col input-group input-group-sm ">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Date</label>
                                    <select

                                        name='select2'
                                        className="form-select"
                                        id="inputGroupSelect03"
                                        onChange={handleSelectChange}
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
                    <TableRapportActiviteNational envoiRegion={envoiRegion} isLoading={isLoading} setIsLoading={setIsLoading} envoiDate={envoiDate} setetatTableaux={setetatTableaux} etatTableaux={etatTableaux} />
                </div>
            </div >
        </>
    )
}

export default RapportActiviteNational