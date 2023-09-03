import React from 'react'
// import { useNavigate } from 'react-router-dom';



function NavigationAdminitstrateur({ pageClicked, pageName }) {

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
            <section className="Gestiondecompte">
                <h3>Gestion des comptes utilisateurs</h3>
                <ul>

                    <li>
                        <a href='/' onClick={(e) => { e.preventDefault(); pageClicked('DemandeAdhesion'); pageName("Demande d'adhésion") }}>
                            Demande d'adhésion
                        </a>
                    </li>
                    <li>
                        <a href='/' onClick={(e) => { e.preventDefault(); pageClicked('ListeUtilisateur'); pageName("Liste des utilisateurs") }}>
                            Liste des utilisateurs
                        </a>
                    </li>
                </ul>
            </section>

        </nav >
    )
}

export default NavigationAdminitstrateur