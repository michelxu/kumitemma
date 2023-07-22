import CardShowcase from '../components/00landing_page/CardShowcase'
import HeroSection from '../components/00landing_page/HeroSection'
import NavBar from '../components/00landing_page/NavBar'

const Kumite = () => {
  return (
    <>
    <div className='flex flex-col min-h-screen bg-zinc-800'> 
       <NavBar/>
      <HeroSection/>
      <CardShowcase/> 
    </div>
    </>
  )
}

export default Kumite