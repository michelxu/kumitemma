import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Contexto from '../context/Contexto'
import Layout from '../components/layout/Layout'
import { getFighter, getAllFighters, orderFighterByProperty, getCountryFlagImage, orderFighterByPropertyAndRarity } from '../utils/utils'; /* data  */
import Card from '../components/card/Card';
import { MdTouchApp } from "react-icons/md";


const Opening = () => {
  const navegacion = useNavigate()
  const {uData} = useContext(Contexto);
  const [elements, setElements] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (uData && Object.keys(uData).length === 0) return //espera a que cargue uData
    if (uData && uData.unassigned.length === 0){
      navegacion('/home') //si está vacío vuelve al home
      return
    }
    //set hasViewed false • Para evitar acceder a /Opening más de 1 vez x Pack
    const hasViewedOpening = JSON.parse(localStorage.getItem('hasViewedOpening'))
    if (hasViewedOpening) navegacion('/home')
    console.log('hasViewed',hasViewedOpening)


    //1. Obtener all unassigned fighters • array de objetos con toda su data
    const allfighters = getAllFighters(uData.unassigned)

    //2. Obtener el de valoración más alta [0]
    const best_card = orderFighterByPropertyAndRarity(allfighters, 'stats.overall')

    const flag = getCountryFlagImage(best_card[0].country)

    //3. Pasarlo a un array de elementos a renderizar
    const jsxElements = [
      <img key={1} src={flag} className='flex w-32 bounce-in-top'/>,
      <div key={2} className='flex flex-col bounce-in-top'>
        <p className='text-7xl font-oswald font-medium tracking-tighter text-zinc-50'>{best_card[0].stats.overall}</p>
        <p className='text-xl text-center font-oswald font-medium tracking-tighter text-zinc-50'>OVERALL</p>
      </div>,
      <div key={3} className='flex flex-col bounce-in-top'>
        <p className='text-7xl font-oswald font-medium tracking-tighter text-zinc-50'>{best_card[0].record}</p>
        <p className='text-xl text-center font-oswald font-medium tracking-tighter text-zinc-50'>RECORD</p>
      </div>,
      <div key={4} className='flex flex-col bounce-in-top'>
        <Card id={best_card[0].id}/>
      </div>,
    ]

    //4. Enviarlo a una variable en useState
    setElements([...jsxElements])

  }, [uData])


  const handleClick = () => {
    index === 3
    ? navegacion('/unassigned')
    : setIndex(prevIndex => (prevIndex + 1) % elements.length);
  };


  return (
    <>
    <Layout>
    {uData && uData?.unassigned?.length > 0 && (
      <div className="flex flex-col items-center mx-auto max-w-5xl gap-4 select-none">
        <div className='flex justify-center items-center h-[400px] w-full max-w-4xl mt-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 cursor-pointer'
          onClick={handleClick}>
          {elements[index]}
        </div>
        <div className='flex flex-row items-center text-zinc-400 gap-2'>
          {index === 3
          ? <p className='font-oswald tracking-tighter'>SEE THE ENTIRE PACK</p>
          : <p className='font-oswald tracking-tighter'>PRESS TO DISCOVER</p>
          }
          <MdTouchApp className='text-2xl -mt-1'/>
        </div>
        <div className='flex w-11/12 max-w-md justify-center items-center'>
          <Link to='/unassigned' className='w-full text-center py-2 px-4 rounded bg-zinc-700 hover:bg-zinc-600 border border-solid border-zinc-400 hover:border-zinc-400'>
            <p className='font-oswald text-white'>SKIP</p>
          </Link>
        </div>
      </div>
    )}
    </Layout>
    </>
  )
}

export default Opening