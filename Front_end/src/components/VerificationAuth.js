import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VerificationAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Rediriger vers la page de connexion si le token est absent
            navigate("/login");
            return; // Arrêter l'exécution de la vérification si le token est absent
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.get('http://127.0.0.1:8000/api/user', config)
            .then(response => {
                const userFunction = response.data.fonction;
                if (userFunction === 0) {
                    navigate("/Administrateur");
                } else if (userFunction === 1) {
                    navigate("/DirecteurServiceTopographique");
                } else if (userFunction === 2) {
                    navigate("/ConservateurNationale");
                } else if (userFunction === 3) {
                    navigate("/ChefServiceRegionaleTopographique");
                } else {
                    navigate("/ChefCirconscriptionTopographique");
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            });
    }, [navigate]);

    return null;
}
