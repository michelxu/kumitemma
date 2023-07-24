import { useNavigate } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Link, animateScroll as scroll } from "react-scroll";
import { Bars3Icon } from '@heroicons/react/24/solid'
import kumite_logo_sm from '../../assets/kumite_logo_sm.png'
import kumite_logo_2 from '../../assets/kumite_logo_rose.png'
import kumite_logo_3 from '../../assets/kumite_logo_w.png'


const NavBar = () => {
  const navegacion = useNavigate()

  return (
    <nav className="z-10 w-full bg-zinc-900 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" className="flex items-center">
          <img src={kumite_logo_2} className="h-7 mr-3" alt="Flowbite Logo" />
      </a>
      <div className="flex md:order-2">
          <button type="button" className="font-oswald uppercase text-white bg-rose-500 hover:bg-rose-600 font-regular rounded text-xs sm:text-sm px-2 py-0 sm:px-4 sm:py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => navegacion('/login')}>Get started</button>
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
        <ul className="flex flex-col gap-1 font-regular p-4 md:p-0 mt-4 border border-zinc-700 rounded-lg bg-zinc-800 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-zinc-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link
              activeClass="active"
              to="/"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="font-oswald uppercase block py-2 pl-3 pr-4 text-zinc-100 bg-rose-500 rounded md:bg-transparent md:text-rose-500 md:p-0 cursor-pointer" aria-current="page"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="/"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="font-oswald uppercase block py-2 pl-3 pr-4 text-zinc-100 rounded hover:bg-rose-500 md:hover:bg-transparent md:hover:text-rose-500 md:p-0 cursor-pointer"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="collection"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="font-oswald uppercase block py-2 pl-3 pr-4 text-zinc-100 rounded hover:bg-rose-500 md:hover:bg-transparent md:hover:text-rose-500 md:p-0 cursor-pointer"
              >
              Collection
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="features"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="font-oswald uppercase block py-2 pl-3 pr-4 text-zinc-100 rounded cursor-pointer hover:bg-rose-500 md:hover:bg-transparent md:hover:text-rose-500 md:p-0"
              >
                Features
            </Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  )
}

export default NavBar