import { useState, } from 'react'
import { useAppSelector } from "../../redux/store"
// import { useAppDispatch } from "../../redux/store"
import { FaWallet } from "react-icons/fa"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import { CgLogOff } from "react-icons/cg"
import { useNavigate } from 'react-router-dom'
import Icon from "../../assets/icon.png"
import Refil from './Refil'


const Navbar = () => {
    const navigate = useNavigate();
    const [redirecting, setRedirecting] = useState(false);
    const userData = useAppSelector((state) => state.user);
    const [loadingPFP, setLoadingPFP] = useState(true);
    const [open, setOpen] = useState(false)
    const [openDeposit, setOpenDeposit] = useState<boolean>(false)

    const handleSteamLogin = () => {
        setRedirecting(true);
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/steam`; 
    };
    const handleDemoAccLogin = () => {
        setRedirecting(true);
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/user/demoAccount`;
    };
    const handleLogOut = () => {
        setRedirecting(true);
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/steam/logOut`;
    };



    return (
        <div className="w-full bg-[var(--graybase-700)] md:h-[85px] h-[55px] flex item-center justify-between">
            <Refil open={openDeposit} setOpen={setOpenDeposit} />
            <div
                onClick={() => navigate('/')}
                className="flex justify-center items-center md:ml-7 ml-1 cursor-pointer">
                <img src={Icon} alt="" className='md:h-[45px] h-[30px]' />
            </div>
            {
                (userData.username) ?
                    <div className='flex items-center justify-center relative'>
                        <div className='mr-2 sm:block hidden'>
                            <button
                                onClick={() => { setOpenDeposit(true) }}
                                className='bg-emerald-400 hover:bg-emerald-500 font-bold text-white  text-sm py-3 px-5 border-poligon ml-5 flex justify-center items-center'>
                                <FaWallet />
                                <p className='ml-2'>DEPOSIT</p>
                            </button>
                        </div>
                        <div className="flex justify-center items-center bg-[var(--graybase-500)] md:px-10 px-4 rounded-l-[20px] h-full">
                            <div className='mr-1 md:mr-2'>
                                <h1
                                    onClick={() => { navigate('/profile') }}
                                    className="cursor-pointer text-white font-bold text-sm md:text-lg">{userData.username}</h1>
                                <h1 className="text-white font-semibold mr-3 text-[.7rem] md:text-sm flex items-center justify-start"><FaWallet className="mr-1 md:mr-2" /><p className="ml-1">{"$ " + userData.balance}</p></h1>
                            </div>
                            <img
                                onClick={() => { navigate('/profile') }}
                                style={loadingPFP ? { display: 'none' } : { display: 'block' }}
                                onLoad={() => setLoadingPFP(false)}
                                className='h-[35px] w-[35px] md:h-[50px] md:w-[50px] rounded-full cursor-pointer' src={userData.avatarfull} alt="pfp" />
                            <div
                                style={loadingPFP ? { display: 'block' } : { display: 'none' }}
                                className='h-[35px] w-[35px] md:h-[50px] md:w-[50px] rounded-full flex items-center justify-center bg-gray-700'>

                            </div>
                            <div
                                onClick={() => setOpen(!open)}
                                className='ml-1 md:ml-3 p-1 bg-[var(--graybase-300)] rounded-md cursor-pointer'>
                                {open ? <FaAngleUp color="white" /> : <FaAngleDown color="white" />}
                            </div>
                        </div>
                        {
                            open &&
                            <div className='absolute w-[190px]  md:w-[220px] md:right-5 right-2 top-[100%] z-30 bg-[var(--graybase-500)] rounded-b-md'>
                                <div
                                    onClick={() => { navigate('/profile') }}
                                    className='cursor-pointer  hover:bg-[var(--graybase-600)]  flex items-center justify-center bg-[var(--graybase-700)] px-2 py-3'>
                                    <img
                                        style={loadingPFP ? { display: 'none' } : { display: 'block' }}
                                        onLoad={() => setLoadingPFP(false)}
                                        className='h-[35px] w-[35px] md:h-[50px] md:w-[50px] rounded-full' src={userData.avatarfull} alt="pfp" />
                                    <div className='ml-3'>
                                        <h1 className="text-white font-semibold text-[.9rem] md:text-md">{userData.username}</h1>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center  h-[45px] rounded-b-lg'>
                                    <button
                                        onClick={() => { setOpenDeposit(true) }}
                                        className='w-full h-full background-lineargradient-green text-white flex items-center justify-center font-semibold rounded-sm  border-2 border-green-400'>
                                        <FaWallet />
                                        <p className='ml-2 text-sm md:text-md'>DEPOSIT</p>
                                    </button>
                                </div>
                                <div 
                                onClick={() => handleLogOut()}
                                className='cursor-pointer flex items-center justify-center  px-2 py-3 rounded-b-lg text-white'>
                                    <CgLogOff />
                                    <p className='ml-2'>Log Out</p>
                                </div>
                            </div>

                        }

                    </div>
                    :
                    <div className="flex justify-center items-center mr-5">
                        <button
                            onClick={handleSteamLogin}
                            className="bg-emerald-400 hover:bg-emerald-500 font-bold text-white w-[120px] text-sm py-3 px-3 border-poligon ml-5">
                            {redirecting ?
                                <div className='loader_mini'></div>
                                :
                                'Login'
                            }
                        </button>
                        <button
                            onClick={handleDemoAccLogin}
                            className="bg-emerald-400 hover:bg-emerald-500 font-bold text-white text-sm py-3 px-8 border-poligon ml-5">
                            {redirecting ?
                                <div className='loader_mini'></div>
                                :
                                'Try Demo Account'
                            }
                        </button>
                    </div>
            }
        </div>
    )
}

export default Navbar