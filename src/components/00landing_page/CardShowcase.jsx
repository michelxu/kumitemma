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
    <section id='collection' className='flex flex-col overflow-hidden items-end py-0 bg-gradient-to-t from-rose-900 via-rose-400 to-rose-900 border-t border-b border-rose-500'>
      <div className={`card-container-right`}>
        {renderCards()}
      </div>
    </section>
    </>
  )
}

export default CardShowcase