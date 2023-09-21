import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AffichageErreur from './AffichageErreur';
import AffichageErreur2 from './AffichageErreur2';

function FormConnect(props) {


    const [posts, setPosts] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [districtRecup, setdistrictRecup] = useState([]);

    const handleOptionChange = (event) => {
        event.persist();
        const fonction = event.target.value;
        setSelectedOption(fonction);
        setFormDataIncription({ ...formDataInscription, fonction });
    };

    const rechercheDistrict = (event) => {
        const region = event.target.value;
        setSelectedRegion(region);
        setFormDataIncription({ ...formDataInscription, region });
    }

    useEffect(() => {
    }, [selectedOption]);


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/circonscriptionRegion').then(Response => {
            setPosts(Response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    const apiUrl = 'http://127.0.0.1:8000/api/circonscriptionDistrict';

    // Appeler la fonction lorsque l'option est sélectionnée
    useEffect(() => {
        const getListDistrict = () => {
            axios.get(apiUrl, {
                params: {
                    nomRegion: selectedRegion,
                },
            })
                .then((response) => {
                    setdistrictRecup(response.data);
                })
                .catch((error) => {
                    console.error('Erreur lors de la requête API:', error);
                });
        };

        if (selectedRegion) {
            getListDistrict();
        }
    }, [selectedRegion]);


    const [etatSelectDistrict, setetatSelectDistrict] = useState('optionNul');
    const majDistrict = (event) => {
        var district = event.target.value;
        setetatSelectDistrict(district);
        setFormDataIncription({ ...formDataInscription, district });
    }

    useEffect(() => {
        setetatSelectDistrict('optionNul');
    }, [selectedRegion]);

    // STATE D'inscription
    const [formDataInscription, setFormDataIncription] = useState({
        nom: '',
        prenom: '',
        cin: '',
        numero: '',
        email: '',
        password: '',
        confirmpassword: '',
        district: '',
    });

    const handleInputInscrChange = (event) => {
        const { name, value } = event.target;
        setFormDataIncription({ ...formDataInscription, [name]: value });
    }

    const handleSubmitInscr = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/Utilisateur/add', formDataInscription)
            .then((response) => {
                setaffichageNotification(true);
                if (response.data.status === 400) {
                    setnotification(response.data.messageError);
                    setstatusReponse(response.data.status);
                }
                else if (response.data.status === 100) {
                    setnotification(["L'adresse email existe déjà"]);
                    setstatusReponse(response.data.status);
                }
                else {
                    setnotification(["Demande d'inscription réussie"]);
                    setstatusReponse(response.data.status);

                }
            })
            .catch((error) => {
                // Gestion des erreurs si nécessaire
                console.error(error);
            });
    }

    const [notification, setnotification] = useState("");
    const [affichageNotification, setaffichageNotification] = useState(false);
    const [statusReponse, setstatusReponse] = useState(0);

    const affichageStatus = (status) => {
        setaffichageNotification(status);
    }




    //  C O N N E X I O N  A  L  A P P L I C A T I O N


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [notification2, setnotification2] = useState("");
    const [affichageNotification2, setaffichageNotification2] = useState(false);
    const [statusReponse2, setstatusReponse2] = useState('');

    const affichageStatus2 = (status) => {
        setaffichageNotification2(status);
    }




    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            // Stocker le token dans le localStorage
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;


            setaffichageNotification2(true);

            if (response.data.status === "401") {
                setnotification2(response.data.messageError);
                setstatusReponse2(response.data.status);

            } else {
                if (response.data.status === "200") {
                    setnotification2(["Connexion réussie"]);
                    setstatusReponse2(response.data.status);
                    console.log("Connecter");
                    localStorage.setItem('token', response.data.token);

                    // ...

                    // Redirection en fonction du rôle (partie à retarder)
                    const redirectFunction = () => {
                        switch (response.data.user.fonction) {
                            case 0:
                                window.location.href = "/Administrateur";
                                break;
                            case 1:
                                window.location.href = "/DirecteurServiceTopographique";
                                break;
                            case 2:
                                window.location.href = "/ConservateurNationale";
                                break;
                            case 3:
                                window.location.href = "/ChefServiceRegionaleTopographique";
                                break;
                            default:
                                window.location.href = "/ChefCirconscriptionTopographique";
                                break;
                        }
                    };

                    // Attendre 5 secondes avant de poursuivre
                    setTimeout(() => {
                        const configuration = {
                            utilisateurCirconscriptionId: response.data.user.circonscription_id
                        };

                        axios.post('http://127.0.0.1:8000/api/ChefCirconsctiptionTopo/InitialisationActivite', configuration)
                            .then(response => {
                                console.log(response.data);
                                redirectFunction();
                            })
                            .catch(error => {
                                console.error('Erreur lors de la récupération des informations utilisateur:', error);
                            });
                    }, 3000); // Attendre 3000 millisecondes (5 secondes)
                }

                else if (response.data.status === "208") {
                    setnotification2(["Vous avez déja envoyer une demande d'adhésion, Veuillez attendre la confirmation de l'administrateur"]);
                    setstatusReponse2(response.data.status);
                }
                else if (response.data.status === "403") {
                    setnotification2(["Accès interdit. Votre compte n'a pas l'autorisation requise."]);
                    setstatusReponse2(response.data.status);
                }
                else {
                    setnotification2(["Mots de passe ou email incorrect"]);
                    setstatusReponse2(response.data.status);
                }
            }

        } catch (error) {
            console.error(error);
        }
    };

    if (props.formUse === true) {
        return (
            <div className="form-inscription" >
                {
                    affichageNotification === true ? (
                        <AffichageErreur notifications={notification} affichage={affichageStatus} statusRep={statusReponse} ></AffichageErreur>
                    ) : null
                }

                <form id="formInscr" onSubmit={handleSubmitInscr}>

                    <div className="input-group input-group-sm mb-3">
                        <input onChange={handleInputInscrChange} type="text" name='nom' className="form-control" placeholder="Nom" aria-label="Username" />
                        <span className="input-group-text"></span>
                        <input onChange={handleInputInscrChange} type="text" name='prenom' className="form-control" placeholder="Prénom" aria-label="Server" />
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <input maxLength={12} onChange={handleInputInscrChange} type="text" name='cin' className="form-control" placeholder="CIN" aria-label="Username" />
                        <span className="input-group-text"></span>
                        <input maxLength={10} onChange={handleInputInscrChange} type="text" name='numero' className="form-control" placeholder="Numéro télephone" aria-label="Server" />
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text">Email</span>
                        <input onChange={handleInputInscrChange} name='email' type="text" className="form-control" placeholder="Ex : solofo@gmail.com" aria-label="Server" />
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <input onChange={handleInputInscrChange} name='password' type="password" className="form-control" placeholder="Mot de passes" aria-label="Username" />
                        <span className="input-group-text"></span>
                        <input onChange={handleInputInscrChange} name='confirmpassword' type="password" className="form-control" placeholder="Confirmer votre mot de passes" aria-label="Server" />
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Fonction</label>
                        <select name='fonction'
                            className="form-select"
                            id="inputGroupSelect01"
                            onChange={handleOptionChange} defaultValue="optionNu"
                        >
                            <option value="optionNu" disabled hidden>Choisissez une fonction</option>
                            <option value={0}>Administrateur</option>
                            <option value={1}>Directeur des Services Topographique</option>
                            <option value={2}>Conservateur Nationale</option>
                            <option value={3}>Chef des Services Régional Topographique</option>
                            <option value={4}>Chef des Circonscription Topographique</option>
                        </select>
                    </div>

                    {selectedOption === '3' || selectedOption === '4' ? (
                        <div className="input-group input-group-sm mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect02">
                                Région
                            </label>
                            <select name='region' className="form-select" id="inputGroupSelect02" onChange={rechercheDistrict} defaultValue="optionNull" >
                                <option value="optionNull" disabled hidden>Choisissez une région</option>
                                {posts.map(item => (
                                    <option key={item.NomRegion} value={item.NomRegion}>
                                        {item.NomRegion}
                                    </option>
                                ))}
                            </select>
                            {selectedOption === '4' ? (
                                <>
                                    <label className="input-group-text" htmlFor="inputGroupSelect03">Circonscription</label>
                                    <select name='district'
                                        className="form-select"
                                        id="inputGroupSelect03"
                                        onChange={majDistrict} value={etatSelectDistrict}
                                    >
                                        <option value="optionNul" disabled hidden>Choisissez une district</option>
                                        {districtRecup.map(item => (
                                            <option key={item.NomCirconscription} value={item.NomCirconscription}>
                                                {item.NomCirconscription}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            ) : null}
                        </div>
                    ) : null
                    }

                    <button type="submit" className="btn btn-primary mt-3" style={{ width: '100%' }}>S'inscrire</button>
                </form >
            </div >


        )
    } else {
        return (
            <div className="form-connection">
                <form id="formcnct" onSubmit={handleLogin}>

                    {
                        affichageNotification2 === true ? (
                            <AffichageErreur2 notifications={notification2} affichage={affichageStatus2} statusRep={statusReponse2} ></AffichageErreur2>
                        ) : null
                    }

                    <div className="input-field">
                        <input name="mail" type="text" className="input" id="mail" onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="mail">Email</label>
                    </div>
                    <div className="input-field">
                        <input name="pass" type="password" className="input" id="pass" onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="pass">Password</label>
                    </div>
                    <div className="input-field">
                        <input type="submit" className="submit" value="Connexion" />
                    </div>
                </form>
            </div>
        )
    }





}

export default FormConnect