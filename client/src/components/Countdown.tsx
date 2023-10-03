import  { useState, useEffect } from "react";

interface props {
    startDate: Date;
}

const Timer = ({ startDate }: props) => {
    const [time, setTime] = useState(new Date().getTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().getTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const divideTime = (time: number) => {
        const deltaTime = startDate.getTime() - time;
        const days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((deltaTime - (days * 1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((deltaTime - (days * 1000 * 60 * 60 * 24) - (hours * 1000 * 60 * 60)) / (1000 * 60));

        return { days, hours, minutes };
    };

    const renderDivs = () => {
        const { days, hours, minutes } = divideTime(time);

        return (
            <div className="md:flex flex-col justify-center items-center hidden">
                <h1 className="text-zinc-400 pb-1">EVENT ENDS IN</h1>
            <div 
            style={{
                background: "radial-gradient(circle farthest-corner at center center, #0C0317 75%, #5F189E 100%)"
            }}  
            className="hidden border-poligon-5 text-sm bg-violet-900 px-2 py-1 md:flex  ">
                <div className="flex flex-col  justify-center items-center pr-2 w-[70px]">
                    <h1 className="font-light  text-zinc-300">{days}</h1>
                    <h1 className="font-medium font-ligth text-zinc-400">DAYS</h1>
                </div>
                <div className="flex flex-col  justify-center items-center px-2 border-x border-[#ffffff49] w-[90px]">
                    <h1 className="font-light  text-zinc-300">{hours}</h1>
                    <h1 className="font-medium font-ligth text-zinc-400">HOURS</h1>
                </div>
                <div className="flex flex-col justify-center items-center pl-2 w-[70px]">
                    <h1 className="font-light  text-zinc-300">{minutes}</h1>
                    <h1  className="font-medium font-ligth text-zinc-400">MIN</h1>
                </div>
            </div>
            </div>
        );
    };

    return renderDivs();
};

export default Timer;