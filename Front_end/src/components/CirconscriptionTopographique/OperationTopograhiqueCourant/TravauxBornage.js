import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function TravauxBornage({ utilisateur }) {

    const initialSituations = 0; // Valeur initiale pour les situations
    const initialImmatriculation = 0;
    const initialMorcellement = 0;
    const initialTransformation = 0;
    const initialChangementNom = 0;

    const [situations, setSituations] = useState(initialSituations);
    const [immatriculation, setImmatriculation] = useState(initialImmatriculation);
    const [morcellement, setMorcellement] = useState(initialMorcellement);
    const [transformation, setTransformation] = useState(initialTransformation);
    const [changementNom, setChangementNom] = useState(initialChangementNom);

    const formData = {
        situations: situations,
        immatriculation: immatriculation,
        morcellement: morcellement,
        transformation: transformation,
        changementNom: changementNom,
        utilisateurId: utilisateur.id,
        utilisateurFonction: utilisateur.fonction,
        utilisateurCirconscriptionId: utilisateur.circonscription_id
    };



    const handleSubmitTravauxBornage = async (e) => {
        console.log(formData);
        e.preventDefault();

        console.log(formData);
        const api = "http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/OperationTopoCourant/Add/TravauxBornage";
        try {
            const response = await axios.post(api, formData);
            console.log('Réponse de l\'API:', response.data);

            // Réinitialiser les valeurs des états après la soumission
            setSituations(initialSituations);
            setImmatriculation(initialImmatriculation);
            setMorcellement(initialMorcellement);
            setTransformation(initialTransformation);
            setChangementNom(initialChangementNom);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête:', error);
        }

    };


    return (
        <div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary btn-sm" data-bs-toggle="modal"
                        data-bs-target="#travauxBornage">Gerer les activités</button>
                </div>
                <div className="col">

                </div>

            </div>
            <div className="row"></div>


            {/* MODAL  =============================================================*/}

            <div className="modal fade" id="travauxBornage" tabIndex="-1" aria-labelledby="travauxBornageLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="travauxBornageLabel">Travaux de bornage</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmitTravauxBornage}>
                                <div className="input-group input-group-sm mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Situations</label>
                                    <select className="form-select" id="inputGroupSelect01" value={situations} onChange={(e) => setSituations(e.target.value)}>
                                        <option value="0" defaultValue>Reçu pendant le mois</option>
                                        <option value="1">Executé pendant le mois</option>
                                        <option value="2">En cours de traitement</option>
                                        <option value="3">Payés non executés</option>
                                        <option value="4">Remis pendant le mois</option>
                                    </select>
                                </div>
                                <div className="card mt-4">
                                    <div className="card-header">A propos</div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <div className="input-group input-group-sm mb-3">
                                                    <span className="input-group-text" id="inputGroup-sizing-sm">Immatriculation</span>
                                                    <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={immatriculation} onChange={(e) => setImmatriculation(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="input-group input-group-sm mb-3">
                                                    <span className="input-group-text" id="inputGroup-sizing-sm">Morcellement / Fusion de morcellement</span>
                                                    <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={morcellement} onChange={(e) => setMorcellement(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="input-group input-group-sm mb-3">
                                                    <span className="input-group-text" id="inputGroup-sizing-sm">Transformation parcelle cadastrale en titre foncier</span>
                                                    <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={transformation} onChange={(e) => setTransformation(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="input-group input-group-sm mb-3">
                                                    <span className="input-group-text" id="inputGroup-sizing-sm">Changement de nom / titre</span>
                                                    <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={changementNom} onChange={(e) => setChangementNom(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" style={{ width: '100%' }} className="btn btn-success" data-bs-dismiss="modal">Enregistrer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TravauxBornage