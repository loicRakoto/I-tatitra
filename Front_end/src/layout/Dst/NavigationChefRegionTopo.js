import React from 'react'
// import { useNavigate } from 'react-router-dom';



function NavigationChefRegionTopo({ pageClicked, pageName }) {

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
        </nav >
    )
}

export default NavigationChefRegionTopo