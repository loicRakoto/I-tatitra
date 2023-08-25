import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import TableReproductionPlan from '../../Tableaux/TableReproductionPlan';



function ReproductionPlan() {

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

    const initialPlanIndividuel = 0;
    const initialPlanIndividuelDistributeur = 0;
    const initialPlanCadastral = 0;


    const [situations, setSituations] = useState(initialSituations);

    const [PlanIndividuel, setPlanIndividuel] = useState(initialPlanIndividuel);
    const [PlanIndividuelDistributeur, setPlanIndividuelDistributeur] = useState(initialPlanIndividuelDistributeur);
    const [PlanCadastral, setPlanCadastral] = useState(initialPlanCadastral);

    const formData = {
        situations: situations,

        planIndividuel: PlanIndividuel,
        planIndividuelDistributeur: PlanIndividuelDistributeur,
        planCadastral: PlanCadastral,


        utilisateurId: utilisateurId,
        utilisateurFonction: utilisateurFonction,
        utilisateurCirconscriptionId: utilisateurCirconscriptionId
    };



    const handleSubmitTravauxBornage = async (e) => {
        e.preventDefault();


        const api = "http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/OperationTopoCourant/Add/ReproductionPlan";
        try {
            await axios.post(api, formData);


            // Réinitialiser les valeurs des états après la soumission
            setPlanIndividuel(initialPlanIndividuel);
            setPlanIndividuelDistributeur(initialPlanIndividuelDistributeur);
            setPlanCadastral(initialPlanCadastral);

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
            activiteId: 5,
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
                    <TableReproductionPlan isLoading={isLoading} setIsLoading={setIsLoading} envoiDate={envoiDate} setetatTableaux={setetatTableaux} etatTableaux={etatTableaux} CirconscriptionId={userCirconscriptionId} />
                </div>


                {/* MODAL  =============================================================*/}

                <div className="modal fade" id="travauxBornage" tabIndex="-1" aria-labelledby="travauxBornageLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="travauxBornageLabel">Reproduction de plan</h5>
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
                                                        <span className="input-group-text" id="inputGroup-sizing-sm">Plan individuel</span>
                                                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={PlanIndividuel} onChange={(e) => setPlanIndividuel(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span className="input-group-text" id="inputGroup-sizing-sm">Plan individuel distributeur</span>
                                                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={PlanIndividuelDistributeur} onChange={(e) => setPlanIndividuelDistributeur(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="input-group input-group-sm mb-3">
                                                        <span className="input-group-text" id="inputGroup-sizing-sm">Plan cadastral</span>
                                                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={PlanCadastral} onChange={(e) => setPlanCadastral(e.target.value)} />
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

export default ReproductionPlan