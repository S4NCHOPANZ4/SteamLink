import { useState } from 'react'
import { store, useAppSelector } from "../redux/store"
import { useAppDispatch } from "../redux/store"

const Navbar = () => {

    const dispatch = useAppDispatch();
    const [redirecting, setRedirecting] = useState(false);
    const userData = useAppSelector((state) => state.user);

    const handleSteamLogin = () => {
        // Redirigir al usuario a tu backend para iniciar sesión con Steam
        setRedirecting(true);
        window.location.href = 'http://localhost:3001/auth/steam'; // Reemplaza con la URL de tu backend
    };


    return (
        <div className="w-full bg-gray-900 md:h-[85px] h-[55px] flex item-center justify-between">
            <div className="flex justify-center items-center ml-5">
                <h1 className="text-white font-bold">PagName</h1>
            </div>
            {
                (Object.keys(userData).length > 0) ?
                    <div className="flex justify-center items-center mr-5">
                        <h1 className="text-white font-bold">{userData.displayName}</h1>
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