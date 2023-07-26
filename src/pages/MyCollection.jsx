import { useContext, useEffect, useState } from "react";
import Contexto from "../context/Contexto";
import Card from "../components/card/Card" /* components  */
import Layout from "../components/layout/Layout"
import { fighters } from '../data/data'; /* data  */
import { getAllFighters } from "../utils/utils";
import { filterByDivision, filterByRating } from "../utils/filter_utils";


const MyCollection = () => {
  /* load more variables */
  const initialCardsToShow = 20
  const loadMoreStep = 20
  const [cardsToShow, setCardsToShow] = useState(initialCardsToShow)

  const {uData} = useContext(Contexto)
  /* filter variables */
  const [fightersList, setFightersList] = useState([]) //Main array of myCollection • Nunca se modifica
  const [divisionFilter, setDivisionFilter] = useState('') //FLW, BW, FW...
  const [orderFilter, setOrderFilter] = useState('') //Highest, Lowest
  const [filteredList, setFilteredList] = useState([]) //Array a renderizar • Sí se modifica

  // useEffect inicial
  useEffect(() => {
    if (uData && Object.keys(uData).length === 0) return //espera a que cargue uData

    //Setear fighters
    const fighters_array = getAllFighters(uData.myCollection)
    setFightersList(fighters_array)
  }, [uData])

  //useEffect: Filtrar fighters
  useEffect(() => {
    setCardsToShow(10) //reiniciar
    let filteredFighters = [...fightersList] //nuevo array a partir de fightersList
    filteredFighters = filterByDivision(filteredFighters, divisionFilter)
    filteredFighters = filterByRating(filteredFighters, orderFilter)

    setFilteredList(filteredFighters)
  }, [fightersList, divisionFilter, orderFilter])

  // Handle the "Load More" button click
  const handleLoadMore = () => {
    setCardsToShow((prev) => prev + loadMoreStep)
    console.log('handleLoadMore click', cardsToShow)

  };

  return (
    <>
    <Layout>
      <div className='flex flex-col justify-center items-center min-h-[calc(100%-64px)]'>
        {/* top submenu header */}
        <div className='flex justify-between items-center w-full h-12 bg-zinc-900 text-zinc-50 py-1 px-2 mb-4 border-b border-solid border-slate-600'>
          <p className='font-medium font-oswald italic text-sm text-zinc-200'>
            TOTAL {uData?.myCollection?.length}/{fighters.length}
          </p>
          {/* select options */}
          <div className='flex flex-row gap-2'>
            <select value={divisionFilter} onChange={(e) => setDivisionFilter(e.target.value)} 
            className="px-1 py-1 border-zinc-300 rounded text-zinc-50 bg-zinc-700 focus:ring focus:ring-opacity-50 focus:ring-rose-300 focus:border-rose-300">
              <option value="">All Divisions</option>
              <option value="FLW">Flyweight</option>
              <option value="BW">Bantamweight</option>
              <option value="FW">Featherweight</option>
              <option value="LW">Lightweight</option>
              <option value="WW">Welterweight</option>
              <option value="MW">Middleweight</option>
              <option value="LHW">L. Heavyweight</option>
              <option value="HW">Heavyweight</option>
            </select>
            <select value={orderFilter} onChange={(e) => setOrderFilter(e.target.value)} 
            className="px-1 py-1 border-zinc-300 rounded text-zinc-50 bg-zinc-700 focus:ring focus:ring-opacity-50 focus:ring-rose-300 focus:border-rose-300">
              <option value="">-</option>
              <option value="Highest">Highest</option>
              <option value="Lowest">Lowest</option>
            </select>
          </div>
        </div>
        {/* render cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-8">
          {
            filteredList.slice(0, cardsToShow).map((fighter, i) => {
              return (
                <div key={i} className='transform scale-75 sm:scale-100'>
                  <div className='bg-zinc-100 p-1.5 -m-4 sm:m-0 sm:p-1.5'>
                    <Card id={fighter.id}/>
                  </div>                  
                </div>
              );
            })
          }
        </div>
        <div className='flex-1'></div>
        {/* load more btn */}
        <div className='flex flex-col justify-center items-center w-4/5 mt-16 mb-8'>
          { cardsToShow < filteredList.length
          ? (
            <button className='flex justify-center w-full p-2 rounded bg-rose-500 hover:bg-rose-600 border border-solid border-rose-400 font-oswald text-zinc-50'
            onClick={handleLoadMore}>
              Load More
            </button>
          ) 
          : (
            <p className='font-base text-sm font-poppins tracking-tighter text-zinc-400'>
              No more cards to show...
            </p>
          )
          }

        </div>
      </div>
    </Layout>
    </>
  )
}

export default MyCollection