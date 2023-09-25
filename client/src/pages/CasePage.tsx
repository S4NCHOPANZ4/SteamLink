import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { CSgoWeaponCase, CSgoWeaponSkin } from '../models/csgoAssets-model'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Roulete from '../components/roulette/Roulete';
import '../components/roulette/styles.css'


const CasePage = () => {

  const { caseName } = useParams<{ caseName: string }>();
  const [caseData, setCaseData] = useState<CSgoWeaponCase | null>()
  const [fullList, setFullList] = useState<CSgoWeaponSkin[] | null>()
  const [loaded, setLoaded] = useState<boolean>(false)


  useEffect(() => {
    fetchData()
  }, [caseName])

  useEffect(() => {
    reCreateList()
  }, [caseData])

  const reCreateList = () => {

    const arr: CSgoWeaponSkin[] = []

    caseData?.contains.map((item, i) => {
      let amount = rarityCheck(item.rarity)
      for (let i = 0; i < amount; i++) {
        arr.push(item);
      }
    })
    if (caseData && caseData.contains_rare.length > 0) {
      arr.push(caseData.contains_rare[Math.floor(Math.random() * caseData.contains_rare.length - 1)])
      arr.push(caseData.contains_rare[Math.floor(Math.random() * caseData.contains_rare.length - 1)])

    }
    setFullList(arr)


  }
  const rarityCheck = (item: string) => {
    switch (item) {
      case "Consumer Grade":
        return 50
      case "Mil-Spec Grade":
        return 20
      case "Restricted":
        return 10
      case "Classified":
        return 5
      case "Covert":
        return 3
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


  const fetchData = async () => {
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
        <h1 className='text-zinc-300 text-2xl font-bold border-b-2 border-yellow-400'>CASES CONTENTS</h1>
      </div>
        <div className='grid gap-2 grid-cols-2 md:grid-cols-5 mt-2'>
          {caseData && caseData.contains.map((data, i) => {
            return (
              <div key={i} className='h-[150px] overflow-hidden relative flex flex-col items-center justify-center bg-[var(--graybase-900)] border-2 border-zinc-500 rounded-lg'>
                <div className='absolute z-20 flex flex-col items-center justify-center'>
                  <img src={data.image} alt="" className='h-[90px]' />
                  <h1 className='text-zinc-400 text-center font-semibold mt-1 text-sm'>{data.name}</h1>
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

// [   {id: 'skin-852832', name: 'Galil AR | Blue Titanium', rarity: 'Mil-Spec Grade', paint_index: '216', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.4264e8ec1cedb3bce31a89c934c630bd56d480c1.png'},
// {id: 'skin-197500', name: 'Five-SeveN | Nightshade', rarity: 'Mil-Spec Grade', paint_index: '223', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.4f94edf6ac032c15fedafa6ba1f2425a4ca8bded.png'},
// {id: 'skin-1704832', name: 'PP-Bizon | Water Sigil', rarity: 'Mil-Spec Grade', paint_index: '224', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.c4d0aad9cb87870f84f3709ff3b8ecc9fe489d89.png'},
// {id: 'skin-2294660', name: 'Nova | Ghost Camo', rarity: 'Mil-Spec Grade', paint_index: '225', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.d63e06a38ef396a945defd7c1ad9da9ba79fe60d.png'},
// {id: 'skin-721812', name: 'G3SG1 | Azure Zebra', rarity: 'Mil-Spec Grade', paint_index: '229', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.42199f9c4c0bd1ff9f569d6e7348c5cedf4630f5.png'},{id: 'skin-2360216', name: 'P250 | Steel Disruption', rarity: 'Mil-Spec Grade', paint_index: '230', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.36220b384099ed61c2b9ba64af899b892e4a4c58.png'} ,{id: 'skin-459656', name: 'AK-47 | Blue Laminate', rarity: 'Restricted', paint_index: '226', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.9f8ec5103efa5b7a0b3919a13b4de78e1bd612a0.png'}
// ,{id: 'skin-1246096', name: 'P90 | Blind Spot', rarity: 'Restricted', paint_index: '228', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.a702b8feaf0e2568e60efb2ab722819b0521ea4b.png'},
// {id: 'skin-655976', name: 'FAMAS | Afterimage', rarity: 'Classified', paint_index: '154', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.5d45539735d838ffefd26467a8c767b71807c785.png'},
// {id: 'skin-590732', name: 'AWP | Electric Hive', rarity: 'Classified', paint_index: '227', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.2189958e2afa2c69cfcdd807124c279a0e645625.png'}
// ,{id: 'skin-66460', name: 'Desert Eagle | Cobalt Disruption', rarity: 'Classified', paint_index: '231', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/eco…arge.a486db3160bcdcf6bc5a1d8179c450b02f620151.png'},
//        ] 