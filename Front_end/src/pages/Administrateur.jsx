
import VerificationAuth from '../components/VerificationAuth'
import NavigationAdminitstrateur from '../layout/Dst/NavigationAdminitstrateur';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import utilisateur from '../images/utilisateur.png';


import RapportActiviteNational from '../components/CirconscriptionTopographique/Visualisation/RapportActiviteNational';
import DmdAdhesion from '../components/Compte/DmdAdhesion';
import ListeUtilisteur from '../components/Compte/ListeUtilisteur';



function Administrateur() {

    const [nomUser, setnomUser] = useState("");
    const [prenomUser, setprenomUser] = useState("");
    const [telephone, settelephone] = useState("")
    const [nomRegion, setnomRegion] = useState("");
    const [fonctionName, setfonctionName] = useState("");


    VerificationAuth();

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState('PageRapportAct');
    const [NomPage, setNomPage] = useState("Rapport d'activité");
    let pageContent;



    switch (currentPage) {
        case "PageRapportAct":
            pageContent = <RapportActiviteNational nomRegion={nomRegion} />;
            break;

        case "DemandeAdhesion":
            pageContent = <DmdAdhesion nomRegion={nomRegion} />;
            break;

        case "ListeUtilisateur":
            pageContent = <ListeUtilisteur nomRegion={nomRegion} />;
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

    return (

        <div className={`dashboard ${isOpen ? 'open' : 'closed'}`}  >
            <aside className="search-wrap">
                <div className="search">
                    <svg style={{ cursor: 'pointer' }} onClick={FermetureBarLateral} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>

                    <nav className='circonscr-header'>
                        <ol className="breadcrumb">
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
                <button className='btn btn-primary btn-sm btnOpenCloseNavbar'>Gerer mon compte</button>
                <NavigationAdminitstrateur pageName={setNomPage} pageClicked={setCurrentPage} />
            </header>

            <main className="content-wrap">

                {pageContent}

            </main>
        </div>

    )
}

export default Administrateur