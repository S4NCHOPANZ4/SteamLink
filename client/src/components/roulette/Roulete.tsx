import { useEffect, useState, useRef } from "react";
import { CSgoWeaponSkin } from "../../models/csgoAssets-model";
import { useSpring, animated } from '@react-spring/web';
import RouletteItem from "./RouletteItem";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import WinnerItem from "./WinnerItem";
import { MdSell, MdRestartAlt } from "react-icons/md"
import { SteamItemData } from "../../models/Typos";
import axios from "axios";


interface props {
  data: CSgoWeaponSkin[],
  type: string | undefined,
}

const Roulete = ({ data, type }: props) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [clase, setClase] = useState<boolean>(false);
  const [dataList, setDataList] = useState<CSgoWeaponSkin[]>(data);
  const [offset, setOffset] = useState<number>(0)
  const [finished, setFinished] = useState<boolean>(false)
  const [rolling, setRolling] = useState<boolean>(false)
  const [itemValue, setItemValue] = useState<SteamItemData | null>()
  const [skinWear, setSkinWear] = useState<number>(0)
  const [loadedSpecs, setLoadedSpecs] = useState<boolean>(false)


  function shuffleArray(array: CSgoWeaponSkin[]) {
    setOffset((Math.random() * 201) - 100)
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    setSkinWear(Math.floor(Math.random() * 3))
    return shuffledArray;
  }
  const FetchMarketData = async () => {
    setLoadedSpecs(false)
    try {
      const response = await axios.post<{ success: boolean, data: SteamItemData }>('http://localhost:3001/assets/data/getPrice', {
        item: getWeaponQuality().replace(/ /g, "%20")
      });
      if (response.data.success) {
        setLoadedSpecs(true)
        setItemValue(response.data.data)
      }
      else {
        setLoadedSpecs(true)
        setItemValue(null)
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };
  useEffect(() => {
    setDataList(shuffleArray(data));

  }, [data]);

  useEffect(() => {
    if (!rolling && clase) {
      setFinished(true)
      FetchMarketData()
    }
  }, [rolling])

  const containerWidth = divRef.current?.clientWidth || 0;
  const elementWidth = dataList.length * 190;
  const center = (containerWidth - elementWidth) / 2;

  const springProps = useSpring({
    left: clase ? center + offset : 0, // Centra horizontalmente utilizando "center"
    from: { left: 0 },
    config: { duration: 9500, easing: (t) => 1 - Math.pow(1 - t, 7) },
    //  config: { duration: 1000 },
    onStart: () => {
      setRolling(true)
    },
    onRest: () => {
      setRolling(false)
      console.log(dataList[Math.floor(dataList.length / 2)]);
    },
    immediate: !clase
  });

  const openNewCase = () => {
    if (rolling) {
      return
    }
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
            className="relative sm:mr-2 mb-2 sm:mb-0 background-lineargradient-blue flex items-center justify-center py-2 rounded-md font-semibold text-white min-w-[200px] border-2 border-indigo-400"
            onClick={() => setClase(true)} >
            {loadedSpecs ?
              <>
                <MdSell color="white" className="mr-2" />
                Sell for ${itemValue?.average_price}
              </>
              :
              <div className="h-6 flex items-center justify-center">
                <div className="loader-dot"/>
              </div>

            }

          </button>
          <button
            className={` py-2 rounded-md font-semibold text-white min-w-[200px] border-2  ${rolling ? "background-lineargradient-gray border-zinc-400" : "background-lineargradient-green border-green-400"}`}
            onClick={() => { reOpenCase() }} >
            {
              rolling ?
                <div className="h-6 flex items-center justify-center">
                  <div className="dot-loader" />
                </div>
                :
                <div className="flex items-center justify-center">
                  <MdRestartAlt color="white" className="mr-1" size={20} />
                  re Open

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
                "Open for $4"
            }
          </button>
        </div>

      }

    </>
  );
};

export default Roulete;
