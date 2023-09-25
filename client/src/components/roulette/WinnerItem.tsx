import { useState, useEffect } from 'react'
import { CSgoWeaponSkin } from '../../models/csgoAssets-model'
import { SteamItemData } from '../../models/Typos'


interface props {
    item: CSgoWeaponSkin,
    wear: number
}

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

const WinnerItem = ({ item, wear }: props) => {

    const wearList = ["FN", "MW", "FT"]
    const [skinName, setSkinName] = useState<String[] | null>()

    useEffect(() => {
        setSkinName(item?.name.split(' '))
    }, [])




    return (
        <div className={`w-full left-0 absolute z-30 h-[250px] -top-3 md:top-3`}>


            <div className='h-full w-[200px] m-auto relative flex items-center justify-center  rounded-lg top-[6rem] box-shadow-yellow bg-[var(--graybase-700)] overflow-hidden'>
                <img src={item?.image} alt="" />
                <div className={`absolute w-full h-2 bottom-0 ${item?.rarity ? rarityCheck(item.rarity).bgColor : 'background-color_Mil-Spec_High_Grade'}`}></div>
                <div className={`absolute  w-full bottom-2 left-2`}>
                    <h1 className='text-[.8rem] text-zinc-400 font-bold'>{skinName ? skinName[0] : ''}</h1>
                    <h1 className='text-[1rem] text-zinc-200 font-bold'>{skinName ? skinName[skinName.length - 1] : ''}</h1>
                </div>
                <div className='absolute top-2 right-2 text-zinc-200 font-semibold'>
                    <h1>{wearList[wear]}</h1>
                </div>

            </div>
        </div>
    )
}

export default WinnerItem