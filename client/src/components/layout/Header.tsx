import home_bg from '../../assets/bg-homepngSmall.png'
import caseSkinCage from '../../assets/caseSkinAgent.png'

const Header = () => {
  return (
    <div
      style={{ backgroundImage: `url(${home_bg})`}}
      className='animatedBackgound relative h-[270px] sm:h-[200px] md:h-[350px] w-[100%] m-auto mb-10 rounded-sm sm:flex-col flex'>
      <div className='h-full w-full background-lineargradient absolute z-0'></div>
      <div className='absolute h-full w-full  flex items-center justify-center z-10 flex-col sm:flex-row'>
        <img className="w-[150px] lg:w-[300px] cursor-pointer transition-all duration-200 will-change-transform hover:-translate-y-1" src={caseSkinCage} alt="" />
        <div className='flex flex-col items-center'>
          <h1 className='text-white font-ligth lg:text-3xl md:text-sm text-center'>YOUR GAME, YOUR STYLE, YOUR AGENTS</h1>
          <button className='box-shadow-pink cursor-pointer bg-[var(--graybase-700)] hover:bg-[var(--graybase-600)] text-white font-semibold text-sm sm:text-lg px-5 py-1 rounded-full mt-3'>CHECK EVENT</button>
        </div>

      </div>


    </div>
  )
}

export default Header