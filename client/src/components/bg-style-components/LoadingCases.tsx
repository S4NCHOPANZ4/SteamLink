
interface props{
  heigth: number;
}

const LoadingCases = ({heigth}: props) => {
  
  return (
    <div 
    style={{
      height: heigth+"px",
    }}
    className={`  w-[90%] md:w-[85%] m-auto breathing_anim  p-2 rounded-md flex items-center justify-center`}>
    </div>
  )
}

export default LoadingCases