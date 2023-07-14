import { FaUserNinja } from "react-icons/fa";

const NavBarItemUser = ({username}) => {
  return (
    <>
    <div className='flex flex-row items-center rounded gap-1 p-1 text-rose-400 bg-zinc-800 hover:bg-zinc-700 border border-solid border-zinc-500 cursor-pointer select-none'>
      <p className='text-md font-oswald font-regular'>{username}</p>
      <FaUserNinja className='h-4 w-4'/>
    </div>
    </>
  )
}

export default NavBarItemUser