import { useEffect, useState } from "react"
import { InventoryItem, UserProfileData } from "../../models/Typos"
import { MdSell } from "react-icons/md"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { setUser } from "../../redux/slice/user/userSlice"

interface props {
    item: InventoryItem,
    i: number,
}

const InventoyItem = ({ item, i }: props) => {

    const userData = useAppSelector((state) => state.user);
    const [skinName, setSkinName] = useState<String[] | null>()
    const [rarity, setRarity] = useState<{ bgColor: string, linearGradient: string } | null>()
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        
        if (item.name) {
            setSkinName(item?.name.split('|'))
        }
        if (item.rarity) {
            setRarity(rarityCheck(item?.rarity))
        }

    }, [])

    const rarityCheck = (item: string) => {
        switch (item) {

            case "Consumer Grade":
                return {
                    bgColor: "background-color_Base_Grade",
                    linearGradient: "background-lineargradient_Industrial_Grade"
                }

            case "Mil-Spec Grade":
                return {
                    bgColor: "background-color_Mil-Spec_High_Grade",
                    linearGradient: "background-lineargradient_Mil-Spec_High_Grade"
                }
            case "Restricted":
                return {
                    bgColor: "background-color_Restricted_Remarkable",
                    linearGradient: "background-lineargradient_Restricted_Remarkable"
                }
            case "Classified":
                return {
                    bgColor: "background-color_Classified_Exotic",
                    linearGradient: "background-lineargradient_Classified_Exotic"
                }
            case "Covert":
                return {
                    bgColor: "background-color_Covert_Extraordinary",
                    linearGradient: "background-lineargradient_Covert_Extraordinary"
                }
            default:
                return {
                    bgColor: "background-color_Mil-Spec_High_Grade",
                    linearGradient: "background-lineargradient_Mil-Spec_High_Grade"
                }
        }
    }
    const sellItem = async () => {
        setLoading(true)
        try {
            const response = await axios.post<{ success: boolean, user: UserProfileData }>(`${import.meta.env.VITE_BACKEND_URL}/user/sellItem`, {
                steamId: userData.steamid,
                itemId: item._id
            });
            if (response.data.success) {
                dispatch(setUser(response.data.user));
                setLoading(false)
                return
            }
            else {
                setLoading(false)
                return
            }
        } catch (error) {
            setLoading(false)

            console.error('Error al obtener datos del usuario:', error);
            return
        }
    }

    return (
        <div
            key={i}
            style={{
                borderTop: "1px solid" + rarity?.bgColor
            }}
            className={`h-[230px] md:h-[260px] cursor-pointer relative p-3 rounded-md 
            transform flex flex-col justify-center items-center bg-[var(--graybase-600)] m-1 overflow-hidden `}
            >
            {loading &&
                <div className="z-50 w-full h-full bg-[#0000004c] flex items-center justify-center absolute">
                    <div className="loader_mini" />
                </div>
            }

            <div className={`absolute top-0 h-[4px] w-full ${rarity?.bgColor} opacity-70`}></div>
            <img src={item.image} className="w-[170px]" alt="item img" />
            <h1 className='text-teal-400 text-sm font-semibold w-20 border-poligon bg-[#481c8145] px-2 py-1 text-center '>
                {item.value}
            </h1>
            <div className="mt-3">
                <h1 className="text-center text-zinc-400 text-[.7rem] lg:text-sm">{skinName && skinName[0]}</h1>
                <h1 className="text-center text-zinc-100 font-bold text-[.9rem] lg:text-md">{skinName && skinName[1]}</h1>
            </div>
            <div className="h-full w-full absolute transition-all duration-200
            will-change-transform opacity-0 hover:opacity-100 bg-[#00000017] z-20 top-0 left-0">

                <div
                    onClick={() => sellItem()}
                    className="absolute bottom-0 left-0 w-full bg-[var(--graybase-700)] h-[50px] flex items-center justify-center">
                    <MdSell size={20} color="white" />
                    <h1 className="text-zinc-100 font-semibold ml-2 text-sm">Sell for {item.value}</h1>
                </div>
            </div>
        </div>
    )
}

export default InventoyItem