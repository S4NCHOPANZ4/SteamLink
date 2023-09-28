import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import { CSGOCapsulesPack, CSGOMusicKitBox, CSgoWeaponCase, GraffitiBox } from '../models/csgoAssets-model';
import Cases from '../components/cases/Cases';
import Header from '../components/layout/Header';
import DisplayCases from '../components/DisplayCases';
import MiniNabbar from '../components/layout/MiniNabbar';
import Particles from '../components/bg-style-components/Particles';
import Cubes from '../components/bg-style-components/Cubes';

interface UserData {
    steamId: string;
    username: string;
    displayName: string;
    // Otros campos de usuario si los tienes
}

const HomePage = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState<null | UserData>(null);
    const [caseData, setCaseData] = useState<CSgoWeaponCase[] | null>()
    const [patchesData, setPatchesData] = useState<CSGOCapsulesPack[] | null>()
    const [musicsData, setMusicData] = useState<CSGOMusicKitBox[] | null>()
    const [souvenirData, setSouvenirData] = useState<CSgoWeaponCase[] | null>()
    const [graffitiData, setGraffitiData] = useState<GraffitiBox[] | null>()

    useEffect(() => {

        axios.get('http://localhost:3001/auth/user', { withCredentials: true })
            .then(response => {
                setUserData(response.data)
            })
            .catch(error => {
                console.error('Error al obtener datos de usuario:', error);
            });
    }, []);




    useEffect(() => {
        FetchCScases()
        FetchCScapsules()
        FetchCSmusic()
        FetchCSsouvenir()
        FetchCSGraffiti()
    }, [])

    const FetchCScases = async () => {
        try {
            const response = await axios.get<{ success: boolean, data: CSgoWeaponCase[] }>('http://localhost:3001/assets/data/cases');
            if (response.data.success) { setCaseData(response.data.data) }
            else { setCaseData(null) }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    };
    const FetchCScapsules = async () => {
        try {
            const response = await axios.get<{ success: boolean, data: CSGOCapsulesPack[] }>('http://localhost:3001/assets/data/patches');
            if (response.data.success) { setPatchesData(response.data.data) }
            else { setPatchesData(null) }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    }
    const FetchCSmusic = async () => {
        try {
            const response = await axios.get<{ success: boolean, data: CSGOMusicKitBox[] }>('http://localhost:3001/assets/data/music');
            if (response.data.success) { setMusicData(response.data.data) }
            else { setMusicData(null) }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    }
    const FetchCSsouvenir = async () => {
        try {
            const response = await axios.get<{ success: boolean, data: CSgoWeaponCase[] }>('http://localhost:3001/assets/data/souvenir');
            if (response.data.success) { setSouvenirData(response.data.data) }
            else { setSouvenirData(null) }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    }
    const FetchCSGraffiti = async () => {
        try {
            const response = await axios.get<{ success: boolean, data: GraffitiBox[] }>('http://localhost:3001/assets/data/graffiti');
            if (response.data.success) { setGraffitiData(response.data.data) }
            else { setGraffitiData(null) }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    }





    return (
        <>
            <div>
                <Navbar />
            </div>
            <Header />
            <MiniNabbar />
            {/* Cases */}
            <div className='mt-5 overflowBar border-t border-[#3e3e3e35] overflow-hidden'>
                <Particles />

                <div className='w-[95%] md:w-[85%] m-auto mb-3 pt-10'>
                    <h1 className='text-white font-bold text-md md:text-2xl'>ALL CS CASES </h1>
                </div>
                <div className=' h-[550px] overflow-auto w-[90%] md:w-[85%] m-auto  p-2 rounded-md'>
                    <div className='grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 '>
                        {caseData && caseData.map((data, i) => { return (<div key={i}><Cases data={data} /></div>) })}
                    </div>
                </div>

            </div>

            {/* Capsules */}

            <div className=' overflowBar border-t border-[#3e3e3e35] overflow-hidden'>
                <div className='w-[95%] md:w-[85%] m-auto mb-3 pt-10'>
                    <h1 className='text-white font-bold text-md md:text-2xl'>ALL CS PATCHES </h1>
                </div>

                <Cubes />
                <div className=' h-[550px] overflow-auto w-[90%] md:w-[85%] m-auto  p-2 rounded-md'>
                    <div className='grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 '>
                        {patchesData && patchesData.map((data, i) => { return (<div key={i}><Cases data={data} /></div>) })}
                    </div>
                </div>

            </div>
            {/* Graffiti */}
            <div className=' overflowBar border-t border-[#3e3e3e35] overflow-hidden'>
                <div className='w-[95%] md:w-[85%] m-auto mb-3 pt-10'>
                    <h1 className='text-white font-bold text-md md:text-2xl'>ALL CS GRAFFITI KITS </h1>
                </div>

                <div className=' h-[300px] overflow-auto w-[90%] md:w-[85%] m-auto  p-2 rounded-md'>
                    <div className='grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 '>
                        {graffitiData && graffitiData.map((data, i) => { return (<div key={i}><Cases data={data} /></div>) })}
                    </div>
                </div>
            </div>
            {/* Souvenir */}

            <div className=' overflowBar border-t border-[#3e3e3e35] overflow-hidden pt-10'>

                <div className='w-[95%] md:w-[85%] m-auto mb-3'>
                    <h1 className='text-white font-bold text-md md:text-2xl'>ALL CS SOUVENIR CASES </h1>
                </div>
                {souvenirData &&
                    <DisplayCases dataCases={souvenirData} />
                }
            </div>


        </>
    )
}

export default HomePage


