import { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import { CSGOCapsulesPack, CSgoWeaponCase, GraffitiBox } from '../models/csgoAssets-model';
import Cases from '../components/cases/Cases';
import Header from '../components/layout/Header';
import DisplayCases from '../components/DisplayCases';
import MiniNabbar from '../components/layout/MiniNabbar';
import Particles from '../components/bg-style-components/Particles';
import Cubes from '../components/bg-style-components/Cubes';
import Footer from '../components/layout/Footer';
import LoadingCases from '../components/bg-style-components/LoadingCases';

interface UserData {
    steamId: string;
    username: string;
    displayName: string;
    // Otros campos de usuario si los tienes
}

const HomePage = () => {
    const [userData, setUserData] = useState<null | UserData>(null);
    const [caseData, setCaseData] = useState<CSgoWeaponCase[] | null>()
    const [patchesData, setPatchesData] = useState<CSGOCapsulesPack[] | null>()
    const [souvenirData, setSouvenirData] = useState<CSgoWeaponCase[] | null>()
    const [graffitiData, setGraffitiData] = useState<GraffitiBox[] | null>()
    const [loadedAllCases, setLoadedAllCases] = useState<boolean>(false)
    const [loadedCSpatches, setLoadedCSpatches] = useState<boolean>(false)
    const [loadedSpray, setLoadedSpray] = useState<boolean>(false)

    useEffect(() => {

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, { withCredentials: true })
            .then(response => {
                setUserData(response.data)
                console.log(userData);

            })
            .catch(error => {
                console.error('Error al obtener datos de usuario:', error);
            });
    }, []);




    useEffect(() => {
        document.title = "CaseJolt - Home";
        FetchCScases()
        FetchCScapsules()
        FetchCSsouvenir()
        FetchCSGraffiti()
    }, [])

    const FetchCScases = async () => {
        setLoadedAllCases(false)
        try {
            const response = await axios.get<{ success: boolean, data: CSgoWeaponCase[] }>(`${import.meta.env.VITE_BACKEND_URL}/assets/data/cases`, { withCredentials: true });
            if (response.data.success) {
                setLoadedAllCases(true)
                setCaseData(response.data.data)
            }
            else {
                setLoadedAllCases(true)
                setCaseData(null)
            }
        } catch (error) {
            setLoadedAllCases(true)
            console.error('Error al obtener datos del usuario:', error);
        }
    };
    const FetchCScapsules = async () => {
        setLoadedCSpatches(false)
        setLoadedCSpatches(false)
        try {
            const response = await axios.get<{ success: boolean, data: CSGOCapsulesPack[] }>(`${import.meta.env.VITE_BACKEND_URL}/assets/data/patches`, { withCredentials: true });
            if (response.data.success) {
                setLoadedCSpatches(true)
                setPatchesData(response.data.data)
            }
            else {
                setLoadedCSpatches(true)
                setPatchesData(null)
            }
        } catch (error) {
            setLoadedCSpatches(true)
            console.error('Error al obtener datos del usuario:', error);
        }
    }
    const FetchCSsouvenir = async () => {
        try {
            const response = await axios.get<{ success: boolean, data: CSgoWeaponCase[] }>(`${import.meta.env.VITE_BACKEND_URL}/assets/data/souvenir`, { withCredentials: true });
            if (response.data.success) { setSouvenirData(response.data.data) }
            else { setSouvenirData(null) }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    }
    const FetchCSGraffiti = async () => {
        setLoadedSpray(false)
        try {
            const response = await axios.get<{ success: boolean, data: GraffitiBox[] }>(`${import.meta.env.VITE_BACKEND_URL}/assets/data/graffiti`, { withCredentials: true });
            if (response.data.success) {
                setLoadedSpray(true)
                setGraffitiData(response.data.data)
            }
            else {
                setLoadedSpray(true)
                setGraffitiData(null)
            }
        } catch (error) {
            setLoadedSpray(true)
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
                {loadedAllCases ?
                    <div className=' h-[550px] overflow-auto w-[90%] md:w-[85%] m-auto  p-2 rounded-md'>
                        <div className='grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 '>
                            {caseData && caseData?.map((data, i) => { return (<div key={i}><Cases data={data} /></div>) })}
                        </div>
                    </div>
                    :
                    <LoadingCases heigth={550} />
                }


            </div>

            {/* Capsules */}

            <div className=' overflowBar border-t border-[#3e3e3e35] overflow-hidden'>
                <div className='w-[95%] md:w-[85%] m-auto mb-3 pt-10'>
                    <h1 className='text-white font-bold text-md md:text-2xl'>ALL CS PATCHES </h1>
                </div>

                <Cubes />
                {

                    loadedCSpatches ?
                        <div className=' h-[550px] overflow-auto w-[90%] md:w-[85%] m-auto  p-2 rounded-md'>
                            <div className='grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 '>
                                {patchesData && patchesData?.map((data, i) => { return (<div key={i}><Cases data={data} /></div>) })}
                            </div>
                        </div>
                        :
                        <LoadingCases heigth={500} />


                }


            </div>
            {/* Graffiti */}
            <div className=' overflowBar border-t border-[#3e3e3e35] overflow-hidden'>
                <div className='w-[95%] md:w-[85%] m-auto mb-3 pt-10'>
                    <h1 className='text-white font-bold text-md md:text-2xl'>ALL CS GRAFFITI KITS </h1>
                </div>
                {
                    loadedSpray ?
                        <div className=' h-[300px] overflow-auto w-[90%] md:w-[85%] m-auto  p-2 rounded-md'>
                            <div className='grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 '>
                                {graffitiData && graffitiData?.map((data, i) => { return (<div key={i}><Cases data={data} /></div>) })}
                            </div>
                        </div> :
                        <LoadingCases heigth={250} />

                }

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
            <div>
                <Footer />
            </div>

        </>
    )
}

export default HomePage


