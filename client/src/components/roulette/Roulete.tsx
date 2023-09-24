import  { useEffect, useState, useRef } from "react";
import { CSgoWeaponSkin } from "../../models/csgoAssets-model";
import { useSpring, animated} from '@react-spring/web';
import RouletteItem from "./RouletteItem";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"


interface props {
  data: CSgoWeaponSkin[];
}

const Roulete = ({ data }: props) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [clase, setClase] = useState<boolean>(false);
  const [dataList, setDataList] = useState<CSgoWeaponSkin[]>(data);
  const [offset, setOffset] = useState<number>(0)

  function shuffleArray(array: CSgoWeaponSkin[]) {
    setOffset((Math.random() * 201) - 100)
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  useEffect(() => {
    setDataList(shuffleArray(data));
  }, [data]);

  const containerWidth = divRef.current?.clientWidth || 0;
  const elementWidth = dataList.length * 190; // Ancho del elemento, ajusta según sea necesario
  const center = (containerWidth - elementWidth) / 2;

  const springProps = useSpring({
    left: clase ? center + offset : 0, // Centra horizontalmente utilizando "center"
    from: { left: 0 },
    config: { duration: 12000, easing: (t) => 1 - Math.pow(1 - t, 5) }, // Puedes ajustar la configuración de la animación según tus preferencias
  });

  return (
    <>
      <div className="mt-10 overflow-hidden rounded-lg max-w-[1300px] m-auto border border-yellow-500 relative" ref={divRef}>
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
          <FaAngleDown className="text-yellow-400"/>
          <FaAngleUp className="text-yellow-400"/>
        </div>
      </div>
      <button onClick={() => setClase(!clase)} className="bg-white">
        Toggle Animación
      </button>
    </>
  );
};

export default Roulete;
