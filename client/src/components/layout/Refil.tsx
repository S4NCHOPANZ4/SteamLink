import { IoClose } from "react-icons/io5"
import { AiOutlineCreditCard } from "react-icons/ai"
import { BiLogoBitcoin } from "react-icons/bi"
import { FaRobot, FaPaypal } from "react-icons/fa"
import { useState } from "react"
import DemoDeposit from "../deposit/DemoDeposit"
import { useAppSelector } from "../../redux/store"
import NotAvailable from "../deposit/NotAvailable"


interface props {
    open: boolean;
    setOpen: (value: boolean) => void;
}
const Refil = ({ open, setOpen }: props) => {

    const [selected, setSelected] = useState<number>(1)
    const userData = useAppSelector((state) => state.user);

    const itemName = `h-[50px] w-[150px] cursor-pointer flex
    justify-center items-center 
    border border-transparent bg-[var(--graybase-500)]
    transition-all duration-200 will-change-transform rounded-lg mx-1
    mt-2 sm:mt-0`

    const selectedStyle = {
        boxShadow: "rgba(135, 76, 161, 0.25) 0px 30px 60px -12px inset, rgba(199, 75, 244, 0.3) 0px 18px 36px -18px inset",
        border: "solid 1px rgba(135, 76, 161, 1)"
    }

    const getClass = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const childDiv = event.target as HTMLDivElement;
        if (childDiv && childDiv.tagName === 'DIV') {
            const childDivClass = Array.from(childDiv.classList)
            if (childDivClass.length > 0) {
                if (childDivClass[0] === "closer") {
                    setOpen(false)
                }
            }
        }
    }

    return (
        <div
            onClick={(e) => getClass(e)}
            className={`closer fixed h-full w-full bg-[#0000006f] z-50 ${open ? "block" : "hidden"}`}>
            <div
                style={{ transform: "translate(-50%, -50%)" }}
                className=" h-[90vh]  max-w-[650px] bg-[var(--graybase-600)] relative top-[50%] left-[50%] rounded-lg flex items-end justify-center overflow-hidden">
                <button
                    onClick={() => setOpen(false)}
                    className="top-6 right-5 absolute cursor-pointer">
                    <IoClose size={25} className="text-zinc-500 hover:text-emerald-400" />
                </button>
                <div className="top-6 left-5 absolute cursor-pointer">
                    <h1 className="text-zinc-300 font-semibold text-md">TOP UP BALANCE</h1>
                </div>
                <div className="bg-[var(--graybase-700)] w-full h-[90%] flex flex-col items-center ">
                    <div className="w-[90%] my-2 rounded-lg  flex justify-center">
                        <div className="flex flex-col sm:flex-row ">
                            <div
                                onClick={() => setSelected(1)}
                                style={selected === 1 ? selectedStyle : {}}
                                className={`${itemName} `}>
                                <FaRobot className="text-zinc-300" size={25} />
                                <h1 className="font-semibold text-zinc-300 mt-1 ml-1">Demo</h1>

                            </div>
                            <div
                                onClick={() => setSelected(2)}
                                style={selected === 2 ? selectedStyle : {}}
                                className={`${itemName} `}>
                                <AiOutlineCreditCard className="text-zinc-300" size={25} />

                                <h1 className="font-semibold text-zinc-300 mt-1 ml-1">Card</h1>

                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <div
                                onClick={() => setSelected(3)}
                                style={selected === 3 ? selectedStyle : {}}
                                className={`${itemName}`}>
                                <BiLogoBitcoin className="text-zinc-300" size={25} />
                                <h1 className="font-semibold text-zinc-300 mt-1 ml-1">Bitcoin</h1>
                            </div>
                            <div
                                onClick={() => setSelected(4)}
                                style={selected === 4 ? selectedStyle : {}}
                                className={`${itemName} `}>
                                <FaPaypal className="text-zinc-300" size={25} />
                                <h1 className="font-semibold text-zinc-300 mt-1 ml-1">PayPal</h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[90%]  rounded-lg  overflow-auto p-3 py-5 ">
                        {(selected == 1) &&
                            <DemoDeposit />
                        }
                        {(selected == 2) &&
                            ((userData.steamid && userData.steamid === '000000000') ?
                                <NotAvailable msg="OPTION NOT AVAILABLE ON DEMO ACCOUNT" />
                                :
                                <NotAvailable msg="OPTION NOT AVAILABLE ON THE MOMENT" />
                            )
                        }
                        {(selected == 3) &&
                            ((userData.steamid && userData.steamid === '000000000') ?
                                <NotAvailable msg="OPTION NOT AVAILABLE ON DEMO ACCOUNT" />
                                :
                                <NotAvailable msg="OPTION NOT AVAILABLE ON THE MOMENT" />
                            )
                        }
                        {(selected == 4) &&
                            ((userData.steamid && userData.steamid === '000000000') ?
                                <NotAvailable msg="OPTION NOT AVAILABLE ON DEMO ACCOUNT" />
                                :
                                <NotAvailable msg="OPTION NOT AVAILABLE ON THE MOMENT" />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Refil