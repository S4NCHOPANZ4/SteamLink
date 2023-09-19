import { useState, useEffect } from 'react'
import { store, useAppSelector } from "../../redux/store"
import { useAppDispatch } from "../../redux/store"
import axios from 'axios';

const Navbar = () => {

    const dispatch = useAppDispatch();
    const [redirecting, setRedirecting] = useState(false);
    const userData = useAppSelector((state) => state.user);
    const [loadingPFP, setLoadingPFP] = useState(true);

    const handleSteamLogin = () => {
        // Redirigir al usuario a tu backend para iniciar sesión con Steam
        setRedirecting(true);
        window.location.href = 'http://localhost:3001/auth/steam'; // Reemplaza con la URL de tu backend
    };


    return (
        <div className="w-full bg-[var(--graybase-700)] md:h-[85px] h-[55px] flex item-center justify-between">
            <div className="flex justify-center items-center ml-5">
                <h1 className="text-white font-bold">PagName</h1>
            </div>
            {
                (Object.keys(userData).length > 0) ?
                    <div className="flex justify-center items-center mr-5">
                        <h1 className="text-white font-bold mr-3 text-sm md:text-lg">{userData.displayName}</h1>
                        <img 
                        style={loadingPFP? {display: 'none'} : {display: 'block'}}
                        onLoad={()=> setLoadingPFP(false)}
                        className='h-[35px] w-[35px] md:h-[50px] md:w-[50px] rounded-full' src={userData.steamUser?.avatarfull} alt="pfp" />
                        <div 
                        style={loadingPFP? {display: 'block'} : {display: 'none'}}
                        className='h-[35px] w-[35px] md:h-[50px] md:w-[50px] rounded-full flex items-center justify-center bg-gray-700'>

                        </div>
                    </div>
                    :
                    <div className="flex justify-center items-center mr-5">
                        <button 
                        onClick={handleSteamLogin}
                        className="bg-green-400 px-3 py-2 rounded-md font-semibold text-white min-w-[75px]">
                            {redirecting? 
                            <div className='loader_mini'></div>
                            :
                            'Login'
                            }
                        </button>
                    </div>
            }

        </div>
    )
}

export default Navbar