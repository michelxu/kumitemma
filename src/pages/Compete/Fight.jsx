import React, { useContext, useEffect, useState } from 'react' //react
import { useNavigate } from 'react-router-dom';
import Contexto from '../../context/Contexto';
import Layout from '../../components/layout/Layout' //components
import { getFighter, getRandomNumber } from '../../utils/utils'; // functions
import { fighters } from '../../data/data'; // data
import { findOpponentByDivision, getRounds, tradePointsForRewards } from '../../utils/compete_utils';
import Card from '../../components/card/Card';
import DataBox from '../../components/00data_boxes/data_box/DataBox';

const Fight = () => {
  const navegacion = useNavigate();
  const {uData, setUData, getUserDataByUsername, setUserDataProperty, updateUserDataProperty} = useContext(Contexto)
  const [isClicked, setIsClicked] = useState(false) //animación
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
  //const today = "07/20/2023"

  // Define the classes for each filter
  const filterWin = 'saturate-150 contrast-125'
  const filterLoss = 'grayscale contrast-125'
  // Determine which filter to apply based on the winner
  const filterClassMyFighter = uData?.compete?.winner === 'myFighter' ? filterWin : uData?.compete?.winner === 'myOpponent' || uData?.compete?.winner === 'Draw' ? filterLoss : ''
  const filterClassMyOpponent = uData?.compete?.winner === 'myOpponent' ? filterWin : uData?.compete?.winner === 'myFighter' || uData?.compete?.winner === 'Draw' ? filterLoss : ''

  useEffect(() => {
    if (uData && Object.keys(uData).length === 0) return //espera a que cargue uData

  }, [uData])

  const handleNewFight = () => {
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
    setUserDataProperty(uData.username, 'compete.winMethod', "")
    setUserDataProperty(uData.username, 'compete.rounds', [])
    setUserDataProperty(uData.username, 'compete.scorecard.myFighter', [])
    setUserDataProperty(uData.username, 'compete.scorecard.myOpponent', [])
    setUserDataProperty(uData.username, 'compete.scorecard.myOdds', [])
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

    // Actualizar todo useState
    setUData(getUserDataByUsername(uData.username))
  }

  const claimRewards = () => {
    const points = uData.compete?.points
    const currentCoins = uData.coins
    //Set rewards
    const { packs, coins} = tradePointsForRewards(points)
    const totalCoins = currentCoins + coins

    // Actualizar localStorage
    setUserDataProperty(uData.username, 'compete.points', 0)
    updateUserDataProperty(uData.username, 'coins', totalCoins)
    updateUserDataProperty(uData.username, 'packs', packs)

    // Actualizar todo useState
    setUData(getUserDataByUsername(uData.username))

    alert(`Rewards have been claimed (${coins} coins). Visit My Packs section to see the packs.`)
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

  /* *********** render buttons *********** */
  const renderClaimRewardsBtn = () => {
    if (uData?.compete?.fightInProgress === 'true' || 
      uData?.compete?.fightsToday != 5 && uData?.compete?.recordedDate === today || 
      uData?.compete?.points === 0) return

      return (
      <button className='flex justify-center w-full p-2 rounded bg-sky-600 hover:bg-sky-700 border border-solid border-sky-400 font-oswald text-zinc-50'
      onClick={claimRewards}>
        CLAIM TODAY'S REWARDS
      </button>
    )
  }

  return (
    <>
    <Layout>
    <div className='flex flex-col min-h-[calc(100%)]'>
      {uData && (
      <>
      {/* top submenu header */}
      <div className='flex justify-between items-center w-full h-12 bg-zinc-900 text-white py-1 px-2 border-b border-solid border-slate-600'>
        <p className='font-medium font-oswald italic text-sm'>
          FIGHT CENTER
        </p>
      </div>
      {/* fighters cards */}
      <div className="flex flex-row justify-center items-center mx-auto max-w-5xl mb-4 mt-4 gap-4 select-none">
        {/* my fighter card */}
        <div className={`transform scale-75 sm:scale-100 -m-6 sm:m-0`}>
          <div className={`${isClicked ? 'bounce-in-top' : ''} ${filterClassMyFighter}`}>
            <Card id={uData.compete?.myFighter}/>
          </div>
          <p className='font-poppins tracking-tight text-sm text-rose-400 pt-1'>
            MY FIGHTER
          </p>
        </div>
        <p className='font-oswald italic font-medium tracking-tighter text-3xl text-zinc-200 me-2'>VS</p>
        {/* my opponent card */}
        <div className={`transform scale-75 sm:scale-100 -m-6 sm:m-0 `}>
          <div className={`${isClicked ? 'bounce-in-top' : ''} ${filterClassMyOpponent}`}>
            <Card id={uData.compete?.myOpponent}/>
          </div>
          <p className='font-poppins tracking-tight text-sm text-sky-400 pt-1'>
            MY OPPONENT
          </p>
        </div>
      </div>
      {/* new data panels */}
      <div className='grid grid-cols-2 justify-center w-4/5 mx-auto max-w-5xl mt-4 gap-2'>
        <DataBox title='Last date recorded' description={uData?.compete?.recordedDate}/>
        <DataBox title='Fights in progress' description={uData?.compete?.fightInProgress}/>
        <DataBox title='Winner' description={uData?.compete?.winner}/>
        <DataBox title='Win Method' description={uData?.compete?.winMethod}/>
        <DataBox title='Fights today' description={uData?.compete?.fightsToday}/>
        <DataBox title='My points' description={uData?.compete?.points}/>
      </div>
      </>
      )}
      <div className='flex-1'></div>
      {/* buttons */}
      <div className="flex flex-col justify-center items-center mb-4 w-4/5 mx-auto max-w-5xl mt-8 gap-2 select-none">
        <div className='flex flex-col justify-center w-full gap-2'>
          {(uData?.compete?.fightInProgress === 'false' || uData?.compete?.fightInProgress === '') && (
            <button className='flex justify-center w-full p-2 rounded bg-rose-600 hover:bg-rose-700 border border-solid border-rose-400 font-oswald text-zinc-50'
            onClick={handleNewFight}>
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
        <div className='flex flex-col justify-center w-full'>
          <button className='flex justify-center w-full p-2 rounded bg-zinc-600 hover:bg-zinc-700 border border-solid border-zinc-400 font-oswald text-zinc-50'
          onClick={changeDate}>
            test btn. change date
          </button>
        </div>
      </div>
    </div>
    </Layout>
    </>
  )
}

export default Fight