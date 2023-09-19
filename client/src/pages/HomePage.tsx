import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import { CSgoWeaponCase } from '../models/csgoAssets-model';
import Cases from '../components/cases/Cases';
import Header from '../components/layout/Header';

interface UserData {
    steamId: string;
    username: string;
    displayName: string;
    // Otros campos de usuario si los tienes
}

const HomePage = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState<null | UserData>(null);

    useEffect(() => {

        axios.get('http://localhost:3001/auth/user', { withCredentials: true })
            .then(response => {
                setUserData(response.data)
            })
            .catch(error => {
                console.error('Error al obtener datos de usuario:', error);
            });
    }, []);



    const [caseData, setCaseData] = useState<CSgoWeaponCase[] | null>()

    useEffect(() => {
        FetchUserInventory()
    }, [])

    const FetchUserInventory = async () => {
        try {
            const response = await axios.get<{ success: boolean, data: CSgoWeaponCase[] }>('http://localhost:3001/assets/data/cases');

            if (response.data.success) {
                setCaseData(response.data.data)

            }
            else {
                setCaseData(null)

            }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    };



    return (
        <>
            <div>
                <Navbar />
            </div>
            <Header />
            {/* Cases */}
            <div className='mt-5 overflowBar'>
                <div className='w-[95%] md:w-[85%] m-auto mb-3'>
                    <h1 className='text-white font-bold text-md md:text-2xl'>ALL CASES </h1>
                </div>
                <div className='box-shadow-yellow h-[435px] overflow-auto w-[95%] md:w-[85%] m-auto bg-[var(--graybase-500)] p-2 rounded-md'>
                    <div className='grid gap-2 grid-cols-2 md:grid-cols-5 '>
                        {
                            caseData && caseData.map((data, i) => {
                                return (
                                    <div key={i}>
                                        <Cases data={data} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomePage


// {userData ? (
//     <div>
//         <p>Steam ID: {userData.steamId}</p>
//         <p>Nombre de usuario: {userData.displayName}</p>
//         {/* Otros datos del usuario */}
//     </div>
// ) : (
//     <p>No se encontraron datos de usuario en la cookie.</p>
// )}