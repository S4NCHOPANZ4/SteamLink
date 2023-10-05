import  { useEffect, useState } from 'react'
import { AgentFixed, CSgoWeaponSkin } from '../../models/csgoAssets-model'


interface props {
  item: CSgoWeaponSkin | AgentFixed,
  center: boolean
}

const RouletteItem = ({ item, center }: props) => {

  const [bgColor, setBgColor] = useState<null | {
    linearGradient: string,
    bgColor: string
  }>()

  const [skinName, setSkinName] = useState<String[] | null>()
  
  const [loadedImg, setLoadedImg] = useState(false);

  useEffect(() => {
    setBgColor(rarityCheck(item?.rarity? item?.rarity: 's'))
    if(item){
      setSkinName( item?.name.split('|'))
    }else{
      return
    }
  }, [item])


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

  const handleImageLoad = () => {
    setLoadedImg(true);
  };

  return (
    <div  className={`${bgColor?.linearGradient} relative w-[190px] h-full flex items-center justify-center  mx-[.09rem] `}>
      <img
        onLoad={handleImageLoad}
        className={`h-[55%] ${center ? "" : ""} ${loadedImg ? '' : 'hidden'}`}
        src={item?  item.image: ""}
        alt="item-img"
      />
        {!loadedImg && (
          <div className={`h-[90px] w-[30px] bg-transparent`}></div>
        )}
      <div className={`absolute  w-full bottom-1 left-1`}>
        <h1 className='text-[.7rem] text-zinc-400 font-bold '>{skinName ? skinName[0] : ''}</h1>
        <h1 className='text-[.9rem] text-zinc-200 font-bold'>{skinName ? skinName[skinName.length - 1] : ''}</h1>
      </div>
    </div>
  )
}

export default RouletteItem