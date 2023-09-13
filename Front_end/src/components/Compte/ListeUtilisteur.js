import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';


function ListeUtilisteur() {

    const [isLoading, setIsLoading] = useState(true);

    const [listUser, setlistUser] = useState([]);

    const [search, setsearch] = useState('');

    const [filter, setfilter] = useState([]);

    const [infoUser, setinfoUser] = useState('');

    useEffect(() => {
        fetchListUser(); // Charger la liste des demandes initiale
    }, []);

    useEffect(() => {
        const result = listUser.filter((item) => {

            const user_idString = item.user_id.toString();
            const nomMatch = item && item.Nom && item.Nom.toLowerCase().includes(search.toLowerCase());
            const prenomMatch = item && item.Prenom && item.Prenom.toLowerCase().includes(search.toLowerCase());
            const TelephoneMatch = item && item.Telephone && item.Telephone.toLowerCase().includes(search.toLowerCase());
            const CINMatch = item && item.CIN && item.CIN.toLowerCase().includes(search.toLowerCase());
            const EmailMatch = item && item.Email && item.Email.toLowerCase().includes(search.toLowerCase());
            const user_idMatch = user_idString.toLowerCase().includes(search.toLowerCase());


            return user_idMatch || nomMatch || prenomMatch || TelephoneMatch || CINMatch || EmailMatch;
        });

        setfilter(result);
    }, [search, listUser]);



    const fetchListUser = () => {
        axios.get('http://127.0.0.1:8000/api/Utilisateur/showAllMembres')
            .then(response => {
                setlistUser(response.data);
                setIsLoading(false);
                setfilter(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    };

    const informationUser = async (id) => {
        const formData = {
            idMembre: id
        };
        try {
            console.log(formData);
            const reponse = await axios.post("http://127.0.0.1:8000/api/Utilisateur/findMembre", formData);
            setinfoUser(reponse.data.Reponse);
            fetchListUser();

        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête:', error);
        }

    }

    const blockUser = async (id) => {

        const formData = {
            idMembre: id
        };
        try {
            await axios.post("http://127.0.0.1:8000/api/Utilisateur/blockMembre", formData);
            fetchListUser();

        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête:', error);
        }

    }

    const allowUser = async (id) => {

        const formData = {
            idMembre: id
        };
        try {
            await axios.post("http://127.0.0.1:8000/api/Utilisateur/allowMembre", formData);
            fetchListUser();

        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête:', error);
        }

    }



    const columns = [
        {
            name: 'Status',
            selector: row => row.status,
            cell: (row) => (<div style={{ padding: "10px 0px" }}>
                {
                    row.status === 1 ? (<div className='accepter'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="green" className="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                        </svg>
                    </div>) :
                        (<div className='bloquer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#dd1a45" className="bi bi-slash-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708l6-6z" />
                            </svg>
                        </div>)
                }
            </div>)
        },
        // {
        //     name: 'ID',
        //     selector: row => row.user_id,
        // },
        {
            name: 'Nom',
            selector: row => row.Nom,
        },
        {
            name: 'Prénom',
            selector: row => row.Prenom,
        },
        {
            name: 'Télephone',
            selector: row => row.Telephone,
        },
        {
            name: 'CIN',
            selector: row => row.CIN,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Fonction',
            cell: (row) => (<div style={{ padding: "10px 0px" }}>
                {
                    row.fonction === 0 ? "Administrateur" :
                        row.fonction === 1 ? "Directeur des Services" :
                            row.fonction === 2 ? "Conservateur Nationale" :
                                row.fonction === 3 ? "Chef des Services Régionaux" :
                                    "Chef Circonscriptions"
                }
            </div>)
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (<div className='d-flex justify-content-around'>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => informationUser(row.user_id)} className='btn btn-sm btn-primary boutonListeUser'>

                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                </button>
                <button onClick={() => blockUser(row.user_id)} className='btn btn-sm btn-danger boutonListeUser'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
                <button onClick={() => allowUser(row.user_id)} className='btn btn-sm btn-success boutonListeUser'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                    </svg>
                </button>
            </div>)
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height

            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                backgroundColor: '#2b8a9a',
                color: 'white',
                fontWeight: "bolder",

            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };


    return (
        <>
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
                <div className='card'>
                    <div className='card-header'>
                        Liste des utilisateurs inscrits ({Array.isArray(listUser) ? listUser.length : 0})
                    </div>

                    <div className='card-body'>

                        <DataTable
                            columns={columns}
                            data={filter}
                            pagination
                            highlightOnHover
                            fixedHeader
                            subHeader
                            subHeaderComponent={
                                <input value={search} onChange={(e) => setsearch(e.target.value)} type='text' className='w-25 form-control form-control-sm' placeholder='Rechercher...'></input>
                            }
                            subHeaderAlign='right'
                            customStyles={customStyles}
                        />
                    </div>

                </div>
            )}

            {/* MODAL */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Information de l'utilisateur</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="">
                                <ul className="list-group mb-3 list-group-flush">
                                    <li className="list-group-item px-0 d-flex justify-content-between">
                                        <span>N° Utilisateur</span>
                                        <strong style={{ fontWeight: 'lighter' }}>{infoUser.user_id}</strong>
                                    </li>
                                    <li className="list-group-item px-0 d-flex justify-content-between">
                                        <span>Nom</span>
                                        <strong style={{ fontWeight: 'lighter' }}>{infoUser.Nom}</strong>
                                    </li>
                                    <li className="list-group-item px-0 d-flex justify-content-between">
                                        <span>Prenom</span>
                                        <strong style={{ fontWeight: 'lighter' }}>{infoUser.Prenom}</strong>
                                    </li>
                                    <li className="list-group-item px-0 d-flex justify-content-between">
                                        <span>Téléphone</span>
                                        <strong style={{ fontWeight: 'lighter' }}>{infoUser.Telephone}</strong>
                                    </li>
                                    <li className="list-group-item px-0 d-flex justify-content-between">
                                        <span>CIN</span>
                                        <strong style={{ fontWeight: 'lighter' }}>{infoUser.CIN}</strong>
                                    </li>
                                    <li className="list-group-item px-0 d-flex justify-content-between">
                                        <span>Email</span>
                                        <strong style={{ fontWeight: 'lighter' }}>{infoUser.email}</strong>
                                    </li>
                                    <li className="list-group-item px-0 d-flex justify-content-between">
                                        <span>Fonction</span>
                                        <strong style={{ fontWeight: 'lighter' }}>
                                            {
                                                infoUser.fonction === 0 ? "Administrateur" :
                                                    infoUser.fonction === 1 ? "Directeur des Services" :
                                                        infoUser.fonction === 2 ? "Conservateur Nationale" :
                                                            infoUser.fonction === 3 ? "Chef des Services Régionaux" :
                                                                "Chef Circonscriptions"
                                            }
                                        </strong>
                                    </li>
                                    {infoUser.fonction === 3 || infoUser.fonction === 4 ? (
                                        <li className="list-group-item px-0 d-flex justify-content-between">
                                            <span>Région</span>
                                            <strong style={{ fontWeight: 'lighter' }}>
                                                {
                                                    infoUser.NomRegion
                                                }
                                            </strong>
                                        </li>
                                    ) : null}
                                    {infoUser.fonction === 4 ? (
                                        <li className="list-group-item px-0 d-flex justify-content-between">
                                            <span>Circonscription</span>
                                            <strong style={{ fontWeight: 'lighter' }}>
                                                {infoUser.NomCirconscription}
                                            </strong>
                                        </li>
                                    ) : null}

                                </ul>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <p className="card-text"><small className="text-muted mb-2">Dernier mise à jour le {infoUser.updated_at}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ListeUtilisteur