
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



function ChefCirconscriptionTopographique() {

    // const [userId, setuserId] = useState(0);
    // const [nom, setnom] = useState('');
    // const [prenom, setprenom] = useState('');
    // const [telephone, settelephone] = useState('');
    // const [CIN, setCIN] = useState('');
    // const [userFonction, setuserFonction] = useState(0);
    // const [userCirconscriptionId, setuserCirconscriptionId] = useState(0);

    // const token = localStorage.getItem('token');

    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // };

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/api/user', config)
    //         .then(response => {
    //             setuserId(response.data.id);
    //             setnom(response.data.Nom);
    //             setprenom(response.data.Prenom);
    //             settelephone(response.data.Telephone);
    //             setCIN(response.data.CIN);
    //             setuserFonction(response.data.fonction);
    //             setuserCirconscriptionId(response.data.circonscription_id);

    //         })
    //         .catch(error => {
    //             console.error('Erreur lors de la récupération des informations utilisateur:', error);
    //         });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);


    VerificationAuth();

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState('PageRapportAct');
    const [NomPage, setNomPage] = useState("Rapport d'activité");
    let pageContent;



    switch (currentPage) {
        case "PageRapportAct":
            // pageContent = <RapportActivite />;
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

    const [nomUser, setnomUser] = useState("");
    const [prenomUser, setprenomUser] = useState("");
    const [telephone, settelephone] = useState("")
    const [nomRegion, setnomRegion] = useState("");
    const [nomCirconscription, setnomCirconscription] = useState("");


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
                setnomRegion(response.data.NomRegion);
                setnomCirconscription(response.data.NomCirconscription);

            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            });
    }


    return (
        <div className="dashboard">
            <aside className="search-wrap">
                <div className="search">

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
                    </div>
                    <figcaption>
                        <p>{nomUser}</p>
                        <p>{prenomUser}</p>
                        <p>{telephone}</p>
                    </figcaption>
                </figure>

                <NavigationChefCircTopo pageName={setNomPage} pageClicked={setCurrentPage} />
            </header>

            <main className="content-wrap">

                {pageContent}

            </main>
        </div>

    )
}

export default ChefCirconscriptionTopographique