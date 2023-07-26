import React from 'react'
import bg_img from '../../assets/bg_landing.png'
import my_cards_02 from '../../assets/my_cards_02.png'
import my_cards_04 from '../../assets/my_cards_04.png'

const HeroSection = () => {
  return (
    <>
    <section id='home' className='flex w-full min-h-[100vh] p-0'> 
    <div className=' inset-0 bg-cover bg-center w-full' style={{ backgroundImage: `url(${bg_img})` }}>
      <div className='container flex flex-wrap items-center justify-center mx-auto pt-32 px-4 md:px-12 md:flex-row'>
        <div className='mb-14 lg:mb-0 lg:w-1/2'>
          <h1 className='max-w-xl leading-none text-center text-6xl mb-5 lg:text-left lg:text-8xl tracking-tighter font-oswald font-semibold text-rose-500 uppercase'>
            Kumite MMA
          </h1>
          <p className='max-w-xl text-center text-xl sm:text-xl text-zinc-100 font-poppins tracking-tight leading-tight lg:text-left lg:max-w-lg'>
            Card Collection Game.
          </p>
          <p className='max-w-xl text-center text-xl sm:text-xl text-zinc-100 font-poppins tracking-tight leading-tight lg:text-left lg:max-w-lg'>
            Compete through different challenges to earn rewards, open packs and complete your collection.
          </p>
          <div className='flex justify-center mt-8 lg:justify-start'>
            <a href='/kumitemma/login' className='text-zinc-100 bg-rose-500 font-medium font-oswald uppercase rounded px-8 py-4 text-center hover:bg-rose-600 hover:drop-shadow-md transition duration-300 ease-in-out'>
              Get Started
            </a>
          </div>
        </div>
        <div className='lg:w-1/2 mb-8'>
          <img className='ml-auto ' src={my_cards_04} alt='Kumite Banner' />
        </div>
      </div>
    </div>
    </section>
    </>
  )
}

export default HeroSection