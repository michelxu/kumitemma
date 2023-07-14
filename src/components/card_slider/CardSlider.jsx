import Card from '../card/Card'
import { fighters, randomizeArray } from '../../data/data'
import { useEffect, useState } from 'react'

const CardSlider = ({position}) => {
  const [array1, setArray1] = useState([])

  useEffect(() => {
    setArray1(randomizeArray(fighters))
  }, [])

  const renderCards = () => {
    //const cards_array = randomizeArray(fighters)
    return array1.map((card) => (
      <div key={card.id} className='transform scale-75 -my-14 -mx-4'>
        <Card id={card.id} />
      </div>
    ))
  }

  return (
    <>
    <div className={`card-container-${position}`}>
      {renderCards()}
    </div>
    </>
  )
}

export default CardSlider