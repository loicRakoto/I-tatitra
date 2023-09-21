
import VerificationAuth from '../components/VerificationAuth'
import NavigationChefCircTopo from '../layout/Dst/NavigationChefCircTopo';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import RapportActivite from '../components/CirconscriptionTopographique/Visualisation/RapportActivite';

import TravauxBornage from '../components/CirconscriptionTopographique/OperationTopograhiqueCourant/TravauxBornage';
import TravauxPlanRegulier from '../components/CirconscriptionTopographique/OperationTopograhiqueCourant/TravauxPlanRegulier';
import AutresTravaux from '../components/CirconscriptionTopographique/OperationTopograhiqueCourant/AutresTravaux';
import TravauxReperage from '../components/CirconscriptionTopographique/OperationTopograhiqueCourant/TravauxReperage';
import ReproductionPlan from '../components/CirconscriptionTopographique/OperationTopograhiqueCourant/ReproductionPlan';
import AutresReproduction from '../components/CirconscriptionTopographique/OperationTopograhiqueCourant/AutresReproduction';
import SurfaceBorne from '../components/CirconscriptionTopographique/OperationTopograhiqueCourant/SurfaceBorne';

import Dematerialisation from '../components/CirconscriptionTopographique/TravauxModernisation/Dematerialisation';
import ElaborationPlof from '../components/CirconscriptionTopographique/TravauxModernisation/ElaborationPlof';

import FondPlanDeteriore from '../components/CirconscriptionTopographique/FondPlan/FondPlanDeteriore';

import BudgetGenerale from '../components/CirconscriptionTopographique/RapportBudgetaire/BudgetGenerale';

import utilisateur from '../images/utilisateur.png';

