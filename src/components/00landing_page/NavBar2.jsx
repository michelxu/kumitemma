import { useState } from 'react'
import { Link, animateScroll as scroll } from "react-scroll"
import kumite_logo_2 from '../../assets/kumite_logo_rose.png'

const NavBar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <div class="bg-zinc-900 border-b border-zinc-700">
      <div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div class="relative flex items-center justify-between">
          <div class="flex items-center">
            <a
              href="/"
              aria-label="Kumite MMA"
              title="Kumite MMA"
              class="inline-flex items-center mr-8"
            >
              <img src={kumite_logo_2} className="h-7 mr-3" alt="Logo" />
            </a>
            <ul class="items-center hidden space-x-8 lg:flex">
              <li>
                <a
                  href="javascript:void(0)"
                  aria-label="About"
                  title="About"
                  class="tracking-wide font-oswald text-rose-500 transition-colors duration-200 hover:text-rose-500"
                >
                  ABOUT
                </a>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="collection"
                  spy={true}
                  smooth={true}
                  offset={-105}
                  duration={500}
                  aria-label="Collection"
                  title="Collection"
                  class="tracking-wide font-oswald text-zinc-100 transition-colors duration-200 hover:text-rose-500 cursor-pointer"
                >
                  COLLECTION
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="features"
                  spy={true}
                  smooth={true}
                  offset={-105}
                  duration={500}
                  aria-label="Features"
                  title="Features"
                  class="tracking-wide font-oswald text-zinc-100 transition-colors duration-200 hover:text-rose-500 cursor-pointer"
                >
                  FEATURES
                </Link>
              </li>
            </ul>
          </div>
          <ul class="items-center hidden space-x-8 lg:flex">
            <li>
              <a
                href="/kumitemma/login"
                aria-label="Sign in"
                title="Sign in"
                class="inline-flex items-center justify-center w-full h-10 px-4 font-oswald font-medium tracking-tight text-zinc-100 transition duration-200 rounded shadow-md bg-rose-500 hover:bg-rose-600 focus:shadow-outline focus:outline-none"
                >
                GET STARTED
              </a>
            </li>
          </ul>
          <div class="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              {/* icon */}
              <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div class="absolute top-0 left-0 w-full">
                <div class="p-5 bg-zinc-900 border border-zinc-700 rounded shadow-sm">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Kumite MMA"
                        title="Kumite MMA"
                        class="inline-flex items-center"
                      >
                        <img src={kumite_logo_2} className="h-6" alt="Logo" />
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-zinc-700 focus:bg-zinc-700 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg class="w-5 text-zinc-100" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul class="space-y-4">
                      <li>
                        <a
                          href="javascript:void(0)"
                          aria-label="About"
                          title="About"
                          class="font-oswald font-base tracking-tight text-rose-500 transition-colors duration-200 hover:text-rose-500 uppercase"
                        >
                          About
                        </a>
                      </li>
                      <li>
                        <Link
                          activeClass="active"
                          to="collection"
                          spy={true}
                          smooth={true}
                          offset={-105}
                          duration={500}
                          href="/"
                          aria-label="Collection"
                          title="Collection"
                          class="font-oswald font-base tracking-tight text-zinc-100 transition-colors duration-200 hover:text-rose-500 uppercase"
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
                          offset={-105}
                          duration={500}
                          href="/"
                          aria-label="Features"
                          title="Features"
                          class="font-oswald font-base tracking-tight text-zinc-100 transition-colors duration-200 hover:text-rose-500 uppercase"
                        >
                          Features
                        </Link>
                      </li>
                      <li>
                        <a
                          href="/kumitemma/login"
                          class="inline-flex items-center justify-center w-full h-12 px-6 font-oswald font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-rose-500 hover:bg-rose-600 focus:shadow-outline focus:outline-none"
                          aria-label="Get Started"
                          title="Get Started"
                        >
                          GET STARTED
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default NavBar2