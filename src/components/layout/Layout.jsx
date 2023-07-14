import BottomTabBar from '../bottom_tab_bar/BottomTabBar'
import LeftTabBar from '../left_tab_bar/LeftTabBar'
import NavBar from '../navbar/NavBar'

const Layout = ({ children }) => {
  return (
    <>
    <section className='flex flex-row'>
      <LeftTabBar/>
      <div className='flex flex-col w-full bg-zinc-700'>
        <NavBar/>
        {/* poner mt-16 mb-16 mínimo en cada página por el top y botton navbar que están siempre en pantalla.*/}
        <div className='sm:ms-[104px] mt-16 mb-16 sm:mb-0 min-h-[calc(100vh-128px)] sm:min-h-[calc(100vh-64px)]'>
          {/* your content here */}
          {children}
        </div>
      </div>
    </section>
    <BottomTabBar/>
    </>
  )
}

export default Layout