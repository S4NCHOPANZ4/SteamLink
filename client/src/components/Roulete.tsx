import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { CSgoWeaponSkin } from "../models/csgoAssets-model";

interface props {
  data: CSgoWeaponSkin[];
}

const Roulete = ({ data }: props) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const [clase, setClase] = useState<boolean>(false);
  const [dataList, setData] = useState<CSgoWeaponSkin[]>(data);

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


  // data={(caseData.contains.length % 2 === 0)? caseData.contains : caseData.contains.slice(0, -1)}

  return (
    <>
      <div className="bg-green-500 h-[100px] max-w-[600px] m-auto overflow-hidden relative">
        <div 
        style={
          clase?
          {
            transform: "translate(-50%, 0)",
            transition: "all 1000ms ease-out",
            left: "50%",
            width: `${(dataList.length+1) * 100}px`, 
          }
          :
          {}
        }
        className="flex  h-full absolute bg-orange-400 ">
          {dataList.map((item, i: number) => {
            return (

              <img
                className={`h-full w-[100px]  ${
                  i === Math.floor(dataList.length / 2)
                    ? "bg-red-700"
                    : "bg-gray-50"
                }`}
                src={item.image}
                alt="asd"
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
