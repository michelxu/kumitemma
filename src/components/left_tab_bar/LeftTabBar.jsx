import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Contexto from "../../context/Contexto"
import TabBarItem from "../tab_bar_item/TabBarItem" // components
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid' // icons

const LeftTabBar = () => {
  const navegacion = useNavigate()
  const { desloguearme, setReferencia, setUData } = useContext(Contexto)

  const logout = () => {
    navegacion('/login', {replace:true})
    setReferencia('')
    setUData({})
    desloguearme()
  }

  return (
    <>
    <nav className="hidden sm:flex flex-col fixed bg-zinc-800 h-screen w-[104px] select-none">
      {/* Icon */}
      <div className='flex h-16 justify-center items-center -mb-1'>
        <p className='text-5xl font-extrabold font-syne mt-1 text-rose-500'>
          K
        </p>
      </div>
      {/* Nav Items Home, Store ... */}
      <TabBarItem title={'home'}/>
      <TabBarItem title={'compete'}/>
      <TabBarItem title={'picks'}/>
      <TabBarItem title={'store'}/>
      <TabBarItem title={'collection'}/>
      <TabBarItem title={'about'}/>
      <div className='flex flex-1'>
        {/* flex separador */}
      </div>
      {/* Bottom Nav Items */}
      <TabBarItem title={'settings'}/>
      {/* logout btn */}
      <button
      className={`flex flex-col justify-center items-center w-full py-2.5 my-1 text-zinc-300 hover:bg-zinc-900`}
      onClick={logout}
      >
        <div className='flex flex-col justify-center items-center mx-auto'>
          <ArrowLeftOnRectangleIcon className='h-6 w-6' />
          <p className='font-oswald text-sm font-regular tracking-tighter'>LOGOUT</p>
        </div>
      </button>
    </nav>
    </>
  )
}

export default LeftTabBar