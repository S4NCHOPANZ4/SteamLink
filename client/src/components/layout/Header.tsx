import home_bg from '../../assets/bg-homepng.png'

const Header = () => {
  return (
    <div
    style={{backgroundImage: `url(${home_bg})`, backgroundPosition: 'center', backgroundSize: 'cover'}}
    className='relative h-[70vh] w-[90%] m-auto mb-10 rounded-sm '>
        <div className='h-full w-full background-lineargradient'></div>
    </div>
  )
}

export default Header