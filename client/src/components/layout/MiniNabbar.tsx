import { useEffect, useState } from 'react';


const MiniNabbar = () => {

    const [isFixed, setIsFixed] = useState(false);

    const handleClick = (units: number) => {
          const targetPosition = units; 
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollThreshold = 400;
            if (scrollY > scrollThreshold) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`bg-[var(--graybase-700)] font-semibold  box-shadow-pink rounded-full  w-[95%] md:w-[85%] m-auto mb-3 justify-between text-sm hidden sm:flex navbar ${isFixed ? 'fixed' : ''}  top-10 left-0 right-0 z-20  text-gray-300 hover:text-gray-200`}>
            <div onClick={() => handleClick(400)} className='w-[20%] text-center cursor-pointer hover:bg-[var(--graybase-600)] px-3   rounded-l-full  hover:border-purple-600'>
                <p className='flex items-center justify-center h-full w-full'>
                    CASES
                </p>
            </div>
            <div onClick={() => handleClick(1000)} className='w-[20%] text-center cursor-pointer hover:bg-[var(--graybase-600)] px-4 py-3 hover:border-purple-600'>
                <p className='flex items-center justify-center h-full w-full'>
                    PATCHES
                </p>
            </div>

            <div onClick={() => handleClick(1600)} className='w-[20%] text-center cursor-pointer hover:bg-[var(--graybase-600)] px-4 py-3  rounded-r-full  hover:border-purple-600'>
                <p className='flex items-center justify-center h-full w-full'>
                    GRAFFITIS
                </p>
            </div>
            <div onClick={() => handleClick(1800)} className='w-[20%] text-center cursor-pointer hover:bg-[var(--graybase-600)] px-4 py-3  hover:border-purple-600'>
                <p className='flex items-center justify-center h-full w-full'>
                    SOUVENIR CASES
                </p>
            </div>
        </div>
    )
}

export default MiniNabbar