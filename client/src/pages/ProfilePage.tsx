import Navbar from '../components/layout/Navbar'
import Inventory from '../components/inventory/Inventory'
import { useAppSelector } from '../redux/store';
import bgAk47 from '../assets/akbg.png'
import { useState } from 'react';
import Refil from '../components/layout/Refil';

const ProfilePage = () => {
  const userData = useAppSelector((state) => state.user);
  const [openDeposit, setOpenDeposit] = useState<boolean>(false)



  return (
    <>
          <div>
        <Refil open={openDeposit} setOpen={setOpenDeposit}/>
      </div>
      <div>
        <Navbar />
      </div>

      <div
      className='relative mb-5'
      >
        <div style={{ backgroundImage: `url(${bgAk47})`, opacity: .07}} className='absolute h-full w-full -z-0 background-color-black-white'></div>
        <div  className='absolute h-full w-full -z-10 background-lineargradient-blue'></div>
        <div
          className='p-10  max-w-[1300px]  m-auto rounded-lg  flex items-center justify-center flex-col'>
          <div
            className='z-30 mt-10 flex justify-center sm:justify-start items-center sm:items-start w-full sm:flex-row flex-col'>
            <img className='rounded-full h-[160px] w-[160px] border-2 border-zinc-400 p-1' src={userData.avatarfull} alt="ProfileImg" />
            <div className='flex flex-col items-start justify-center ml-3'>
              <h1 className='text-zinc-200 font-medium text-2xl mb-10'>{userData.username}</h1>
              <div className='flex items-center justify-center'>
                <h1 className='text-emerald-400 font-bold text-2xl'>${userData.balance}</h1>
                <button 
                onClick={() => setOpenDeposit(true)}
                className='bg-emerald-400 hover:bg-emerald-500 font-bold text-white w-[100px] text-sm py-2 px-3 border-poligon ml-5'>REFIL</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Inventory />
    </>
  )
}

export default ProfilePage