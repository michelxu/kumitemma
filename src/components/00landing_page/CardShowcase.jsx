import { useEffect, useState } from 'react'
import { fighters, randomizeArray } from '../../data/data'
import Card from '../card/Card'

const CardShowcase = () => {
  const [array1, setArray1] = useState([])

  useEffect(() => {
    setArray1(randomizeArray(fighters))
  }, [])

  const renderCards = () => {
    return array1.map((card) => (
      <div key={card.id} className='transform scale-75 -mx-4'>
        <Card id={card.id} />
      </div>
    ))
  }

  return (
    <>
    <div className='flex flex-col overflow-hidden items-center bg-gradient-to-t from-zinc-900 via-zinc-800 to-zinc-900 py-0'>
      <div className={`card-container-right`}>
        {renderCards()}
      </div>
    </div>
    </>
  )
}

export default CardShowcase