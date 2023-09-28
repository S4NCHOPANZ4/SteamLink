import home_bg from '../../assets/bg-homepngSmall.png'
import caseSkinCage from '../../assets/caseSkinAgent.png'
import { useNavigate } from 'react-router-dom'

import '../../text-styles.css'
import Timer from '../Countdown'
const Header = () => {

  const navigate = useNavigate()
  const startDate = new Date("2023-12-31T00:00:00");

  return (
    <div
      style={{ backgroundImage: `url(${home_bg})` }}
      className='animatedBackgound relative h-[270px] sm:h-[200px] md:h-[350px] w-[100%] m-auto mb-10 rounded-sm sm:flex-col flex'>
      <div className='h-full w-full background-lineargradient-black absolute z-0'></div>
      <div className='absolute h-full w-full  flex items-center justify-center z-10 flex-col '>

        <div className='flex flex-col items-center'>
          <div className="content">
            <div className="content__container">
              <p className="content__container__text">
                Your
              </p>

              <ul className="content__container__list">
                <li className="content__container__list__item">Games! </li>
                <li className="content__container__list__item">Styles! </li>
                <li className="content__container__list__item">Agents! </li>
                <li className="content__container__list__item">Skins! </li>
              </ul>
            </div>
          </div>

          <h1 className='text-white font-ligth lg:text-3xl md:text-sm text-center'></h1>
          <button
            onClick={() => navigate('/case/agentCrate')}
            className=' border-poligon box-shadow-pink cursor-pointer bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm  px-7 py-3  mt-5'>CHECK EVENT</button>
        </div>
        <div className='absolute right-4 bottom-4'>
          <Timer startDate={startDate} />
        </div>

      </div>


    </div>
  )
}

export default Header