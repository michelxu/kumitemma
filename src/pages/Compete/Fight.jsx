import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useNavigate } from 'react-router-dom';
import Contexto from '../../context/Contexto';
import { getFighter, getRandomNumber } from '../../utils/utils';

const Fight = () => {
  const navegacion = useNavigate();
  const { uData, } = useContext(Contexto);

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
  const storedDate = localStorage.getItem('storedDate')
  const fightsPerDay = localStorage.getItem('fightsToday')

  useEffect(() => {
    console.log('fecha guardada', storedDate)
    console.log('peleas hoy', fightsPerDay)
  
    //Si no existe un registro de fecha: crear storedDate y fightsToday
    if (!storedDate) {
      localStorage.setItem('storedDate', today) //registrar fecha de hoy
      localStorage.setItem('fightsToday', '0') //registrar peleas 0
    }
  
    //Si es el mismo día y ya se peleó 5 veces: Volver
    if (storedDate === today && fightsPerDay === '1000') {
      navegacion('/compete')
      console.log('Max fights per day reached.');
    }
    
  }, [])

  const handleStart = () => {
    //Mismo día: Añadir +1 fight
    if (today === storedDate) {
      console.log('Mismo día: Sumar +1 a fightsToday');
      const fightsToday = parseInt(localStorage.getItem('fightsToday')) || 0;
      localStorage.setItem('fightsToday', (fightsToday + 1).toString());
    } else{
      //Nuevo día: Actualizar fecha (today) y fights (0)
      console.log('Nuevo día: Actualizar storedDate y fightsToday');
      localStorage.setItem('storedDate', today)
      localStorage.setItem('fightsToday', '1')
    }

    //Get random fighter from myCollection
    const randomNumber = getRandomNumber(uData.myCollection.length)
    const myRandomFighter = getFighter(randomNumber)
    console.log('myRandomFighter', myRandomFighter);

    /*Get random opponent from database
      El opponent puede ser +-1 weight division
      Ejemplo:
        myfighter.division.short_name = LW
      Entonces el getRandomOpponent puede ser de las divisiones
        divisions = [FW, LW, WW]
      HW y FLW solo tendrán 2 divisiones posibles
    */
  }

  const changeDate = () => {
    console.log('cambiar fecha para hacer tests');
    localStorage.setItem('storedDate', '07/13/2023') //registrar fecha de hoy
  }




  return (
    <>
    <Layout>
      {uData && (
      <div className="flex flex-col items-center mb-8 mx-auto max-w-5xl mt-8 gap-6 select-none">
        {/* buttons */}
        <div className='flex flex-col justify-center w-4/5 gap-2'>
          <button className='flex justify-center w-full p-2 rounded bg-rose-600 hover:bg-rose-700 border border-solid border-rose-400 font-oswald text-zinc-50'
          onClick={handleStart}>
            START
          </button>
        </div>
        <div className='flex flex-col justify-center w-4/5 gap-2'>
          <button className='flex justify-center w-full p-2 rounded bg-rose-600 hover:bg-rose-700 border border-solid border-rose-400 font-oswald text-zinc-50'
          onClick={changeDate}>
            CHANGE DATE
          </button>
        </div>
      </div>
      )}
    </Layout>
    </>
  )
}

export default Fight