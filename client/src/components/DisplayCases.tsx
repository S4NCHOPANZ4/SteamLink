import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
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
    <div className=' w-[90%] md:w-[85%] m-auto p-3 rounded-md'>
      <Swiper
        breakpoints={breakpoints}

        pagination={{
          type: 'progressbar',
        }}
        modules={[Pagination]}
        className="mySwiper p-3 "
      >
        {
          dataCases && dataCases.map((data, i) => {
            return (
              <SwiperSlide key={i}>

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