import React from 'react'
import VerificationAuth from '../components/VerificationAuth'
import NavigationChefCircTopo from '../layout/Dst/NavigationChefCircTopo';
import { useState } from 'react';

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

    const [currentPage, setCurrentPage] = useState('PageRapportAct');
    const [NomPage, setNomPage] = useState("Rapport d'activité");



    let pageContent;

    switch (currentPage) {
        case "PageRapportAct":
            pageContent = <RapportActivite />;
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



    return (
        <div className="dashboard">
            <aside className="search-wrap">
                <div className="search">
                    <label htmlFor="search">
                        <h7>{NomPage}</h7>
                    </label>
                </div>

                <div className="user-actions">
                    <button>
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
                <header className="content-head">

                </header>

                <div className="content">
                    {pageContent}
                </div>
            </main>
        </div>

    )
}

export default ChefCirconscriptionTopographique