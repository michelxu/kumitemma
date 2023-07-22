import React, { useContext, useEffect, useState } from 'react' /* react */
import { useNavigate } from 'react-router-dom'
import Contexto from '../../context/Contexto'
import Layout from '../../components/layout/Layout' /* components */
import Card from '../../components/card/Card'
import { getFighter, getSumArray } from '../../utils/utils'
import { getRewardPoints, getWinnerByScorecard, getWinMethodByScorecard, simulateARound } from '../../utils/compete_utils'

const InProgress = () => {
  const navegacion = useNavigate();
  const {uData, setUData, getUserDataByUsername, setUserDataProperty} = useContext(Contexto)
  const [index, setIndex] = useState(0)
  const [isEnded, setIsEnded] = useState(null) //boolean
  const [rounds, setRounds] = useState([]) //Output ['overall', 'bjj', 'striking']
  const [myFighter, setMyFighter] = useState({})
  const [myOpponent, setMyOpponent] = useState({})
  const [renderRounds, setRenderRounds] = useState([false, false, false])
  const [jsxElements, setJsxElements] = useState([]) // no implementado

  // Define the classes for each filter
  const filterWin = 'saturate-150 contrast-125'
  const filterLoss = 'grayscale contrast-125'
  // Determine which filter to apply based on the winner
  const filterClassMyFighter = uData?.compete?.winner === 'myFighter' ? filterWin : uData?.compete?.winner === 'myOpponent' || uData?.compete?.winner === 'Draw' ? filterLoss : ''
  const filterClassMyOpponent = uData?.compete?.winner === 'myOpponent' ? filterWin : uData?.compete?.winner === 'myFighter' || uData?.compete?.winner === 'Draw' ? filterLoss : ''


  /* *********** useEffect inicial *********** */
  useEffect(() => {
    if (uData && Object.keys(uData).length === 0) return //espera a que cargue uData
    if (uData.compete.fightInProgress === 'false'){
      navegacion('/fight')
      return
    }

    // Mostrar/ocultar scorecard panel
    manageScorecardPanel()

    // This sets compete.winner and compete.winMethod
    verifyFightEnd()

    // ¿Se han completado los rounds?
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

    //Set useState variables • solo al inicio
    if (myFighter && Object.keys(myFighter).length === 0){
      setMyFighter(getFighter(uData.compete.myFighter))
      setMyOpponent(getFighter(uData.compete.myOpponent))
      setRounds([...uData.compete.rounds])
    }
  }, [uData])

  /* *********** manage panel interactivo *********** */ 
  /* aún no implementado */
  const managePanel = () => {
    const elements = [
      <div key={0} className='text-zinc-50'> ...</div>,
      <p key={1} className='text-zinc-50 bounce-in-top'>{uData?.compete?.rounds[0]?.toUpperCase()}</p>,
      <p key={2} className='text-zinc-50 bounce-in-top'>{uData?.compete?.roundsWinners[0]}</p>,
      (
        <div key={3} className='flex flex-row bounce-in-top'>
          <p className='text-zinc-50'>
            {uData.compete.scorecard.myFighter[0]} / {uData.compete.scorecard.myOpponent[0]}
          </p>
        </div>
      ),
    ]

    // Enviarlo a una variable en useState
    setJsxElements([...elements])
  }

  /* *********** simular round fn *********** */
  const simulateRound = () => {
    // Logs iniciales
    console.log(`index: ${index}, rounds[${index}]: ${rounds[index]}`);
    console.log(`MyFig. ${myFighter.name} ${rounds[index]} • ${myFighter.stats[rounds[index]]}`)
    console.log(`MyOpp. ${myOpponent.name} ${rounds[index]} • ${myOpponent.stats[rounds[index]]}`)

    // Simular el round • Obtener un ganador y un winMethod
    const {winner, myFighterWinPercentage, winMethod} = simulateARound(myFighter, myOpponent, rounds[index]) //Output: myFighter || myOpponent
    setIndex(index+1)

    // Definir scorecard para myFighter y myOpponent
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
    // Añadir un nuevo round al [] de scorecard
    const newScorecardMyFArray = [...uData.compete.scorecard.myFighter, roundScoreMyF]
    const newScorecardMyOppArray = [...uData.compete.scorecard.myOpponent, roundScoreMyOpp]
    const newMyOddsArray = [...uData.compete.scorecard.myOdds, myFighterWinPercentage]
    const newRoundsWinnersArray = [...uData.compete.roundsWinners, winner];

    // Actualizar localstorage
    setUserDataProperty(uData.username, 'compete.scorecard.myFighter', newScorecardMyFArray)
    setUserDataProperty(uData.username, 'compete.scorecard.myOpponent', newScorecardMyOppArray)
    setUserDataProperty(uData.username, 'compete.scorecard.myOdds', newMyOddsArray)
    setUserDataProperty(uData.username, 'compete.roundsWinners', newRoundsWinnersArray)
    
    /*Setear variable isEnded (useState), esta muestra el botón 'End Fight', y dicho botón setea fightInProgress como 'false' */ 
    // ::: Hay un TKO/SUB
    if (winMethod === 'TKO' || winMethod === 'SUB') setIsEnded(true)
    // ::: Es el último round
    if (uData.compete.rounds.length === uData.compete.scorecard.myFighter.length +1) setIsEnded(true)

    // Actualizar TODO useState
    setUData(getUserDataByUsername(uData.username))
  }

  /* *********** terminar pelea fn *********** */
  const endFight = () => {
    //const fightWinner = getWinnerByScorecard(uData.compete.scorecard.myFighter, uData.compete.scorecard.myOpponent)
    const newPoints = getRewardPoints(uData.compete.scorecard.myFighter, uData.compete.scorecard.myOpponent)
    const currentPoints = uData.compete.points

    // Actualizar localstorage
    //setUserDataProperty(uData.username, 'compete.winner', fightWinner)
    setUserDataProperty(uData.username, 'compete.points', currentPoints + newPoints)
    setUserDataProperty(uData.username, 'compete.fightInProgress', 'false')

    // Actualizar todo useState
    setUData(getUserDataByUsername(uData.username))
    navegacion('/fight')
  }

  /* *********** verificar si la pelea terminó (set winner) *********** */
  const verifyFightEnd = () => {
    if (uData.compete.winner != '') return

    // ¿Se han completado los rounds?
    if (uData.compete.scorecard.myFighter.length === uData.compete.rounds.length
    || uData.compete.scorecard.myFighter.includes(0)
    || uData.compete.scorecard.myOpponent.includes(0)) {
      //Set winner
      const fightWinner = getWinnerByScorecard(uData.compete.scorecard.myFighter, uData.compete.scorecard.myOpponent)
      const winMethod = getWinMethodByScorecard(uData.compete.scorecard.myFighter, uData.compete.scorecard.myOpponent)

      // Actualizar localstorage
      setUserDataProperty(uData.username, 'compete.winner', fightWinner)
      setUserDataProperty(uData.username, 'compete.winMethod', winMethod)

      // Actualizar todo useState
      setUData(getUserDataByUsername(uData.username))
    }
  }

  /* *********** manage scorecards panel *********** */
  const manageScorecardPanel = () => {
    if (uData.compete.roundsWinners.length === 1) setRenderRounds([true, false, false])
    if (uData.compete.roundsWinners.length === 2) setRenderRounds([true, true, false])
    if (uData.compete.roundsWinners.length === 3) setRenderRounds([true, true, true])
  }

  return (
    <>
    <Layout>
    {uData && (
      <>
      {/* fighters cards */}
      <div className="flex flex-row justify-center items-center mb-4 mx-auto max-w-5xl mt-4 gap-4 select-none">
        <div className={`transform scale-75 sm:scale-100 -m-6 sm:m-0 ${filterClassMyFighter}`}>
          <Card id={uData.compete?.myFighter}/>
          <p className='font-poppins tracking-tight text-sm text-rose-400 pt-1'>
            MY FIGHTER
          </p>
        </div>
        <p className='font-oswald italic font-medium tracking-tighter text-3xl text-zinc-200 me-2'>
          VS
        </p>
        <div className={`transform scale-75 sm:scale-100 -m-6 sm:m-0 ${filterClassMyOpponent}`}>
          <Card id={uData.compete?.myOpponent}/>
          <p className='font-poppins tracking-tight text-sm text-sky-400 pt-1'>
            MY OPPONENT
          </p>
        </div>
      </div>
      {/* interactive data */}
      {/** 
      <div className='flex flex-col justify-center items-center mx-auto h-32 w-4/5 max-w-5xl mb-8 mt-4 rounded border border-zinc-500 select-none'
      >
        <p className='font-oswald tracking-tighter text-left text-xl text-zinc-400'>
          ROUND {index} / {uData?.compete?.rounds[index-1]?.toUpperCase()}
        </p>
        <p className='font-oswald tracking-tight text-6xl text-zinc-50'>
          {uData?.compete?.roundsWinners[index-1]?.toUpperCase()}
        </p>
      </div>
      */}
      {/* buttons */}
      <div className="flex flex-col justify-center items-center mb-4 mx-auto w-4/5 max-w-5xl mt-4 gap-4 select-none">
        <div className='flex flex-col justify-center w-full gap-2'>
          {!isEnded
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
      {/* ********** fight data ********** */}
      <div className='flex flex-col mx-auto w-4/5 max-w-5xl mb-4 mt-4 gap-2'>
        {/* fight winner */}
        {uData?.compete?.winner != "" && (
        <div className='flex flex-col justify-between items-center text-zinc-200 font-oswald tracking-tight rounded bg-zinc-600'>
          {/* top */}
          <div className='flex justify-center w-full bg-zinc-800 rounded-t'>
            <p className='text-center text-xs text-zinc-400'>WINNER</p>
          </div>
          {/* body */}
          <div className='flex flex-col justify-center items-center w-full px-2 py-1'>
            <p className='text-3xl text-amber-300 uppercase'>{uData?.compete?.winner}</p>
            <p className='text-md text-amber-300 uppercase'>{uData?.compete?.winMethod}</p>
          </div>
        </div>
        )}
        {/* rounds header */}
        <div className='flex flex-row justify-between px-2 py-0.5 text-zinc-400 text-sm font-oswald tracking-tight rounded bg-zinc-800'>
          <p>MY FIGHTER</p>
          <p>ROUNDS</p>
          <p>MY OPPONENT</p>
        </div>
        {/* round 1 */}
        {renderRounds[0] && (
        <div className='flex flex-col justify-between items-center text-zinc-200 font-oswald tracking-tight rounded bg-zinc-600'>
          {/* top */}
          <div className='flex justify-center w-full bg-zinc-500 rounded-t'>
            <p className='text-center text-xs'>1</p>
          </div>
          {/* body */}
          <div className='flex flex-row justify-between items-center w-full px-2 py-1'>
            <div className='flex flex-row items-end gap-1'>
              <p className='text-4xl'>{myFighter.stats.overall}</p>
              <p className='text-md'>{uData.compete.scorecard.myOdds[0]}%</p>
            </div>
            <p className='text-3xl mt-1 text-zinc-50'>OVERALL</p>
            <div className='flex flex-row items-end gap-1'>
              <p className='text-md'>{100-uData.compete.scorecard.myOdds[0]}%</p>
              <p className='text-4xl'>{myOpponent.stats.overall}</p>
            </div>
          </div>
          {/* bottom */}
          <div className='flex justify-between w-full px-2 bg-zinc-600 rounded-b'>
            <p className='text-center text-md'>{uData.compete.roundsWinners[0] === 'myFighter' ? <span>W</span> : <span>L</span>}</p>
            <p className='text-center text-md text-amber-300'>{uData.compete.scorecard.myFighter[0]} / {uData.compete.scorecard.myOpponent[0]}</p>
            <p className='text-center text-md'>{uData.compete.roundsWinners[0] === 'myOpponent' ? <span>W</span> : <span>L</span>}</p>
          </div>
        </div>
        )}
        {/* round 2 */}
        {renderRounds[1] && (
        <div className='flex flex-col justify-between items-center text-zinc-200 font-oswald tracking-tight rounded bg-zinc-600'>
          {/* top */}
          <div className='flex justify-center w-full bg-zinc-500 rounded-t'>
            <p className='text-center text-xs'>2</p>
          </div>
          {/* body */}
          <div className='flex flex-row justify-between items-center w-full px-2 py-1'>
            <div className='flex flex-row items-end gap-1'>
              <p className='text-4xl'>{myFighter.stats[uData.compete.rounds[1]]}</p>
              <p className='text-md'>{uData.compete.scorecard.myOdds[1]}%</p>
            </div>
            <p className='text-3xl mt-1 text-zinc-50'>{rounds[1]?.toUpperCase()}</p>
            <div className='flex flex-row items-end gap-1'>
              <p className='text-md'>{100-uData.compete.scorecard.myOdds[1]}%</p>
              <p className='text-4xl'>{myOpponent.stats[uData.compete.rounds[1]]}</p>
            </div>
          </div>
          {/* bottom */}
          <div className='flex justify-between w-full px-2 bg-zinc-600 rounded-b'>
            <p className='text-center text-md'>{uData.compete.roundsWinners[1] === 'myFighter' ? <span>W</span> : <span>L</span>}</p>
            <p className='text-center text-md text-amber-300'>{uData.compete.scorecard.myFighter[1]} / {uData.compete.scorecard.myOpponent[1]}</p>
            <p className='text-center text-md'>{uData.compete.roundsWinners[1] === 'myOpponent' ? <span>W</span> : <span>L</span>}</p>
          </div>
        </div>
        )}
        {/* round 3 */}
        {renderRounds[2] && (
        <div className='flex flex-col justify-between items-center text-zinc-200 font-oswald tracking-tight rounded bg-zinc-600'>
          {/* top */}
          <div className='flex justify-center w-full bg-zinc-500 rounded-t'>
            <p className='text-center text-xs'>3</p>
          </div>
          {/* body */}
          <div className='flex flex-row justify-between items-center w-full px-2 py-1'>
            <div className='flex flex-row items-end gap-1'>
              <p className='text-4xl'>{myFighter.stats[uData.compete.rounds[2]]}</p>
              <p className='text-md'>{uData.compete.scorecard.myOdds[2]}%</p>
            </div>
            <p className='text-3xl mt-1 text-zinc-50'>{rounds[2]?.toUpperCase()}</p>
            <div className='flex flex-row items-end gap-1'>
              <p className='text-md'>{100-uData.compete.scorecard.myOdds[2]}%</p>
              <p className='text-4xl'>{myOpponent.stats[uData.compete.rounds[2]]}</p>
            </div>
          </div>
          {/* bottom */}
          <div className='flex justify-between w-full px-2 bg-zinc-600 rounded-b'>
            <p className='text-center text-md'>{uData.compete.roundsWinners[2] === 'myFighter' ? <span>W</span> : <span>L</span>}</p>
            <p className='text-center text-md text-amber-300'>{uData.compete.scorecard.myFighter[2]} / {uData.compete.scorecard.myOpponent[2]}</p>
            <p className='text-center text-md'>{uData.compete.roundsWinners[2] === 'myOpponent' ? <span>W</span> : <span>L</span>}</p>
          </div>
        </div>
        )}
        {/* rounds message */}
        {!renderRounds[0] && (
          <div className='flex mx-auto'>
            <p className='text-zinc-400 font-poppins text-sm tracking-tight'>s c o r e c a r d . . .</p>
          </div>
        )}
      </div>
      </>
      )}
    </Layout>
    </>
  )
}

export default InProgress