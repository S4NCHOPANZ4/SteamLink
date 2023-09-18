import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const [redirecting, setRedirecting] = useState(false);
    const navigate = useNavigate()

    const handleSteamLogin = () => {
        // Redirigir al usuario a tu backend para iniciar sesión con Steam
        setRedirecting(true);
        window.location.href = 'http://localhost:3001/auth/steam'; // Reemplaza con la URL de tu backend
    };


    return (
        <div>
            {redirecting ? (
                <p>Redirigiendo a Steam...</p>
            ) : (
                <button onClick={handleSteamLogin} className='bg-green-400'>Go to Steam</button>
            )}
        </div>
    )
}

export default LoginPage