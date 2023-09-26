import home_bg from '../../assets/bg-homepngSmall.png'
import caseSkinCage from '../../assets/caseSkinAgent.png'
import { useNavigate } from 'react-router-dom'

import '../../text-styles.css'
const Header = () => {

  const navigate = useNavigate()

  return (
    <div
      style={{ backgroundImage: `url(${home_bg})` }}
      className='animatedBackgound relative h-[270px] sm:h-[200px] md:h-[350px] w-[100%] m-auto mb-10 rounded-sm sm:flex-col flex'>
      <div className='h-full w-full background-lineargradient-black absolute z-0'></div>
      <div className='absolute h-full w-full  flex items-center justify-center z-10 flex-col sm:flex-row'>
        <img
          onClick={() => navigate('/case/agentCrate')}
          className="w-[150px] lg:w-[300px] cursor-pointer transition-all duration-200 will-change-transform hover:-translate-y-1" src={caseSkinCage} alt="" />
        <div className='flex flex-col items-center'>
          <div className="glitch-wrapper">
            <div className="glitch text-2xl px-2 py-1" data-text="YOUR GAME, YOUR STYLE, YOUR AGENTS">{"> "}YOUR GAME, YOUR STYLE, YOUR AGENTS {" <"}</div>
          </div>
          <h1 className='text-white font-ligth lg:text-3xl md:text-sm text-center'></h1>
          <button
            onClick={() => navigate('/case/agentCrate')}
            className='box-shadow-pink cursor-pointer bg-[var(--graybase-700)] hover:bg-[var(--graybase-600)] text-white font-semibold text-sm sm:text-lg px-5 py-1 rounded-full mt-3'>CHECK EVENT</button>
        </div>

      </div>


    </div>
  )
}

export default Header