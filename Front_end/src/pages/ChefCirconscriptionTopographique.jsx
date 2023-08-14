import React from 'react'
import VerificationAuth from '../components/VerificationAuth'
import NavigationChefCircTopo from '../layout/Dst/NavigationChefCircTopo';
import { useState, useEffect } from 'react';
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



    VerificationAuth();

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState('PageRapportAct');
    const [NomPage, setNomPage] = useState("Rapport d'activité");
    let pageContent;

    //RECUPERATION DU TOKEN
    const token = localStorage.getItem('token');

    // Définissez l'en-tête Authorization avec le jeton
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [detailUtilisateur, setDetailUtilisateur] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user', config)
            .then(response => {
                setDetailUtilisateur(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    switch (currentPage) {
        case "PageRapportAct":
            pageContent = <RapportActivite utilisateur={detailUtilisateur} />;
            break;

        case "TravauxBornages":
            pageContent = <TravauxBornage utilisateur={detailUtilisateur} />;
            break;

        case "TravauxPlanRegulier":
            pageContent = <TravauxPlanRegulier utilisateur={detailUtilisateur} />;
            break;

        case "AutresTravaux":
            pageContent = <AutresTravaux utilisateur={detailUtilisateur} />;
            break;

        case "TravauxReperage":
            pageContent = <TravauxReperage utilisateur={detailUtilisateur} />;
            break;

        case "ReproductionPlan":
            pageContent = <ReproductionPlan utilisateur={detailUtilisateur} />;
            break;

        case "AutresReproduction":
            pageContent = <AutresReproduction utilisateur={detailUtilisateur} />;
            break;

        case "SurfaceBorne":
            pageContent = <SurfaceBorne utilisateur={detailUtilisateur} />;
            break;


        //////////////////////////TRAVAUX MODERNISATION//////////////////////////////
        case "Dematerialisation":
            pageContent = <Dematerialisation utilisateur={detailUtilisateur} />;
            break;

        case "ElaborationPlof":
            pageContent = <ElaborationPlof utilisateur={detailUtilisateur} />;
            break;


        ////////////////////FOND PLAN///////////////////////////////
        case "FondPlanDeteriore":
            pageContent = <FondPlanDeteriore utilisateur={detailUtilisateur} />;
            break;


        ///////////RAPPORT BUDGETAIRE/////////////////
        case "BudgetGeneral":
            pageContent = <BudgetGenerale utilisateur={detailUtilisateur} />;
            break;

        default:
            pageContent = "<div>Contenu introuvable</div>"
            break;
    }

    const logout = () => {
        console.log(config);
        axios.get('http://127.0.0.1:8000/api/logout', config)
            .then(response => {
                localStorage.clear();
                navigate("/login");
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            });
    }



    return (
        <div className="dashboard">
            <aside className="search-wrap">
                <div className="search">
                    <label htmlFor="search">
                        <div>{NomPage}</div>
                    </label>
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
                        Amanda King
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