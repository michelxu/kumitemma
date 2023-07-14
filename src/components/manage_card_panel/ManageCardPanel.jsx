import { useContext } from "react";
import Contexto from "../../context/Contexto";
import Card from "../card/Card"
import { fighters, weights } from "../../data/data"
import { Link } from "react-router-dom";


const ManageCardPanel = (props) => {
  const {id, isNewCard} = props;
  const {uData, setUData, updateUserDataProperty, getUserDataByUsername, removeItemFromArray} = useContext(Contexto);
  const fighter = fighters?.find(fighter => fighter.id === id);

  //Obtener weight properties (rarity, value, card_price)
  function searchObjectByValue(obj, searchValue) {
    const values = Object.values(obj);
    return values.find((item) => item.value === searchValue) || null;
  }
  const weight = searchObjectByValue(weights, fighter.rarity)

  /* m a n a g e   c a r d s */
  //Send card to my collection
  const sendCardToMyCollection = (id) => {
    const isIncluded = uData.myCollection.includes(id)
    if (isIncluded) {
      alert('You already have this card in your collection.')
      return
    }
    console.log('Cart to save: ', id);

    updateUserDataProperty(uData.username, 'myCollection', id) //Añadirlo a myCollection
    removeItemFromArray(uData.username, 'unassigned', id) //Eliminarlo de unassigned

    setUData(getUserDataByUsername(uData.username)) //update useState
  }

  //Trade card
  const tradeCard = (id) => {
    console.log('Cart to trade: ', id);
    const coins = uData.coins + weight.card_price;

    updateUserDataProperty(uData.username, 'coins', coins) //Actualizar coins
    removeItemFromArray(uData.username, 'unassigned', id) //Eliminarlo de unassigned
    setUData(getUserDataByUsername(uData.username)) //update useState
  }

  //Destroy card
  const destroyCard = (id) => {
    console.log('Cart to destroy: ', id);
    removeItemFromArray(uData.username, 'unassigned', id)

    setUData(getUserDataByUsername(uData.username)) //update useState
  }

  // Display a confirmation dialogs
  const handleDestroyCard = (id) => {
    const confirmed = window.confirm('Are you sure you want to destroy this card?');
    if (confirmed) destroyCard(id)
  }

  const handleTradeCard = (id) => {
    const confirmed = window.confirm('Are you sure you want to trade this card?');
    if (confirmed) tradeCard(id)  
  }

  return (
    <>
    <div className='flex flex-col fixed sm:w-[250px] md:w-96'>
    <div className='flex justify-center items-center px-2 py-6 bg-zinc-900'>
      <div className='p-2 bg-zinc-800'>
        <Card id={id}/>
      </div>
    </div>
    {/* card data */}
    <div className='flex flex-col py-1 px-3 gap-1'>
      <p className='text-zinc-200 font-oswald italic mt-2'>CARD DATA</p>
      <p className='flex text-zinc-50 font-normal font-poppins tracking-tight gap-1'>ID: 
        <span className='flex font-semibold items-center text-sm text-blue-500'>
          {fighter.id}
        </span>
      </p>
      <p className='flex text-zinc-50 font-normal font-poppins tracking-tight gap-1'>Rarity: 
        <span className='flex font-semibold items-center text-sm text-blue-500'>
          {weight?.name?.toUpperCase()}
        </span>
      </p>
      <p className='flex font-bold items-center text-sm tracking-tight text-amber-400'>
      {isNewCard 
        ? (<span className='py-1 px-4 rounded-2xl bg-zinc-900'> NEW CARD! </span>)
        : (<span className='text-zinc-400 py-1 px-4 rounded-2xl bg-zinc-900'> ALREADY IN MY COLLECTION </span>)
      }
      </p>
    </div>
    {/* manage buttons */}
    <p className='text-zinc-200 font-oswald italic mt-2 mb-1 py-1 px-3'>MANAGE</p>
    {isNewCard &&(
      <button className='font-oswald text-md w-full p-2 text-zinc-50 border-t border-b border-solid border-slate-600 bg-zinc-700 hover:bg-zinc-600'
      onClick={() => sendCardToMyCollection(fighter.id)}>
        SEND TO MY COLLECTION
      </button> 
    )}
    <button className='font-oswald text-md w-full p-2 text-zinc-50 border-b border-solid border-slate-600 bg-zinc-700 hover:bg-zinc-600'
    onClick={() => handleTradeCard(fighter.id)}>
      TRADE
      <span className='text-sm'>
        {` (${weight.card_price} COINS)`}
      </span>
    </button>
    <button className='font-oswald text-md w-full p-2 text-zinc-400 border-b border-solid border-slate-600 bg-zinc-700 hover:bg-zinc-600'
    onClick={() => handleDestroyCard(fighter.id)}>
      DESTROY
      <span className='text-sm'>
        {` (XP SOON)`}
      </span>
    </button>
    <Link to='/my-collection' className='font-oswald text-center text-md w-full p-2 text-amber-400 border-b border-solid border-slate-600 bg-zinc-700 hover:bg-zinc-600'>
      GO TO MY COLLECTION
    </Link>
    </div>
    </>
  )
}

ManageCardPanel.defaultProps = {
  id: 999,
  isNewCard: false
};

export default ManageCardPanel