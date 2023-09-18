import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface UserData {
    steamId: string;
    username: string;
    displayName: string;
    // Otros campos de usuario si los tienes
  }
  
const HomePage = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState<null | any>(null);

    useEffect(() => {

        axios.get('http://localhost:3001/auth/user', { withCredentials: true })
            .then(response => {
                console.log(response);

            })
            .catch(error => {
                console.error('Error al obtener datos de usuario:', error);
            });
    }, []);


    return (
        <div>
            {userData ? (
                <div>
                    <p>Steam ID: {userData.steamId}</p>
                    <p>Nombre de usuario: {userData.username}</p>
                    {/* Otros datos del usuario */}
                </div>
            ) : (
                <p>No se encontraron datos de usuario en la cookie.</p>
            )}
        </div>
    )
}

export default HomePage