import CardShowcase from '../components/00landing_page/CardShowcase'
import Feature from '../components/00landing_page/Feature'
import HeroSection from '../components/00landing_page/HeroSection'
import NavBar from '../components/00landing_page/NavBar'

const Kumite = () => {
  return (
    <>
    <div className='flex flex-col min-h-screen bg-zinc-950'> 
      <NavBar/>
      <HeroSection/>

      {/* collection */}
      <div className='flex flex-col justify-center items-center w-full mx-auto mt-16 p-8'>
        <p className='text-zinc-100 text-5xl font-regular tracking-tight font-oswald uppercase'>
          Collection
        </p>
      </div>
      <CardShowcase/>
      

      {/* features */}
      <div className='flex justify-center items-center w-full mx-auto mt-16 p-8'>
        <p className='text-zinc-100 text-5xl font-regular tracking-tight font-oswald uppercase'>
          Features
        </p>
      </div>
      <div id='features' className='flex flex-col items-center justify-center mx-auto w-full pb-16 px-4 gap-8 md:px-12 md:flex-row'>
        <div className='w-11/12 mb-4 md:mb-0 md:w-1/3'>
          <Feature/>
        </div>
        <div className='w-11/12 mb-4 md:mb-0 md:w-1/3'>
          <Feature/>
        </div>
        <div className='w-11/12 mb-4 md:mb-0 md:w-1/3'>
          <Feature/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Kumite