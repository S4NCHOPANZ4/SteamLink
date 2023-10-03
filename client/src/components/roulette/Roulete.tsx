import { useEffect, useState, useRef } from "react";
import { AgentFixed, CSgoWeaponSkin } from "../../models/csgoAssets-model";
import { useSpring, animated } from '@react-spring/web';
import RouletteItem from "./RouletteItem";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import WinnerItem from "./WinnerItem";
import { MdSell } from "react-icons/md"
import { BsSaveFill } from "react-icons/bs"
import { SteamItemData, SteamUserData, UserProfileData } from "../../models/Typos";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setUser } from "../../redux/slice/user/userSlice";


interface props {
  data: CSgoWeaponSkin[] | AgentFixed[],
  type: string | undefined,
  caseName: string
}

const Roulete = ({ data, type, caseName }: props) => {

  const dispatch = useAppDispatch();


  const divRef = useRef<HTMLDivElement | null>(null);
  const userData = useAppSelector((state) => state.user);
  const [clase, setClase] = useState<boolean>(false);
  const [dataList, setDataList] = useState<CSgoWeaponSkin[] | AgentFixed[]>(data);
  const [offset, setOffset] = useState<number>(0)
  const [finished, setFinished] = useState<boolean>(false)
  const [rolling, setRolling] = useState<boolean>(false)
  const [itemValue, setItemValue] = useState<SteamItemData | null>()
  const [caseData, setCaseData] = useState<SteamItemData | null>()
  const [loadCaseData, setLoadCaseData] = useState<boolean>(false)
  const [skinWear, setSkinWear] = useState<number>(0)
  const [loadedSpecs, setLoadedSpecs] = useState<boolean>(false)
  const [itemAdded, setItemAdded] = useState<boolean>(false)
  const [selling, setSelling] = useState<boolean>(false)


  function shuffleArray(array: CSgoWeaponSkin[] | AgentFixed[]) {
    setOffset((Math.random() * 201) - 100)
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    setSkinWear(Math.floor(Math.random() * 3))
    return shuffledArray;
  }
  const FetchMarketData = async (itemName: string) => {
    setLoadedSpecs(false)
    try {
      const response = await axios.post<{ success: boolean, data: SteamItemData }>('http://localhost:3001/assets/data/getPrice', {
        item: itemName
      });
      if (response.data.success) {
        setLoadedSpecs(true)
        setItemValue(response.data.data)
        if (response.data.data.average_price === undefined || response.data.data.average_price === null) {
          AddItemToInventory(dataList[Math.floor(dataList.length / 2)], "5")

        } else {
          AddItemToInventory(dataList[Math.floor(dataList.length / 2)], response.data.data.average_price)
        }

      }
      else {
        setLoadedSpecs(true)
        setItemValue(null)
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };
  const FetchMarketCase = async (itemName: string) => {
    setLoadCaseData(false)
    try {
      const response = await axios.post<{ success: boolean, data: SteamItemData }>(`${import.meta.env.VITE_BACKEND_URL}/assets/data/getPrice`, {
        item: itemName
      });
      if (response.data.success) {
        setLoadCaseData(true)
        setCaseData(response.data.data)

      }
      else {
        setLoadCaseData(true)
        setCaseData(null)
      }
    } catch (error) {
      setCaseData(null)
      console.error('Error al obtener datos del usuario:', error);
    }
  };
  useEffect(() => {
    setDataList(shuffleArray(data));
  }, [data]);

  useEffect(() => {
    FetchMarketCase(caseName.replace(/ /g, "%20"))
  }, [caseName])

  useEffect(() => {
    if (!rolling && clase) {
      setFinished(true)
      FetchMarketData(getWeaponQuality().replace(/ /g, "%20"))

    }
  }, [rolling])

  const containerWidth = divRef.current?.clientWidth || 0;
  const elementWidth = dataList.length * 190;
  const center = (containerWidth - elementWidth) / 2;

  const springProps = useSpring({
    left: clase ? center + offset : 0, // Centra horizontalmente utilizando "center"
    from: { left: 0 },
    config: { duration: 8000, easing: (t) => 1 - Math.pow(1 - t, 7) },
    //  config: { duration: 1000 },
    onStart: () => {
      setRolling(true)
    },
    onRest: () => {
      setRolling(false)
    },
    immediate: !clase
  });

  const openNewCase = () => {
    if (rolling) {
      return
    }
    if(caseData?.average_price)RemoveFromBalance(caseData?.average_price)
    setClase(true)
  }

  const reOpenCase = () => {
    if (rolling) {
      return
    }
    setFinished(false)
    setClase(false)
    setDataList(shuffleArray(data));

    return
  }

  const getWeaponQuality = () => {

    const item = dataList[Math.floor(dataList.length / 2)]
    const wear = ["(Factory New)", "(Minimal Wear)", "(Field-Tested)"]

    switch (type) {
      case "Graffiti":
        return `Sticker | ${item.name}`
      case "Souvenir":
        return `${item.name} ${wear[skinWear]}`
      case "Music Kit Box":
        return `${item.name}`
      case "Patch Capsule":
        return `Patch | ${item.name}`
      case "Case":
        return `${item.name} ${wear[skinWear]}`
      default:
        return `${item.name}`
    }
  }

  const AddItemToInventory = async (item: CSgoWeaponSkin, value: string) => {
    setItemAdded(false)
    try {
      const response = await axios.post<{ success: boolean, user: UserProfileData }>(`${import.meta.env.VITE_BACKEND_URL}/user/addItem`, {
        steamId: userData.steamid,
        newItem: { ...item, value: value }
      });
      if (response.data.success) {
        setItemAdded(true)
        dispatch(setUser(response.data.user));
        return
      }
      else {
        setItemAdded(true)
        return
      }
    } catch (error) {
      setCaseData(null)
      console.error('Error al obtener datos del usuario:', error);
    }
  }

  const SellItem = async () => {
    if (selling) {
      return
    }
    setSelling(true)
    try {
      const response = await axios.post<{ success: boolean, user: UserProfileData }>(`${import.meta.env.VITE_BACKEND_URL}/user/sellLastAdded`, {
        steamId: userData.steamid,
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));

        setSelling(false)
        reOpenCase()
        return
      }
      else {
        setSelling(false)
        reOpenCase()
        return
      }
    } catch (error) {
      setCaseData(null)
      console.error('Error al obtener datos del usuario:', error);
      return
    }
  }
  const RemoveFromBalance = async (amount: string) =>{
    try {
      const response = await axios.post<{ success: boolean, user: UserProfileData }>(`${import.meta.env.VITE_BACKEND_URL}/user/removeFromBalance`, {
        steamId: userData.steamid,
        amount: amount
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        return
      }
      else {
        return
      }
    } catch (error) {
      setCaseData(null)
      console.error('Error al obtener datos del usuario:', error);
      return
    }
  }
  return (
    <>
      <div className="mt-10 max-w-[1300px] m-auto">
        {
          finished ?
            <WinnerItem wear={skinWear} item={dataList[Math.floor(dataList.length / 2)]} />
            :
            <></>
        }

        <div className=" overflow-hidden rounded-lg max-w-[1300px] m-auto box-shadow-yellow relative" ref={divRef}>

          {finished ?
            <div className="absolute z-20 w-full h-full bg-[#00000077]"></div>
            :
            <></>
          }
          <div className="h-[200px] max-w-[900px] rounded-lg relative">
            <animated.div
              style={{
                position: 'absolute',
                width: `${elementWidth}px`, // Ancho basado en el número de elementos
                height: '100%',
                ...springProps,
              }}
              className="flex h-full left-0 absolute"
            >
              {dataList.map((item, i: number) => (
                <RouletteItem
                  item={item}
                  key={i}
                  center={Math.floor(dataList.length / 2) === i}
                />
              ))}
            </animated.div>
          </div>
          <div className="absolute flex flex-col justify-between items-center h-full w-1  left-[50%] top-0">
            <FaAngleDown className="text-yellow-400" />
            <FaAngleUp className="text-yellow-400" />
          </div>
        </div>
      </div>
      {finished ?
        <div className="mt-20 max-w-[1300px] m-auto flex sm:flex-row  flex-col items-center justify-center">
          <button
            className="relative sm:mr-2 mb-2 sm:mb-0 background-lineargradient-blue flex items-center text-sm justify-center py-2 rounded-md font-semibold text-white min-w-[200px] border-2 border-indigo-400"
            onClick={() => setClase(true)} >
            {loadedSpecs ?
              <>
                {itemAdded ?
                  <div
                    onClick={() => { SellItem() }}
                    className="flex items-center justify-center">
                    {
                      selling ?
                        <div className="h-5 flex items-center justify-center">
                          <div className="loader-dot" />
                        </div> :
                        <>
                          <MdSell color="white" className="mr-2 text-sm" />
                          {(itemValue?.average_price === undefined || itemValue?.average_price === null) ? "Sell for $5.00" : `Sell for ${itemValue?.average_price}`}
                        </>
                    }

                  </div> :
                  <div className="h-5 flex items-center justify-center">
                    <div className="loader-dot" />
                  </div>
                }

              </>
              :
              <div className="h-5 flex items-center justify-center">
                <div className="loader-dot" />
              </div>

            }

          </button>
          <button
            className={`text-sm py-2 rounded-md font-semibold text-white min-w-[200px] border-2  ${rolling ? "background-lineargradient-gray border-zinc-400" : "background-lineargradient-green border-green-400"}`}
            onClick={() => { reOpenCase() }} >
            {
              rolling ?
                <div className="h-6 flex items-center justify-center">
                  <div className="dot-loader" />
                </div>
                :
                itemAdded ?
                  <div className="flex items-center justify-center">
                    <BsSaveFill color="white" className="mr-2" size={20} />
                    Keep
                  </div>

                  :
                  <div className="h-6 flex items-center justify-center">
                    <div className="dot-loader" />
                  </div>
            }
          </button>
        </div>
        :
        <div className="mt-20 max-w-[1300px] m-auto flex items-center justify-center">
          <button
            className={` py-2 rounded-md font-semibold text-white min-w-[200px] border-2  ${rolling ? "background-lineargradient-gray border-zinc-400" : "background-lineargradient-green border-green-400"}`}
            onClick={() => openNewCase()} >
            {
              rolling ?
                <div className="h-6 flex items-center justify-center">
                  <div className="dot-loader" />
                </div>
                :
                loadCaseData ?
                  `Open for $${caseData?.average_price ? caseData?.average_price : 10}`
                  :
                  <div className="h-5 flex items-center justify-center">
                    <div className="loader-dot" />
                  </div>
            }
          </button>
        </div>
        // 
      }

    </>
  );
};

export default Roulete;
