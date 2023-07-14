import { useContext } from "react";
import Contexto from "../../context/Contexto";
import { ArrowsPointingInIcon, XMarkIcon, ChevronDoubleDownIcon } from '@heroicons/react/24/solid' //icons
import Card from "../card/Card"
import { fighters, weights } from "../../data/data"
import { Link } from "react-router-dom";


const ManageCardPanelMobile = (props) => {
  const {id, isNewCard, visibleChange} = props;
  const {destroyCard, tradeCard, sendCardToMyCollection} = useContext(Contexto);
  const fighter = fighters?.find(fighter => fighter.id === id);

  const handleClick = () => {
    visibleChange();
  };

  //Obtener weight properties (rarity, value, card_price)
  function searchObjectByValue(obj, searchValue) {
    const values = Object.values(obj);
    return values.find((item) => item.value === searchValue) || null;
  }
  const weight = searchObjectByValue(weights, fighter.rarity)

  // Display a confirmation dialogs
  const handleDestroyCard = (id) => {
    const confirmed = window.confirm('Are you sure you want to destroy this card?');
    if (confirmed) destroyCard(id)
  }

  const handleTradeCard = (id, fighter_rarity) => {
    const confirmed = window.confirm('Are you sure you want to trade this card?');
    if (confirmed) tradeCard(id, fighter_rarity)  
  }

  return (
    <>
    {/* hide panel button */}
    <div className='w-full'>
      <button className='flex items-center justify-center w-full h-10 bg-zinc-700 rounded-t-3xl hover:bg-zinc-600'
      onClick={handleClick}>
        <ChevronDoubleDownIcon className='w-7 h-7 text-zinc-100 text-xl'/>
      </button>
    </div>
    {/* image card */}
    <div className='flex justify-center items-center py-4 bg-zinc-900'>
      <div className='p-1.5 bg-zinc-800'>
        <Card id={id}/>
      </div>
    </div>
    {/* card data */}
    <div className='flex flex-col px-2 gap-2'>
      <div className='flex flex-row items-center gap-4'>
        <p className='text-zinc-200 font-oswald italic mt-2'>
          CARD DATA
        </p>
        <p className='flex text-zinc-50 font-normal font-poppins tracking-tight mt-2 gap-1'>
          ID: 
          <span className='flex font-semibold items-center text-sm text-blue-500'>
            {fighter.id}
          </span>
        </p>
        <p className='flex text-zinc-50 font-normal font-poppins tracking-tight mt-2 gap-1'>Rarity: 
          <span className='flex font-semibold items-center text-sm text-blue-500'>
            {weight?.name?.toUpperCase()}
          </span>
        </p>
      </div>
      <p className='flex -mx-1 font-bold items-center text-sm tracking-tight text-amber-400'>
      {isNewCard 
        ? (<span className='py-0.5 px-3 rounded-2xl bg-zinc-900'>NEW CARD!</span>)
        : (<span className='text-zinc-400  py-1 px-4 rounded-2xl bg-zinc-900'>ALREADY IN MY COLLECTION</span>)
      }
      </p>
    </div>
    {/* manage buttons */}
    <p className='text-zinc-200 font-oswald italic mt-2 mb-1 px-2'>
      MANAGE
    </p>
    {isNewCard &&(
      <button className='font-oswald text-md w-full p-2 text-zinc-50 border-t border-b border-solid border-slate-600 bg-zinc-700 hover:bg-zinc-600'
      onClick={() => sendCardToMyCollection(fighter.id)}>
        SEND TO MY COLLECTION
      </button> 
    )}
    <button className='font-oswald text-md w-full p-2 text-zinc-50 border-b border-solid border-slate-600 bg-zinc-700 hover:bg-zinc-600'
    onClick={() => handleTradeCard(fighter.id, fighter.rarity)} >
      TRADE
      <span className='text-sm'>
        {` (${weight.card_price} COINS)`}
      </span>
    </button>
    <button className='font-oswald text-md w-full p-2 text-zinc-400 border-b border-solid border-slate-600 bg-zinc-700 hover:bg-zinc-600'
    onClick={() => handleDestroyCard(fighter.id)} >
      DESTROY
      <span className='text-sm'>
        {` (XP SOON)`}
      </span>
    </button>
    <Link to='/my-collection' className='font-oswald text-center text-md w-full p-2 text-amber-400 border-b border-solid border-slate-600 bg-zinc-700 hover:bg-zinc-600'>
      GO TO MY COLLECTION
    </Link>
    <div className='flex-1 p-16'></div>
    </>
  )
}

ManageCardPanelMobile.defaultProps = {
  id: 999,
  isNewCard: false,
  visibleChange: false
};

export default ManageCardPanelMobile