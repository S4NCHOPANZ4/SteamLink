import { useEffect, useState, useRef } from 'react'
import { CSGOCapsulesPack, CSGOMusicKitBox, CSgoWeaponCase } from '../../models/csgoAssets-model';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SteamItemData } from '../../models/Typos';

interface props {
    data: CSgoWeaponCase | CSGOCapsulesPack | CSGOMusicKitBox;
  }

const Cases = ({data}: props) => {

    const [itemData, setItemData] = useState<SteamItemData | null>()
    const containerRef = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const observerOptions = {
          root: null, // El viewport se utiliza como contenedor, puedes ajustarlo si lo deseas
          rootMargin: '0px',
          threshold: 0.5, // Cuando al menos la mitad del componente esté en el viewport
        };
    
        const observerCallback: IntersectionObserverCallback = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              FetchMarketData();
              // Deja de observar una vez que se ha cargado la información (puedes ajustar esto según tus necesidades)
              observer.unobserve(entry.target);
            }
          });
        };
    
        const observer = new IntersectionObserver(observerCallback, observerOptions);
    
        if (containerRef.current) {
          observer.observe(containerRef.current);
        }
    
        // Limpia el observer cuando el componente se desmonta
        return () => {
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        };
      }, []);

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
    onClick={() => {
      navigate(`/case/${data.id}`)
    }}
    ref={containerRef}
    className='bg-[var(--graybase-400)] h-[310px] md:h-[260px] cursor-pointer relative p-3 rounded-md transform flex flex-col justify-center items-center transition-all duration-200 will-change-transform hover:-translate-y-0.5  border border-solid hover:border-yellow-400 border-transparent'>
        <img className='max-h-[120px]' src={data.image} alt="" />

        <div 
        style={(itemData?.average_price)?  {display: 'none'} : {}}
        
        className="absolute bg-[#000000b8] z-20 h-full w-full rounded-md flex justify-center items-center">
            <div className='text-yellow-500 font-bold loader_mini'></div>
        </div>
        <div className='flex  w-full mt-3'>
            <h1 className='text-md text-gray-300 font-bold'>{data.name}</h1>
        </div>
        <div className='flex justify-between w-full mt-1'>
            <h1 className='text-gray-300 text-sm font-semibold'>USD$ {itemData?.average_price}</h1>
        </div>

    </div>
  )
}

export default Cases