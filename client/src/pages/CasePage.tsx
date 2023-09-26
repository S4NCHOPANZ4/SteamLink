import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { CSgoWeaponCase, CSgoWeaponSkin } from '../models/csgoAssets-model'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Roulete from '../components/roulette/Roulete';
import RareItemImg from '../assets/rare_item.webp'
import '../components/roulette/styles.css'


const CasePage = () => {

  const { caseName } = useParams<{ caseName: string }>();
  const [caseData, setCaseData] = useState<CSgoWeaponCase | null>()
  const [fullList, setFullList] = useState<CSgoWeaponSkin[] | null>()
  const [fullListDisplay, setFullListDisplay] = useState<CSgoWeaponSkin[] | null>()
  const [loaded, setLoaded] = useState<boolean>(false)


  useEffect(() => {
    fetchDataNormalCase()
    
  }, [caseName])

  useEffect(() => {
    reCreateList()
  }, [caseData])

  const reCreateList = () => {

    const arr: CSgoWeaponSkin[] = []
    const arrDisplay: CSgoWeaponSkin[] = []
    caseData?.contains.map((item, i) => {
      let amount = rarityCheck(item.rarity)
      for (let i = 0; i < amount; i++) {
        arr.push(item);
        arrDisplay.push(item);
      }
    })
    if(caseData && caseData.contains_rare?.length > 0){
      for (let i = 0; i < caseData.contains_rare.length/2; i++) {
        arr.push(caseData.contains_rare[i]);
        arrDisplay.push({
          id: 'sdA98DB973KWL8XP1LZ94KJ',
          name: '★ Best Mistery Price ★',
          rarity: "Covert",
          paint_index: 'sdA98DB973KWL8XP1LZ94KJ',
          image: RareItemImg,
        })
      }

    }
    setFullListDisplay(arrDisplay)
    setFullList(arr)


  }
  const rarityCheck = (item: string) => {
    switch (item) {
      case "Consumer Grade":
        return 400
      case "Mil-Spec Grade":
        return 400
      case "Restricted":
        return 200
      case "Classified":
        return 125
      case "Covert":
        return 70
      default:
        return 4
    }
  }
  const rarityCheckColor = (item: string) => {
    switch (item) {

      case "Consumer Grade":
        return {
          bgColor: "background-color_Base_Grade",
          linearGradient: "background-lineargradient_Industrial_Grade",
          cardBd: "cardBg_Base_Grade"
        }

      case "Mil-Spec Grade":
        return {
          bgColor: "background-color_Mil-Spec_High_Grade",
          linearGradient: "background-lineargradient_Mil-Spec_High_Grade",
          cardBd: "cardBg_Mil-Spec_High_Grade"
        }
      case "Restricted":
        return {
          bgColor: "background-color_Restricted_Remarkable",
          linearGradient: "background-lineargradient_Restricted_Remarkable",
          cardBd: "cardBg_Restricted_Remarkable"

        }
      case "Classified":
        return {
          bgColor: "background-color_Classified_Exotic",
          linearGradient: "background-lineargradient_Classified_Exotic",
          cardBd: "cardBg_Classified_Exotic"

        }
      case "Covert":
        return {
          bgColor: "background-color_Covert_Extraordinary",
          linearGradient: "background-lineargradient_Covert_Extraordinary",
          cardBd: "cardBg_Covert_Extraordinary"

        }
      default:
        return {
          bgColor: "background-color_Mil-Spec_High_Grade",
          linearGradient: "background-lineargradient_Mil-Spec_High_Grade",
          cardBd: "cardBg_Mil-Spec_High_Grade"

        }
    }
  }
  const fetchDataNormalCase = async () => {
    if (caseName) {
      setLoaded(false)
      try {
        const response = await axios.post<{ success: boolean, data: CSgoWeaponCase }>('http://localhost:3001/assets/data/itemData',
          {
            item_id: caseName.replace(/ /g, "%20")
          });
        if (response.data.success) {
          setLoaded(true)
          setCaseData(response.data.data)
          console.log(response.data.data);
        }
        else { setCaseData(null) }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    }

  }
  const fetchDataAgentCase = async () => {
    if (caseName) {
      setLoaded(false)
      try {
        const response = await axios.post<{ success: boolean, data: CSgoWeaponCase }>('http://localhost:3001/assets/data/itemData',
          {
            item_id: caseName.replace(/ /g, "%20")
          });
        if (response.data.success) {
          setLoaded(true)
          setCaseData(response.data.data)
          console.log(response.data.data);
        }
        else { setCaseData(null) }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    }

  }
  function calculatePercentageForUniqueObjects(inputList: any[]): any[] {
    const uniqueObjects: Record<string, any> = {};
    const objectCounts: Record<string, number> = {};

    inputList.forEach(obj => {
        const id = obj.id;

        if (!uniqueObjects[id]) {
            uniqueObjects[id] = obj;
            uniqueObjects[id].percentage = 0;
        }

        if (!objectCounts[id]) {
            objectCounts[id] = 0;
        }

        objectCounts[id]++;
    });

    const totalObjects = inputList.length;
    for (const id in uniqueObjects) {
        if (uniqueObjects.hasOwnProperty(id)) {
          const percentage = (objectCounts[id] / totalObjects) * 100;
          uniqueObjects[id].percentage = parseFloat(percentage.toFixed(2))
        }
    }

    const outputList = Object.values(uniqueObjects);
    return outputList;
}


  return (
    <>
      <div>
        <Navbar />
      </div>

      {
        loaded ?

          fullList ?
            <Roulete
              type={caseData?.type}
              data={(fullList.length % 2 === 0) ? fullList.slice(0, -1) : fullList}

            /> :
            <div className='mt-10  max-w-[1300px] h-[200px] m-auto rounded-lg box-shadow-yellow flex items-center justify-center'>
              <div className='spiner_special_small' />
            </div>

          :
          <div className='mt-10  max-w-[1300px] h-[200px] m-auto rounded-lg box-shadow-yellow flex items-center justify-center'>
            <div className='spiner_special_small' />
          </div>
      }

      <div className='my-10   max-w-[1300px] m-auto  p-2 rounded-md'>
      <div className='mb-3 flex items-center justify-center'>
        <h1 className='text-zinc-300 text-2xl font-bold border-b-2 border-yellow-400'>CASE CONTENTS</h1>
      </div>
        <div className='grid gap-2 grid-cols-2 md:grid-cols-5 mt-2'>
          {fullListDisplay && calculatePercentageForUniqueObjects(fullListDisplay).map((data, i) => {
            return (
              <div key={i} className='h-[150px] overflow-hidden relative flex flex-col items-center justify-center bg-[var(--graybase-900)] border-2 border-zinc-500 rounded-lg'>
                <div className='absolute z-20 flex flex-col items-center justify-center'>
                  <img src={data.image} alt="" className='h-[90px]' />
                  <h1 className='text-zinc-400 text-center font-semibold mt-1 text-sm'>{data.name}</h1>
                </div>

                <div className='absolute right-3 top-2'>
                  <h1 className='text-zinc-300 text-center font-semibold mt-1 text-sm'>{data.percentage}%</h1>
                </div>
                <div className={`absolute h-full w-1 left-0 ${rarityCheckColor(data.rarity).bgColor}`}></div>
                <div
                  className={`absolute cardBg_Base_Grade cardBg_md z-10 ${rarityCheckColor(data.rarity).cardBd}`} />
              </div>)
          })}
        </div>
      </div>


    </>
  )
}

export default CasePage

