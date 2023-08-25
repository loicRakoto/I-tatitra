import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import TableAutresReproduction from '../../Tableaux/TableAutresReproduction';



function AutresReproduction() {

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

    const [userId, setuserId] = useState(0);
    const [userFonction, setuserFonction] = useState(0);
    const [userCirconscriptionId, setuserCirconscriptionId] = useState(0);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user', config)
            .then(response => {
                setuserId(response.data.id);
                setuserFonction(response.data.fonction);
                setuserCirconscriptionId(response.data.circonscription_id);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const utilisateurId = userId;
    const utilisateurFonction = userFonction;
    const utilisateurCirconscriptionId = userCirconscriptionId;


    const initialSituations = 0; // Valeur initiale pour les situations

    const initialCoordonneLaborde = 0;
    const initialOrigine = 0;
    const initialPlanEtatParcellaire = 0;
    const initialCopiePV = 0;
    const initialCertificationConforme = 0;


    const [situations, setSituations] = useState(initialSituations);

    const [CoordonneLaborde, setCoordonneLaborde] = useState(initialCoordonneLaborde);
    const [Origine, setOrigine] = useState(initialOrigine);
    const [PlanEtatParcellaire, setPlanEtatParcellaire] = useState(initialPlanEtatParcellaire);
    const [CopiePV, setCopiePV] = useState(initialCopiePV);
    const [CertificationConforme, setCertificationConforme] = useState(initialCertificationConforme);

    const formData = {
        situations: situations,

        coordonneLaborde: CoordonneLaborde,
        origine: Origine,
        planEtatParcellaire: PlanEtatParcellaire,
        copiePV: CopiePV,
        certificationConforme: CertificationConforme,


        utilisateurId: utilisateurId,
        utilisateurFonction: utilisateurFonction,
        utilisateurCirconscriptionId: utilisateurCirconscriptionId
    };



    const handleSubmitTravauxBornage = async (e) => {
        e.preventDefault();


        const api = "http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/OperationTopoCourant/Add/AutresReproduction";
        try {
            await axios.post(api, formData);

            // Réinitialiser les valeurs des états après la soumission
            setCoordonneLaborde(initialCoordonneLaborde);
            setOrigine(initialOrigine);
            setPlanEtatParcellaire(initialPlanEtatParcellaire);
            setCopiePV(initialCopiePV);
            setCertificationConforme(initialCertificationConforme);


            setetatTableaux(0);


        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête:', error);
        }


    };

    const [date, setdate] = useState([]);
    const [envoiDate, setenvoiDate] = useState('');

    const [defaultSelectValue, setdefaultSelectValue] = useState("");
    const [selectedValue, setselectedValue] = useState("");

    const majTableau = (event) => {
        var date = event.target.value;
        setenvoiDate(date);
        setetatTableaux(1);
        setselectedValue(date);
    }



    const paramm = useMemo(() => ({
        params: {
            activiteId: 6,
            utilisateurCirconscriptionId: userCirconscriptionId
        }
    }), [userCirconscriptionId]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/RecuperationDateActivite', paramm).then(Response => {
            setdate(Response.data);
            setdefaultSelectValue(`${Response.data[0].mois}/${Response.data[0].annee}`)

        }).catch(error => {
            // console.error(error);
        })
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
                            {
                                selectedValue === defaultSelectValue || selectedValue === "" ? (
                                    <button className="btn btn-primary btn-sm butonModifAdd" data-bs-toggle="modal"
                                        data-bs-target="#travauxBornage">Nouvelle activitée
                                    </button>
                                ) : null
                            }
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
                    <TableAutresReproduction isLoading={isLoading} setIsLoading={setIsLoading} envoiDate={envoiDate} setetatTableaux={setetatTableaux} etatTableaux={etatTableaux} CirconscriptionId={userCirconscriptionId} />
                </div>


                {/* MODAL  =============================================================*/}

                <div className="modal fade" id="travauxBornage" tabIndex="-1" aria-labelledby="travauxBornageLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="travauxBornageLabel">Autres reproduction</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmitTravauxBornage}>
                                    <div className="input-group input-group-sm mb-3">
                                        <label className="input-group-text" htmlFor="inputGroupSelect01">Situations</label>
                                        <select className="form-select" id="inputGroupSelect01" value={situations} onChange={(e) => setSituations(e.target.value)}>
                                            <option value="0" defaultValue>Reçu pendant le mois</option>
                                            <option value="1">Executé pendant le mois</option>
                                            <option value="2">Remis pendant le mois</option>
                                        </select>
                                    </div>
                                    <div className="card mt-4">
                                        <div className="card-header">A propos</div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span className="input-group-text" id="inputGroup-sizing-sm">Coordonnées Laborde</span>
                                                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={CoordonneLaborde} onChange={(e) => setCoordonneLaborde(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span className="input-group-text" id="inputGroup-sizing-sm">Origine</span>
                                                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={Origine} onChange={(e) => setOrigine(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span className="input-group-text" id="inputGroup-sizing-sm">Plan / Etat parcellaire</span>
                                                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={PlanEtatParcellaire} onChange={(e) => setPlanEtatParcellaire(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span className="input-group-text" id="inputGroup-sizing-sm">Copie PV</span>
                                                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={CopiePV} onChange={(e) => setCopiePV(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span className="input-group-text" id="inputGroup-sizing-sm">Certification conforme</span>
                                                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={CertificationConforme} onChange={(e) => setCertificationConforme(e.target.value)} />
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
        </>
    )
}

export default AutresReproduction