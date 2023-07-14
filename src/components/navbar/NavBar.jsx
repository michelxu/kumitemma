import { useContext } from "react"
import NavBarItem from "../navbar_items/NavBarItem"
import NavBarItemUser from "../navbar_items/NavBarItemUser"
import NavBarTitle from "../navbar_title/NavBarTitle"
import Contexto from "../../context/Contexto"

const NavBar = () => {
  const {getUserDataByUsername, referencia, uData} = useContext(Contexto)
  const username = localStorage.getItem('localUsername');
  const userData = getUserDataByUsername(username)

  return (
    <>
    <header className="flex flex-row fixed sm:ms-24 z-20 justify-between items-center px-2 ps-2 sm:ps-4 sm:pe-28 bg-zinc-800 h-16 w-full">
      <div>
        <NavBarTitle/>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <NavBarItem coinbalance={uData?.coins}/>
        {/*
        <div className='bg-rose-400 h-8 w-0.5'></div>
        */}
        <NavBarItemUser username={referencia}/>
      </div>
    </header>
    </>
  )
}

export default NavBar