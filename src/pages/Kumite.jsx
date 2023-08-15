import CardShowcase from '../components/00landing_page/CardShowcase'
import Feature from '../components/00landing_page/Feature'
import Footer from '../components/00landing_page/Footer'
import HeroSection from '../components/00landing_page/HeroSection'
import NavBar from '../components/00landing_page/NavBar'
import NavBar2 from '../components/00landing_page/NavBar2'

const Kumite = () => {
  const features = [
    {
      title: 'Fights',
      icon: 'compete',
      description: `Compete using fighters from your collection. Face opponents from ± 1 weight division. Fights are simulated using odds.`
    },
    {
      title: 'Collection',
      icon: 'collection',
      description: `Discover a vast database with over 150 cards, including Base Cards, Legends, and Sport Icons. The card database is updated weekly.`
    },
    {
      title: 'Picks',
      icon: 'picks',
      description: `Test your MMA event predictions and earn rewards by making accurate picks for upcoming events!`
    },
  ]

  return (
    <>
    <div className='flex flex-col min-h-screen bg-zinc-900 select-none'> 
      <NavBar2/>
      <HeroSection/>

      {/* collection */}
      <div className='flex flex-col justify-center items-center w-full mx-auto mt-16 p-8'>
        <p className='flex items-start text-rose-500 text-5xl font-medium tracking-tight italic font-oswald uppercase'>
          Collection
        </p>
      </div>
      <CardShowcase/>
      
      {/* features */}
      <div className='flex justify-center items-center w-full mx-auto mt-16 p-8'>
        <p className='flex items-start text-rose-500 text-5xl font-medium tracking-tight italic font-oswald uppercase'>
          Features
        </p>
      </div>
      <div id='features' className='flex flex-col justify-center items-center mx-auto w-full pb-16 mb-16 px-4 gap-8 md:px-12 md:flex-row'>
        <div className='w-11/12 mb-4 md:mb-0 md:w-1/3'>
          <Feature {...features[0]}/>
        </div>
        <div className='w-11/12 mb-4 md:mb-0 md:w-1/3'>
          <Feature {...features[1]}/>
        </div>
        <div className='w-11/12 mb-4 md:mb-0 md:w-1/3'>
          <Feature {...features[2]}/>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default Kumite