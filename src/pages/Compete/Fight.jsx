import React, { useContext, useEffect, useState } from 'react' //react
import { useNavigate } from 'react-router-dom';
import Contexto from '../../context/Contexto';
import Layout from '../../components/layout/Layout' //components
import { getFighter, getRandomNumber } from '../../utils/utils'; // functions
import { fighters } from '../../data/data'; // data
import { findOpponentByDivision, getRounds } from '../../utils/compete_utils';
import Card from '../../components/card/Card';

const Fight = () => {
  const navegacion = useNavigate();
  const {uData, setUData, getUserDataByUsername, setUserDataProperty} = useContext(Contexto)
  const [isClicked, setIsClicked] = useState(false) //animación
  //const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
  const today = "07/19/2023"

  useEffect(() => {
    if (uData && Object.keys(uData).length === 0) return //espera a que cargue uData

  }, [uData])

  const handleStart = () => {
    //Si es el mismo día y ya se peleó 5 veces: Volver
    if (uData.compete.recordedDate === today && uData.compete.fightsToday >= '5') {
      console.error('Max fights per day reached.')
      alert('Max fights per day reached. Come back tomorrow!')
      return
    }

    //Si NO es el mismo día y no ha reclamado recompensas
    if (uData.compete.recordedDate != today && uData.compete.points > 0) {
      console.log('You must claim your past rewards before fighting in a new day.')
      alert('You must claim your past rewards before fighting in a new day.')
      return
    }

    //Mismo día: Añadir +1 fight
    if (today === uData.compete.recordedDate) {
      console.log('Mismo día: Sumar +1 a fightsToday')
      const fightsToday = uData.compete.fightsToday || 0
      setUserDataProperty(uData.username, 'compete.fightsToday', fightsToday+1)
      //setUserDataProperty(uData.username, 'compete.fightInProgress', 'true')
    } else {
      //Nuevo día: Actualizar fecha (today) y fights (0)
      console.log('Nuevo día: Actualizar storedDate y fightsToday');
      setUserDataProperty(uData.username, 'compete.recordedDate', today)
      setUserDataProperty(uData.username, 'compete.fightsToday', 1)
      //setUserDataProperty(uData.username, 'compete.fightInProgress', 'true')
    }

    /* *********** Resetear data de la antigua pelea *********** */
    setUserDataProperty(uData.username, 'compete.fightInProgress', 'true')
    setUserDataProperty(uData.username, 'compete.winner', "")
    setUserDataProperty(uData.username, 'compete.rounds', [])
    setUserDataProperty(uData.username, 'compete.scorecard.myFighter', [])
    setUserDataProperty(uData.username, 'compete.scorecard.myOpponent', [])
    setUserDataProperty(uData.username, 'compete.roundsWinners', [])

    /* *********** Desarrollar la pelea y guardar la data *********** */
    //Set rounds
    const rounds = getRounds(3)
    console.log('Rounds', rounds)

    //Get random fighter from myCollection
    const randomN = getRandomNumber(uData.myCollection.length)
    const myFighter = getFighter(uData.myCollection[randomN])
    console.log('myFighter', myFighter)

    //Get random opponent (+-1 weight division)
    const myOpponent = findOpponentByDivision(myFighter.division.long_name, fighters)
    console.log('myOpponent', myOpponent);

    setIsClicked(true)

    // Actualizar localstorage
    setUserDataProperty(uData.username, 'compete.rounds', [...rounds])
    setUserDataProperty(uData.username, 'compete.myFighter', myFighter.id)
    setUserDataProperty(uData.username, 'compete.myOpponent', myOpponent.id)

    // *Actualizar todo useState
    setUData(getUserDataByUsername(uData.username))
  }

  const handleClaimRewards = () => {
    //verificar
    /* fight in progress - false
    fights today 5
    points > 0 */

    /* o:
    fight in progress - false
    today =! dateRecorded
    points > 0 */

    //entregar recompensas

    //set points a 0
    setUserDataProperty(uData.username, 'compete.points', 0)

    // *Actualizar todo useState
    setUData(getUserDataByUsername(uData.username))
  }

  const changeDate = () => {
    const competeObject = {
      recordedDate: "07/13/2023",
      fightsToday: 5,
      fightInProgress: "false",
      myFighter: "",
      myOpponent: "",
      winner: "",
      roundsWinners : [],
      scorecard : {
        myFighter: [],
        myOpponent: []
      },
      rounds : [],
      winMethod: "",
      points: 1000
    }

    console.log('(testing)');
    //setUserDataProperty(uData.username, 'compete', competeObject)
    setUserDataProperty(uData.username, 'compete.recordedDate', "07/18/2023")

    // *Actualizar todo useState
    setUData(getUserDataByUsername(uData.username))
  }

  /* buttons */
  const renderClaimRewardsBtn = () => {
    if (uData?.compete?.fightInProgress === 'true' || 
      uData?.compete?.fightsToday != 5 && uData?.compete?.recordedDate === today || 
      uData?.compete?.points === 0) return

      return (
      <button className='flex justify-center w-full p-2 rounded bg-sky-600 hover:bg-sky-700 border border-solid border-sky-400 font-oswald text-zinc-50'
      onClick={handleClaimRewards}>
        CLAIM ALL REWARDS TODAY
      </button>
    )
  }

  return (
    <>
    <Layout>
      {uData && (
      <>
      {/* fighters cards */}
      <div className="flex flex-row justify-center items-center mb-8 mx-auto max-w-5xl mt-8 gap-4 select-none">
        <div className={`transform scale-75 sm:scale-100 -m-6 sm:m-0 ${isClicked ? 'bounce-in-top' : ''}`}>
          <Card id={uData.compete?.myFighter}/>
          <p className='font-poppins tracking-tight text-sm text-rose-400 pt-1'>
            MY FIGHTER
          </p>
        </div>
        <p className='font-oswald italic font-medium tracking-tighter text-3xl text-zinc-200 me-2'>
          VS
        </p>
        <div className={`transform scale-75 sm:scale-100 -m-6 sm:m-0 ${isClicked ? 'bounce-in-top' : ''}`}>
          <Card id={uData.compete?.myOpponent}/>
          <p className='font-poppins tracking-tight text-sm text-sky-400 pt-1'>
            MY OPPONENT
          </p>
        </div>
      </div>
      {/* compete data */}
      <div className='flex flex-col justify-center items-center mx-auto max-w-5xl mb-8 mt-8'>
        <div className='flex flex-row justify-between text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Today:</p>
          <p className='font-medium tracking-tight text-amber-300'>{today}</p>
        </div>
        <div className='flex flex-row justify-between items-center text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Last date recorded:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.recordedDate}</p>
        </div>
        <div className='flex flex-row justify-between items-center text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Fights in progress:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.fightInProgress}</p>
        </div>
        <div className='flex flex-row justify-between items-center text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Winner:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.winner}</p>
        </div>
        <div className='flex flex-row justify-between items-center text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Fights this day:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.fightsToday}</p>
        </div>
        <div className='flex flex-row justify-between items-center text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Points:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.points}</p>
        </div>
      </div>
      </>
      )}
      {/* buttons */}
      <div className="flex flex-col justify-center items-center mb-8 mx-auto max-w-5xl mt-8 gap-2 select-none">
        <div className='flex flex-col justify-center w-4/5 gap-2'>
          {uData?.compete?.fightInProgress === 'false' && (
            <button className='flex justify-center w-full p-2 rounded bg-rose-600 hover:bg-rose-700 border border-solid border-rose-400 font-oswald text-zinc-50'
            onClick={handleStart}>
              NEW FIGHT
            </button>
          )}
          {uData?.compete?.fightInProgress === 'true' && (
            <button className='flex justify-center w-full p-2 rounded bg-sky-600 hover:bg-sky-700 border border-solid border-sky-400 font-oswald text-zinc-50'
            onClick={() => navegacion('/in-progress')}>
              GO TO FIGHT IN PROGRESS
            </button>
          )}
          {renderClaimRewardsBtn()}
        </div>
      <div className='flex flex-col justify-center w-4/5 gap-2'>
        <button className='flex justify-center w-full p-2 rounded bg-sky-600 hover:bg-sky-700 border border-solid border-sky-400 font-oswald text-zinc-50'
        onClick={changeDate}>
          test btn. change date
        </button>
      </div>
      </div>
    </Layout>
    </>
  )
}

export default Fight