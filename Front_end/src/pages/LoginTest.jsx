import React, { useState } from 'react';
import axios from 'axios';


function Login({ setAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            // Stocker le token dans le localStorage
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            console.log(response.data.status);

            if (response.data.status === "401") {
                console.log("Validation Erreur");

            } else {
                if (response.data.status === "200") {

                    console.log("Connecter");
                    localStorage.setItem('token', response.data.token);


                    // Rediriger en fonction du rôle
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
                } else {
                    console.log("Mots de passe ou email incorrect");

                }


            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