function ChefCirconscriptionTopographique() {

    const [nomUser, setnomUser] = useState("");
    const [prenomUser, setprenomUser] = useState("");
    const [telephone, settelephone] = useState("");
    const [CIN, setCIN] = useState("");
    const [email, setemail] = useState("");
    const [nomRegion, setnomRegion] = useState("");
    const [nomCirconscription, setnomCirconscription] = useState("");
    const [fonctionNum, setfonctionNum] = useState(0);
    const [fonctionName, setfonctionName] = useState("");

    VerificationAuth();

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState('PageRapportAct');
    const [NomPage, setNomPage] = useState("Rapport d'activité");
    let pageContent;



    switch (currentPage) {
        case "PageRapportAct":
            pageContent = <RapportActivite nomRegion={nomRegion} nomCirconscription={nomCirconscription} />;
            break;

        case "TravauxBornages":
            pageContent = <TravauxBornage />;
            break;

        case "TravauxPlanRegulier":
            pageContent = <TravauxPlanRegulier />;
            break;

        case "AutresTravaux":
            pageContent = <AutresTravaux />;
            break;

        case "TravauxReperage":
            pageContent = <TravauxReperage />;
            break;

        case "ReproductionPlan":
            pageContent = <ReproductionPlan />;
            break;

        case "AutresReproduction":
            pageContent = <AutresReproduction />;
            break;

        case "SurfaceBorne":
            pageContent = <SurfaceBorne />;
            break;


        //////////////////////////TRAVAUX MODERNISATION//////////////////////////////
        case "Dematerialisation":
            pageContent = <Dematerialisation />;
            break;

        case "ElaborationPlof":
            pageContent = <ElaborationPlof />;
            break;


        ////////////////////FOND PLAN///////////////////////////////
        case "FondPlanDeteriore":
            pageContent = <FondPlanDeteriore />;
            break;


        ///////////RAPPORT BUDGETAIRE/////////////////
        case "BudgetGeneral":
            pageContent = <BudgetGenerale />;
            break;

        default:
            pageContent = "<div>Contenu introuvable</div>"
            break;
    }

    const logout = () => {

        //RECUPERATION DU TOKEN
        const token = localStorage.getItem('token');

        // Définissez l'en-tête Authorization avec le jeton
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.get('http://127.0.0.1:8000/api/logout', config)
            .then(response => {
                localStorage.clear();
                navigate("/login");
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            });
    }


    //U T I L I S A T E U R
    const token = localStorage.getItem('token');

    // Définissez l'en-tête Authorization avec le jeton
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [userId, setuserId] = useState(0);
    const [userCirconscriptionId, setuserCirconscriptionId] = useState(0);




    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user', config)
            .then(response => {
                setuserId(response.data.id);
                setuserCirconscriptionId(response.data.circonscription_id);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (userId !== 0 && userCirconscriptionId !== 0) {
        // const configuration = {
        //     utilisateurCirconscriptionId: userCirconscriptionId
        // };

        // axios.post('http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/InitialisationActivite', configuration)
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Erreur lors de la récupération des informations utilisateur:', error);
        //     });

        const configuration2 = {
            params: {
                utilisateurId: userId
            }
        };
        axios.get('http://127.0.0.1:8000/api/circonscriptionDistrict/infoUtilisateur', configuration2)
            .then(response => {
                setnomUser(response.data.Nom);
                setprenomUser(response.data.Prenom);
                settelephone(response.data.Telephone);
                setCIN(response.data.CIN);
                setemail(response.data.email);
                setnomRegion(response.data.NomRegion);
                setnomCirconscription(response.data.NomCirconscription);
                setfonctionNum(response.data.fonction);
                const fonctionId = response.data.fonction;

                switch (fonctionId) {
                    case 0:
                        setfonctionName("Administrateur");
                        break;
                    case 1:
                        setfonctionName("Directeur des Services Topographique");
                        break;
                    case 2:
                        setfonctionName("Conservateur Nationale");
                        break;
                    case 3:
                        setfonctionName("Chef Services Régional Topographique");
                        break;

                    default:
                        setfonctionName("Chef Circonscription Topographique");
                        break;
                }


            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            });
    }

    const [isOpen, setisOpen] = useState(true);

    const FermetureBarLateral = () => {
        setisOpen(!isOpen);
    }

    return (<>
        <div className={`dashboard ${isOpen ? 'open' : 'closed'}`}  >
            <aside className="search-wrap">
                <div className="search">
                    <svg style={{ cursor: 'pointer' }} onClick={FermetureBarLateral} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>
                    <nav className='circonscr-header'>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{nomRegion}</li>
                            <li className="breadcrumb-item">{nomCirconscription}</li>
                            <li className="breadcrumb-item">{NomPage}</li>
                        </ol>
                    </nav>
                </div>

                <div className="user-actions">
                    <button onClick={logout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z" /><path d="M11 2h2v10h-2z" /></svg>
                    </button>
                </div>
            </aside>

            <header className="menu-wrap">
                <figure className="user">
                    <div className="user-avatar">
                        <img src={utilisateur} alt="utilisateur" />
                    </div>
                    <div>
                        <ul className='infoUserLateral'>
                            <li>{nomUser}</li>
                            <li>{prenomUser}</li>
                            <li>{telephone}</li>
                        </ul>
                    </div>
                </figure>
                <div className='fonctionUserName'>{fonctionName}</div>
                <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='btn btn-primary btn-sm btnOpenCloseNavbar'>Gerer mon compte</button>
                <NavigationChefCircTopo pageName={setNomPage} pageClicked={setCurrentPage} />
            </header>

            <main className="content-wrap">

                {pageContent}

            </main>
        </div>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg>
                <h4 id="offcanvasRightLabel">Gestion de compte</h4>
            </div>
            <div className="offcanvas-body">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                </svg>
                                <div className='titreAccordionMenu'>Information du compte</div>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="">
                                    <ul className="list-group mb-3 list-group-flush">
                                        <li className="list-group-item px-0 d-flex justify-content-between">
                                            <span>Nom</span>
                                            <strong style={{ fontWeight: 'lighter' }}>{nomUser}</strong>
                                        </li>
                                        <li className="list-group-item px-0 d-flex justify-content-between">
                                            <span>Prénom</span>
                                            <strong style={{ fontWeight: 'lighter' }}>{prenomUser}</strong>
                                        </li>
                                        <li className="list-group-item px-0 d-flex justify-content-between">
                                            <span>Téléphone</span>
                                            <strong style={{ fontWeight: 'lighter' }}>{telephone}</strong>
                                        </li>
                                        <li className="list-group-item px-0 d-flex justify-content-between">
                                            <span>CIN</span>
                                            <strong style={{ fontWeight: 'lighter' }}>{CIN}</strong>
                                        </li>
                                        <li className="list-group-item px-0 d-flex justify-content-between">
                                            <span>Email</span>
                                            <strong style={{ fontWeight: 'lighter' }}>{email}</strong>
                                        </li>
                                        <li className="list-group-item px-0 d-flex justify-content-between">
                                            <span>Fonction</span>
                                            <strong style={{ fontWeight: 'lighter' }}>
                                                {fonctionName}
                                            </strong>
                                        </li>
                                        {fonctionNum === 3 || fonctionNum === 4 ? (
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span>Région</span>
                                                <strong style={{ fontWeight: 'lighter' }}>
                                                    {
                                                        nomRegion
                                                    }
                                                </strong>
                                            </li>
                                        ) : null}
                                        {fonctionNum === 4 ? (
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span>Circonscription</span>
                                                <strong style={{ fontWeight: 'lighter' }}>
                                                    {nomCirconscription}
                                                </strong>
                                            </li>
                                        ) : null}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                                <div className='titreAccordionMenu'>Modification du compte</div>
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="card">
                                    <div className="card-header">
                                        <h6>Veuillez remplir le formulaire</h6>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-2">
                                                <input style={{ fontFamily: "monospace" }} className="form-control form-control-sm" type="text" placeholder="Nom" aria-label=".form-control-sm example" />
                                            </div>
                                            <div className="mb-2">
                                                <input style={{ fontFamily: "monospace" }} className="form-control form-control-sm" type="text" placeholder="Prénom" aria-label=".form-control-sm example" />
                                            </div>
                                            <div className="mb-2">
                                                <input style={{ fontFamily: "monospace" }} maxLength={10} className="form-control form-control-sm" type="text" placeholder="Télephone" aria-label=".form-control-sm example" />
                                            </div>
                                            <div className="mb-2">
                                                <input style={{ fontFamily: "monospace" }} maxLength={12} className="form-control form-control-sm" type="text" placeholder="CIN" aria-label=".form-control-sm example" />
                                            </div>
                                            <button style={{ width: "100%", fontFamily: "monospace" }} type="submit" className="btn btn-success btn-sm mt-3">Mettre à jour</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z" />
                                </svg>
                                <div className='titreAccordionMenu'> Suppression du compte</div>
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className='mb-3'>   Si vous êtes sûr de vouloir procéder à la suppression de votre compte, veuillez confirmer cette décision en cliquant sur le boutton ci-dessous :
                                </div>

                                <button style={{ display: 'flex', alignItems: "center", justifyContent: 'space-evenly', width: '130px', fontSize: '15px', fontFamily: "monospace" }} className='btn btn-danger btn-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                    <div>Supprimer</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ChefCirconscriptionTopographique