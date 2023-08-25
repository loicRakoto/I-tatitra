import React from 'react'
// import { useNavigate } from 'react-router-dom';



function NavigationChefCircTopo({ pageClicked, pageName }) {

    // const navigate = useNavigate();

    return (
        <nav>
            <section className="Visusalisationactivités">
                <h3>Visusalisation des rapports d'activités</h3>
                <ul>
                    <li>
                        <a href='/' onClick={(e) => { e.preventDefault(); pageClicked('PageRapportAct'); pageName("Rapport d'activité") }}>
                            Rapport d'activité
                        </a>
                    </li>
                </ul>
            </section>

            <section className="OperationTopo">
                <h3>OPERATION TOPOGRAPHIQUE COURANTE</h3>
                <ul>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('TravauxBornages'); pageName('Travaux de bornages') }}>
                            Travaux de bornages
                        </a>
                    </li>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('TravauxPlanRegulier'); pageName('Travaux de plan régulier et projet de morcellement') }}>
                            Travaux de plan régulier et projet de morcellement
                        </a>
                    </li>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('AutresTravaux'); pageName('Autres travaux') }}>
                            Autres travaux
                        </a>
                    </li>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('TravauxReperage'); pageName('Travaux de repérage') }}>
                            Travaux de repérage
                        </a>
                    </li>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('ReproductionPlan'); pageName('Reproduction du plan') }}>
                            Reproduction du plan
                        </a>
                    </li>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('AutresReproduction'); pageName('Autres reproductions') }}>
                            Autres reproductions
                        </a>
                    </li>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('SurfaceBorne'); pageName('Surface bornées') }}>
                            Surface bornées
                        </a>
                    </li>
                </ul>
            </section>

            <section className="TravauxModernis">
                <h3>Travaux de modernisation</h3>
                <ul>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('Dematerialisation'); pageName('Dématérialisation') }}>
                            Dématérialisation
                        </a>
                    </li>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('ElaborationPlof'); pageName('Elaboration plof / Validation plof') }}>
                            Elaboration plof / Validation plof
                        </a>
                    </li>
                </ul>
            </section>

            <section className="FondPlan">
                <h3>FOND PLAN</h3>
                <ul>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('FondPlanDeteriore'); pageName('Fonds plans déteriorés et / ou demandes spéciales') }}>
                            Fonds plans déteriorés et / ou demandes spéciales
                        </a>
                    </li>
                </ul>
            </section>

            <section className="RapportBudget">
                <h3>Rapport budgétaire</h3>
                <ul>
                    <li>
                        <a href="/" onClick={(e) => { e.preventDefault(); pageClicked('BudgetGeneral'); pageName('Budget génerale') }}>
                            Budget génerale
                        </a>
                    </li>
                </ul>
            </section>
        </nav >
    )
}

export default NavigationChefCircTopo