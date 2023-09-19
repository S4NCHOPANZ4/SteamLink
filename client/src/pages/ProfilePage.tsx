import { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Inventory from '../components/Inventory'

import axios from 'axios';
import { useAppSelector } from '../redux/store';
import { CSgoWeaponCase } from '../models/csgoAssets-model';

const ProfilePage = () => {
    const userData = useAppSelector((state) => state.user);
    
    const [caseData, setCaseData] = useState<CSgoWeaponCase[] | null>()

    useEffect(()=>{
            FetchUserInventory()
    },[])

    useEffect(()=>{
      console.log(caseData);
      
    },[caseData])

    const FetchUserInventory = async() =>{
        try {
            const response = await axios.get<{success: boolean, data: CSgoWeaponCase[]}>('http://localhost:3001/assets/data/cases');
            
            console.log(response.data);
            if(response.data.success){
              setCaseData(response.data.data)

            }
            else{
              setCaseData(null)

            }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      };
      


  return (
    <>
        <Navbar/>
        <Inventory/>
        <div className='h-[350px] overflow-auto'>

        <div className='grid gap-6 grid-cols-2 md:grid-cols-5'>
          {
            caseData?  caseData.map((data, i)=>{
              return(
                <div key={i} className='bg-gray-700 cursor-pointer relative   transform flex justify-center items-center transition-all duration-200 will-change-transform hover:-translate-y-0.5 '>
                  <img src={data.image} alt="" />
                </div>
              )
            })
            :
            <></>
          }
        </div>
        </div>


    </>
  )
}

export default ProfilePage