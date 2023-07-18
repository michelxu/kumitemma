import React, { useContext, useEffect, useState } from 'react' /* react */
import { useNavigate } from 'react-router-dom'
import Contexto from '../../context/Contexto'
import Layout from '../../components/layout/Layout' /* components */
import Card from '../../components/card/Card'
import { getFighter, getSumArray } from '../../utils/utils'
import { getRewardPoints, getWinnerByScorecard, simulateARound } from '../../utils/compete_utils'

const InProgress = () => {
  const navegacion = useNavigate();
  const {uData, setUData, getUserDataByUsername, setUserDataProperty} = useContext(Contexto)
  const [index, setIndex] = useState(0)
  const [isEnded, setIsEnded] = useState(null)
  const [rounds, setRounds] = useState([]) //Output ['overall', 'bjj', 'striking']
  const [myFighter, setMyFighter] = useState({})
  const [myOpponent, setMyOpponent] = useState({})

  useEffect(() => {
    if (uData && Object.keys(uData).length === 0) return //espera a que cargue uData

    // LOG: ¿Se han completado los rounds?
    if (uData.compete.scorecard.myFighter.length === uData.compete.rounds.length) {
      console.log('Se han completado los rounds. Termine la pelea.')
      setIsEnded(true)
    }
    if (uData.compete.scorecard.myFighter.includes(0) || uData.compete.scorecard.myOpponent.includes(0)) {
      console.log('Hubo una finalización. Termine la pelea.')
      setIsEnded(true)
    }


    console.log('Rounds jugados:', uData.compete.scorecard.myFighter.length)
    setIndex(uData.compete.scorecard.myFighter.length) //Output: 1, 2 o 3 (número de rounds jugados)

    if (myFighter && Object.keys(myFighter).length === 0){
      setMyFighter(getFighter(uData.compete.myFighter))
      setMyOpponent(getFighter(uData.compete.myOpponent))
      setRounds([...uData.compete.rounds])
    }

  }, [uData])

  //Simular round fn
  const simulateRound = () => {
    console.log(`index: ${index}, rounds[index]: ${rounds[index]}`);
    console.log(`MyFig. ${myFighter.name} ${rounds[index]} • ${myFighter.stats[rounds[index]]}`)
    console.log(`MyOpp. ${myOpponent.name} ${rounds[index]} • ${myOpponent.stats[rounds[index]]}`)
    const {winner, myFighterWinPercentage, winMethod} = simulateARound(myFighter, myOpponent, rounds[index]) //Output: myFighter || myOpponent
    setIndex(index+1)

    //¿Quién ganó el round? Sumar 10 o 9 en 
    let roundScoreMyF
    let roundScoreMyOpp
    switch (winMethod) {
      case '10-9':
        roundScoreMyF = winner === 'myFighter' ? 10 : 9;
        roundScoreMyOpp = winner === 'myFighter' ? 9 : 10;
        break;
      case '10-8':
        roundScoreMyF = winner === 'myFighter' ? 10 : 8;
        roundScoreMyOpp = winner === 'myFighter' ? 8 : 10;
        break;
      case 'TKO':
        roundScoreMyF = winner === 'myFighter' ? 'KO/TKO' : 0;
        roundScoreMyOpp = winner === 'myFighter' ? 0 : 'KO/TKO';
        break;
      case 'SUB':
        roundScoreMyF = winner === 'myFighter' ? 'SUB' : 0;
        roundScoreMyOpp = winner === 'myFighter' ? 0 : 'SUB';
        break;
    }

    const newScorecardMyFArray = [...uData.compete.scorecard.myFighter, roundScoreMyF]
    const newScorecardMyOppArray = [...uData.compete.scorecard.myOpponent, roundScoreMyOpp]
    const newRoundsWinnersArray = [...uData.compete.roundsWinners, winner];


    // Actualizar localstorage
    setUserDataProperty(uData.username, 'compete.scorecard.myFighter', newScorecardMyFArray)
    setUserDataProperty(uData.username, 'compete.scorecard.myOpponent', newScorecardMyOppArray)
    setUserDataProperty(uData.username, 'compete.roundsWinners', newRoundsWinnersArray)
    
    // fightInProgress 'false'
    // ::: Hay un TKO/SUB
    //if (winMethod === 'TKO' || winMethod === 'SUB') setUserDataProperty(uData.username, 'compete.fightInProgress', 'false')
    if (winMethod === 'TKO' || winMethod === 'SUB') setIsEnded(true)

    // ::: Es el último round
    //if (uData.compete.rounds.length === uData.compete.scorecard.myFighter.length +1) setUserDataProperty(uData.username, 'compete.fightInProgress', 'false')
    if (uData.compete.rounds.length === uData.compete.scorecard.myFighter.length +1) setIsEnded(true)

    // *Actualizar todo useState
    setUData(getUserDataByUsername(uData.username))
  }

  //Terminar pelea
  const endFight = () => {
    const fightWinner = getWinnerByScorecard(uData.compete.scorecard.myFighter, uData.compete.scorecard.myOpponent)
    const newPoints = getRewardPoints(uData.compete.scorecard.myFighter, uData.compete.scorecard.myOpponent)
    const currentPoints = uData.compete.points

    // Actualizar localstorage
    setUserDataProperty(uData.username, 'compete.winner', fightWinner)
    setUserDataProperty(uData.username, 'compete.points', currentPoints + newPoints)
    setUserDataProperty(uData.username, 'compete.fightInProgress', 'false')

    // *Actualizar todo useState
    setUData(getUserDataByUsername(uData.username))
    navegacion('/fight')
  }

  return (
    <>
    <Layout>
    {uData && (
      <>
      {/* fighters cards */}
      <div className="flex flex-row justify-center items-center mb-4 mx-auto max-w-5xl mt-8 gap-4 select-none">
        <div className='transform scale-75 sm:scale-100 -m-6 sm:m-0'>
          <Card id={uData.compete?.myFighter}/>
          <p className='font-poppins tracking-tight text-sm text-rose-400 pt-1'>
            MY FIGHTER
          </p>
        </div>
        <p className='font-oswald italic font-medium tracking-tighter text-3xl text-zinc-200 me-2'>
          VS
        </p>
        <div className='transform scale-75 sm:scale-100 -m-6 sm:m-0'>
          <Card id={uData.compete?.myOpponent}/>
          <p className='font-poppins tracking-tight text-sm text-sky-400 pt-1'>
            MY OPPONENT
          </p>
        </div>
      </div>
      {/* interactive data */}
      <div className='flex flex-col justify-center items-center mx-auto max-w-5xl mb-8 mt-4 bounce-in-top'>
        <p className='font-oswald tracking-tighter text-left text-xl text-zinc-400'>
          ROUND {index} / {uData?.compete?.rounds[index-1]?.toUpperCase()}
        </p>
        <p className='font-oswald tracking-tight text-6xl text-zinc-50'>
          {uData?.compete?.roundsWinners[index-1]?.toUpperCase()}
        </p>
      </div>
      {/* compete data */}
      <div className='flex flex-col justify-center items-center mx-auto max-w-5xl mb-8 mt-8'>
        <div className='flex flex-row justify-between text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Rounds:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.rounds?.join(' / ')}</p>
        </div>
        <div className='flex flex-row justify-between items-center text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>My scorecard:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.scorecard?.myFighter?.join(' / ')}</p>
        </div>
        <div className='flex flex-row justify-between items-center text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Opp scorecard:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.scorecard?.myOpponent?.join(' / ')}</p>
        </div>
        <div className='flex flex-row justify-between items-center text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Fights in progress:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.fightInProgress}</p>
        </div>
        <div className='flex flex-row justify-between items-center text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Fights this day:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.fightsToday}</p>
        </div>
        <div className='flex flex-row justify-between items-center text-zinc-50 gap-2'>
          <p className='font-regular tracking-tight'>Winner:</p>
          <p className='font-medium tracking-tight text-amber-300'>{uData.compete?.winner}</p>
        </div>
      </div>
      </>
      )}
      {/* buttons */}
      <div className="flex flex-col justify-center items-center mb-8 mx-auto max-w-5xl mt-8 gap-4 select-none">
        <div className='flex flex-col justify-center w-4/5 gap-2'>
          {/*uData?.compete?.fightInProgress === 'true'*/ !isEnded
            ? (
              <button className='flex justify-center w-full p-2 rounded bg-rose-600 hover:bg-rose-700 border border-solid border-rose-400 font-oswald text-zinc-50'
              onClick={simulateRound}>
                START ROUND {index+1}
              </button>
            )
            : (
              <button className='flex justify-center w-full p-2 rounded bg-rose-600 hover:bg-rose-700 border border-solid border-rose-400 font-oswald text-zinc-50'
              onClick={endFight}>
                END FIGHT
              </button>
            )
          }
        </div>
      </div>
    </Layout>
    </>
  )
}

export default InProgress