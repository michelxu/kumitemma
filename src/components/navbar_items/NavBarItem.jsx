import { GiTwoCoins } from "react-icons/gi";
import { PiCoinDuotone } from "react-icons/pi";
import { BiCoinStack } from "react-icons/bi";



const NavBarItem = ({coinbalance}) => {
  return (
    <>
    <div className='flex flex-row items-center text-rose-400 gap-1 p-1.5 hover:bg-zinc-700 rounded border border-solid border-zinc-500 cursor-pointer select-none'>
      <p className='text-sm font-oswald font-regular'>{coinbalance}</p>
      <GiTwoCoins className='h-5 w-5'/>
    </div>
    </>
  )
}

export default NavBarItem