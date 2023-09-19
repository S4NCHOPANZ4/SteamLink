import React, { useEffect, useState } from 'react'
import { CSgoWeaponCase } from '../../models/csgoAssets-model';
import axios from 'axios';
import { SteamItemData } from '../../models/Typos';

interface props {
    data: CSgoWeaponCase;
  }

const Cases = ({data}: props) => {

    const [itemData, setItemData] = useState<SteamItemData | null>()

    useEffect(()=>{
        FetchMarketData()
    },[])



    const FetchMarketData = async () => {
        try {
            const response = await axios.post<{ success: boolean, data: SteamItemData }>('http://localhost:3001/assets/data/getPrice',{
                item : data.name.replace(/ /g, "%20")
            });
            if (response.data.success) {
                setItemData(response.data.data)
            }
            else {
                setItemData(null)
            }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    };

    return (
    <div 

    className='bg-[var(--graybase-400)]  cursor-pointer relative p-3 rounded-md transform flex justify-center items-center transition-all duration-200 will-change-transform hover:-translate-y-0.5  border border-solid hover:border-yellow-400 border-transparent'>
        <img src={data.image} alt="" />
        <div className='absolute top-2 right-2'>
            <h1 className='text-sm md:text-md bg-black text-yellow-500 font-bold px-2 py-1 rounded-md'>{itemData?.average_price} USD</h1>
        </div>
        <div 
        style={(itemData?.average_price)?  {display: 'none'} : {}}
        
        className="absolute bg-[#000000b8] z-20 h-full w-full rounded-md flex justify-center items-center">
            <h1 className='text-yellow-500 font-bold'>Not Available</h1>
        </div>
    </div>
  )
}

export default Cases