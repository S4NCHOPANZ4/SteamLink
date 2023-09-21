import  { useEffect, useState } from 'react';


const MiniNabbar = () => {

    const [isFixed, setIsFixed] = useState(false);


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
        <div className={`bg-[var(--graybase-700)] rounded-full p-4 w-[95%] md:w-[85%] m-auto mb-3 justify-between text-sm md:text-md hidden sm:flex navbar ${isFixed ? 'fixed' : ''}  top-10 left-0 right-0 z-20`}>
            <div className='w-[19%] md:w-[12%] text-center cursor-pointer bg-[var(--graybase-900)] px-3 py-1 text-purple-500 font-ligth rounded-full border border-purple-500 hover:text-purple-600 hover:border-purple-600'>
                <p className='flex items-center justify-center h-full w-full'>
                    CASES
                </p>
            </div>
            <div className='w-[19%] md:w-[12%] text-center cursor-pointer bg-[var(--graybase-900)] px-4 py-1 text-purple-500 font-ligth rounded-full border border-purple-500 hover:text-purple-600 hover:border-purple-600'>
                <p className='flex items-center justify-center h-full w-full'>
                    PATCHES
                </p>
            </div>
            <div className='w-[19%] md:w-[12%] text-center cursor-pointer bg-[var(--graybase-900)] px-4 py-1 text-purple-500 font-ligth rounded-full border border-purple-500 hover:text-purple-600 hover:border-purple-600'>
                <p className='flex items-center justify-center h-full w-full'>
                    MUSIC KITS
                </p>
            </div>
            <div className='w-[19%] md:w-[12%] text-center cursor-pointer bg-[var(--graybase-900)] px-4 py-1 text-purple-500 font-ligth rounded-full border border-purple-500 hover:text-purple-600 hover:border-purple-600'>
                <p className='flex items-center justify-center h-full w-full'>
                    SOUVENIR CASES
                </p>
            </div>
            <div className='w-[19%] md:w-[12%] text-center cursor-pointer bg-[var(--graybase-900)] px-4 py-1 text-purple-500 font-ligth rounded-full border border-purple-500 hover:text-purple-600 hover:border-purple-600'>
                <p className='flex items-center justify-center h-full w-full'>
                    GRAFFITIS
                </p>
            </div>
        </div>
    )
}

export default MiniNabbar