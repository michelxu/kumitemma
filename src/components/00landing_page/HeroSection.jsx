import React from 'react'
import bg_img from '../../assets/bg_landing.png'
import my_cards_02 from '../../assets/my_cards_02.png'
import my_cards_04 from '../../assets/my_cards_04.png'

const HeroSection = () => {
  return (
    <>
    <section id='home' className='relative w-full min-h-screen'> 
    <div className={`absolute inset-0 bg-cover bg-center`} style={{ backgroundImage: `url(${bg_img})` }}>
    {/* bg-gradient-to-t from-zinc-700 via-zinc-900 to-black */}
      <div className='container flex flex-wrap items-center justify-center mx-auto mt-10 md:px-12 md:flex-row'>
        <div className='mb-14 lg:mb-0 lg:w-1/2'>
          <h1 className='max-w-xl leading-none text-center text-4xl mb-5 lg:text-left lg:text-5xl tracking-tight font-oswald font-semibold text-rose-500 uppercase'>
            Kumite MMA
          </h1>
          <p className='max-w-xl text-center text-xl text-zinc-100 font-poppins tracking-tight leading-tight lg:text-left lg:max-w-lg'>
            Card Collection Game. Compete through different challenges to earn rewards, win packs and complete your collection.
          </p>
          <div className='flex justify-center mt-14 lg:justify-start'>
            <button className='text-zinc-100 bg-rose-500 font-medium font-oswald uppercase rounded px-5 py-4 text-center hover:bg-rose-700 hover:drop-shadow-md transition duration-300 ease-in-out'>
              Get Started
            </button>
          </div>
        </div>
        <div className='lg:w-1/2'>
          <img className='ml-auto' src={my_cards_04} alt='Kumite Banner' />
        </div>
      </div>
    </div>
    </section>
    </>
  )
}

export default HeroSection