import {useState} from "react"
import { useAppSelector } from "../../redux/store";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5"


const DemoDeposit = () => {
    const userData = useAppSelector((state) => state.user);
    const [addValue, setAddValue] = useState<number>(0)

    return (
        <div className=" w-full flex items-center justify-center flex-col ">
            <h1 className="text-emerald-400 font-bold text-xl mb-10">Demo Account</h1>
            <div className="w-full  flex flex-col justify-center items-center sm:mt-20 mt-5">
                <h1 className="text-zinc-300 font-semibold">Account Balance</h1>
                <h1 className="text-emerald-400 text-4xl sm:text-5xl font-bold">$ {userData.balance}</h1>
            </div>

            <div className="absolute bottom-10 flex flex-col items-center justify-center">
                <h1 className="text-zinc-500 text-sm mb-1">Amount to add</h1>
                <div className="flex items-center justify-center">
                    <button 
                    onClick={()=>{
                        if(addValue - 50 < 0){
                        setAddValue(0)
                        }
                        else{
                            setAddValue(addValue - 50)
                        }
                    }}
                    className="mr-2 p-2 bg-[#402c4d3e] hover:bg-[#402c4d66] rounded-full text-emerald-400 cursor-pointer">
                        <IoRemoveSharp size={25}/>
                    </button>
                    <input 
                    value={addValue}
                    type="text" className="bg-[#402c4d3e] text-center p-3 text-lg text-emerald-400
                    font-semibold border-poligon-5 focus:outline-none w-[200px] sm:w-auto"/>
                    <button 
                    onClick={()=>{setAddValue(addValue + 50)}}
                    className="ml-2 p-2 bg-[#402c4d3e] hover:bg-[#402c4d66] rounded-full text-emerald-400 cursor-pointer">
                        <IoAddSharp size={25}/>
                    </button>
                </div>
                <button className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-bold px-10 py-3 border-poligon">
                    UPDATE
                </button>

            </div>
        </div>
    )
}

export default DemoDeposit