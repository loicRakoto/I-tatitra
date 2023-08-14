import React from 'react'
import ImageDST from '../images/DST.jpg';
import FormConnect from '../components/Login/FormConnect'
import { useState } from 'react';
import VerificationAuth from '../components/VerificationAuth';
export default function Login() {

    VerificationAuth();

    const [isInscriptionVisible, setIsInscriptionVisible] = useState(false);

    const verificateur = (formName) => (event) => {
        event.preventDefault();

        // Gérer la visibilité du formulaire en fonction de formName
        if (formName === 'FormInscription') {
            setIsInscriptionVisible(true);
        } else if (formName === 'FormConnexion') {
            setIsInscriptionVisible(false);
        }
    };


    return (
        <div className="wrapper">
            <div className="container main">
                <div className="row rowLogin">
                    <div className={`col-md-6 side-image ${isInscriptionVisible ? 'hidden' : ''}`}>
                        {/* image */}
                        <img src={ImageDST} alt="" />

                        <div className="text">

                        </div>
                    </div>
                    <div className={`${isInscriptionVisible ? '' : 'col-md-6 right'}`}>
                        <div className="input-box">
                            <header className="head-formu-cnct mt-4"> {isInscriptionVisible ? "Inscription" : 'Se connecter'} </header>



                            <FormConnect formUse={isInscriptionVisible}></FormConnect>

                            <div className="signin">
                                <span className={`inscr ${isInscriptionVisible ? 'hidden' : ''}`}>Vous avez n'avez pas encore un compte ? <a onClick={verificateur('FormInscription')} href="https://example.com">Inscrivez vous ici</a></span>
                                <span className={`connect ${isInscriptionVisible ? '' : 'hidden'}`}  >Vous avez déja un compte ? <a onClick={verificateur('FormConnexion')} href="https://example.com"> Se connecter </a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
