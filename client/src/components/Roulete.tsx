import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { CSgoWeaponSkin } from "../models/csgoAssets-model";

interface props {
  data: CSgoWeaponSkin[];
}

const Roulete = ({ data }: props) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const [clase, setClase] = useState<boolean>(false);
  const [dataa, setData] = useState<CSgoWeaponSkin[]>(data);

  function shuffleArray(array: CSgoWeaponSkin[]) {

    const shuffledArray = [...array];


    
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  useEffect(() => {

      setData(shuffleArray(data));


  }, []);

  useEffect(() => {
    if (divRef.current) {
      const width = divRef.current.offsetWidth;
      console.log(width / 2);

      // Añadimos lógica para calcular el valor de x en la transformación CSS
      const translateX = `translate(-50%, 0)`;

      setAnchoDelDiv(width / 2);
      setTransform(translateX); // Usamos setTransform para actualizar la transformación
    }
  }, []);

  const [anchoDelDiv, setAnchoDelDiv] = useState<number | null>(null);
  const [transform, setTransform] = useState<string>(""); // Estado para la transformación CSS

  const spin = () => {
    // Tu lógica para girar la ruleta aquí
  };
  // data={(caseData.contains.length % 2 === 0)? caseData.contains : caseData.contains.slice(0, -1)}

  return (
    <>
      <div className="bg-green-500 h-[100px] w-[600px] m-auto  overflow-hidden relative">
        <div
          ref={divRef}
          style={clase ? { transform: transform,
          transition: "all 1000ms ease-out",
          left: "50%"
          } : {}}
          className={`h-full flex  left-0 absolute `}
        >
          {dataa.map((item, i: number) => {
            return (
              <img
                className={`h-full w-[120px] ${
                  i === Math.floor(dataa.length / 2)
                    ? "bg-red-700"
                    : "bg-gray-50"
                }`}
                src={item.image}
                alt=""
                key={i}
              />
            );
          })}
        </div>
      </div>
      <button onClick={() => setClase(!clase)} className="bg-white">
        dasddas
      </button>
    </>
  );
};

export default Roulete;
