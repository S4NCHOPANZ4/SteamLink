import { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import { CSGOCapsulesPack, CSGOMusicKitBox, CSgoWeaponCase, GraffitiBox } from '../models/csgoAssets-model';


import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Cases from './cases/Cases';

interface props {
  dataCases?: CSgoWeaponCase[] | CSGOCapsulesPack[] | CSGOMusicKitBox[] | GraffitiBox[];
}
const breakpoints = {
  540: {
    slidesPerView: 2.3,
    spaceBetween: 10,
  },
  720: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  1324: {
    slidesPerView: 3.5,
    spaceBetween: 10,
  },
};

const DisplayCases = ({ dataCases }: props) => {
  return (
    <div className='box-shadow-yellow w-[90%] md:w-[85%] m-auto p-3 bg-[var(--graybase-500)] rounded-md'>
      <Swiper
        breakpoints={breakpoints}

        pagination={{
          type: 'progressbar',
        }}
        modules={[Pagination]}
        className="mySwiper p-3 bg-[var(--graybase-500)] "
      >
        {
          dataCases && dataCases.map((data, i) => {
            return (
              <SwiperSlide>

                <div key={i}>
                  <Cases data={data} />
                </div>
              </SwiperSlide>

            )
          })
        }

      </Swiper>
    </div>
  )
}

export default DisplayCases