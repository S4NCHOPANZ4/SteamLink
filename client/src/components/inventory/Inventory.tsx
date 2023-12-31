import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import InventoyItem from "./InventoyItem";
import { useEffect, useState } from "react";
import { InventoryItem } from "../../models/Typos";

const Inventory = () => {

  const navigate = useNavigate()
  const userData = useAppSelector((state) => state.user);
  const [itemList, setItemList] = useState<InventoryItem[] | null>()

  useEffect(() =>{
   if(userData.Inventory)setItemList([...userData.Inventory].reverse())
  },[userData])

  return (
    <>

      <div className=' max-w-[1300px]  m-auto rounded-lg  flex-col p-4'>
        <div className=" w-full">
          {
            userData.Inventory != undefined && (userData.Inventory?.length > 0) ?
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 h-full w-full min-h-[20rem] ">
                {
                  itemList?.map((item, i: number) => {
                    return (
                      <InventoyItem item={item} i={i}/>
                    )
                  })
                }
              </div>
              :
              <div className="flex items-center justify-center flex-col min-h-[20rem] w-full ">
                <h1 className="text-zinc-300 mb-2 font-semibold text-xl">No items found</h1>
                <button
                onClick={()=> {navigate('/')}}
                className="bg-violet-600 hover:bg-violet-700 font-semibold text-white text-sm py-2 px-6 border-poligon">Open Cases</button>
              </div>
          }

        </div>
      </div>

    </>
  )
}

export default Inventory