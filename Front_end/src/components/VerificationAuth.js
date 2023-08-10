
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VerificationAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
    }, [navigate]);

    return null;
}
