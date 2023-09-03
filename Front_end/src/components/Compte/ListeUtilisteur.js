import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

function ListeUtilisteur() {

    const [isLoading, setIsLoading] = useState(true);

    const [listDemande, setlistDemande] = useState([])

    useEffect(() => {
        fetchListDemande(); // Charger la liste des demandes initiale
    }, []);

    const fetchListDemande = () => {
        axios.get('http://127.0.0.1:8000/api/Utilisateur/showAllMembres')
            .then(response => {
                setlistDemande(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const ajoutMembre = async (id) => {
        const formData = {
            idMembre: id
        };
        try {
            await axios.post("http://127.0.0.1:8000/api/Utilisateur/acceptMembre", formData);
            fetchListDemande();

        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête:', error);
        }

    }

    const rejetMembre = async (id) => {
        const formData = {
            idMembre: id
        };
        try {
            await axios.post("http://127.0.0.1:8000/api/Utilisateur/rejectMembre", formData);
            fetchListDemande();

        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête:', error);
        }

    }


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
                        Liste des demandes en attente ({Array.isArray(listDemande) ? listDemande.length : 0})
                    </div>

                    <div className='card-body'>

                        <table className="table table-hover tableDemande">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Prénom</th>
                                    <th scope="col">Télephone</th>
                                    <th scope="col">CIN</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Fonction</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>


                                {listDemande.map(item => (

                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td >{item.Nom}</td>
                                        <td>{item.Prenom}</td>
                                        <td>{item.Telephone}</td>
                                        <td>{item.CIN}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            {
                                                item.fonction === 0 ? "Administrateur" :
                                                    item.fonction === 1 ? "Directeur des Services Topographiques" :
                                                        item.fonction === 2 ? "Conservateur Nationale" :
                                                            item.fonction === 3 ? "Chef des Services Régionaux Topographiques" :
                                                                "Chef des Circonscriptions Topographiques"
                                            }
                                        </td>

                                        <td className='d-flex justify-content-around'>
                                            <button onClick={() => ajoutMembre(item.id)} className='btn btn-sm btn-success'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => rejetMembre(item.id)} className='btn btn-sm btn-danger'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-person-x-fill" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>
            )}
        </>

    )
}

export default ListeUtilisteur