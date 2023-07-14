import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../../context/Contexto';
import {selectRandomCard} from '../../data/data'; //functions & files
import { GiTwoCoins } from "react-icons/gi"; //icons


const PanelPack = ({props}) => {
  const {idpack, title, image, quantity, description, to, index_pack, price, type} = props;
  const {uData, setUData, removeItemFromArrayByIndex, updateUserDataProperty, getUserDataByUsername} = useContext(Contexto)
  const navegacion = useNavigate()

  //Render content conditionally /my-packs or /store-packs
  let renderedContent;
  if (type === 'mypacks'){
    renderedContent = (
      <>
      <div className='flex flex-col w-11/12 sm:w-4/5 lg:min-w-[700px] lg:max-w-[700px] h-[300px] sm:h-[300px] bg-slate-800 border border-solid border-slate-500 mx-4 rounded select-none'>
        <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase'>
          {title}
        </h1>
        <div className='flex flex-row justify-start items-center px-4 pt-1 gap-6'>
          <img src={image} alt='Pack' className='h-52 sm:h-56 pointer-events-none'/>
          <div className='flex flex-col gap-2 -mt-1'>
            <h2 className='font-regular font-oswald text-sm sm:text-base text-zinc-400'>
              QUANTITY
            </h2>
            <h2 className='font-light font-oswald text-sm sm:text-base text-zinc-100 truncate-lines-2 md:truncate-none'>
              {quantity} cards
            </h2>
            <h2 className='font-regular font-oswald text-sm sm:text-base text-zinc-400'>
              DESCRIPTION
            </h2>
            <h2 className='font-light font-oswald text-sm sm:text-base text-zinc-100 truncate-lines-2 md:truncate-none'>
              {description}
            </h2>
            <button className='w-40 sm:w-[250px] p-3 text-white font-oswald rounded bg-rose-500 hover:bg-rose-600 border border-solid border-rose-400'
              onClick={() => openMyPack()}>
              OPEN PACK
            </button>
          </div>
        </div>
      </div>
      </>
    )
  }

  if (type === 'store'){
    renderedContent = (
      <>
      <div className='flex flex-col w-11/12 sm:w-4/5 lg:min-w-[700px] lg:max-w-[700px] h-[300px] sm:h-[300px] bg-slate-800 border border-solid border-slate-500 mx-4 rounded select-none'>
        <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase'>
          {title}
        </h1>
        <div className='flex flex-row justify-start items-center px-4 pt-1 gap-6'>
          <img src={image} alt='Pack' className='h-52 sm:h-56 pointer-events-none'/>
          <div className='flex flex-col gap-2 -mt-1'>
            <h2 className='font-regular font-oswald text-sm sm:text-base text-zinc-400'>
              QUANTITY
            </h2>
            <h2 className='font-light font-oswald text-sm sm:text-base text-zinc-100 truncate-lines-2 md:truncate-none'>
              {quantity} cards
            </h2>
            <h2 className='font-regular font-oswald text-sm sm:text-base text-zinc-400'>
              DESCRIPTION
            </h2>
            <h2 className='font-light font-oswald text-sm sm:text-base text-zinc-100 truncate-lines-2 md:truncate-none'>
              {description}
            </h2>
            <button className='w-40 sm:w-[250px] p-3 text-white font-oswald rounded bg-rose-500 hover:bg-rose-600 border border-solid border-rose-400'
              onClick={() => buyStorePack()}>
              <span className='flex justify-center items-center text-xl gap-1'>
                {price}
                <GiTwoCoins/>
              </span>
            </button>
          </div>
        </div>
      </div>
      </>
    )
  }


  //Open a pack from the store • Check coins and substract
  const buyStorePack = () => {
    if (uData.coins < price){
      alert('You dont have enough coins to purchase this pack.')
      return
    }
    if(uData.unassigned?.length > 0){
      alert('You have unassigned items. Manage them first.')
      return
    }
    
    //Set opening a false
    localStorage.setItem('hasViewedOpening', false);

    //1. Actualizar coin balance
    const newCoins = subtractCoins(uData.coins, price) 
    updateUserDataProperty(uData.username, 'coins', newCoins)

    //2. Abrir el pack • Obtener las cartas
    const cards_array = getCardsByPackQuantity(quantity)

    //3. Enviar a unassigned • local y useState
    updateUserDataProperty(uData.username, 'unassigned', cards_array)

    //4. Update useState
    setUData(getUserDataByUsername(uData.username))

    //5. Ir a unassigned
    navegacion("/opening")
  }

  //Open a pack I already have in My Packs (no cost)
  const openMyPack = () => {
    if(uData.unassigned.length > 0){
      alert('You have unassigned items. Manage them first.')
      return
    }

    //Set opening a false
    localStorage.setItem('hasViewedOpening', false);

    console.log(`Pack [id ${idpack}] [index ${index_pack}] por abrir.`);

    //1. Abrir el pack • Obtener las cartas
    const cards_array = getCardsByPackQuantity(quantity)

    //2. Enviar a unassigned • local y useState
    updateUserDataProperty(uData.username, 'unassigned', cards_array)

    //3. Eliminar el pack
    removeItemFromArrayByIndex(uData.username, 'packs', index_pack)

    //4. Update useState
    setUData(getUserDataByUsername(uData.username))

    //5. Ir a unassigned
    navegacion("/opening")
  }

  /* u t i l s */
  //Obtener n cartas de un pack • sin condiciones (solo evita duplicados)
  const getCardsByPackQuantity = (quantity) => {
    let arrayOfIds = [];
    for (let i = 0; i < quantity; i++) {
      let fighter;
      do {
        fighter = selectRandomCard();
        if (arrayOfIds.includes(fighter.id)) {
          console.log(`Duplicate fighter.id detected: ${fighter.id}`);
        }
      } while (arrayOfIds.includes(fighter.id));

      arrayOfIds.push(fighter.id);
      console.log('Array of IDs to push: ', arrayOfIds);
    }
    return arrayOfIds;
  }
  //Restar pack price a mis coins
  const subtractCoins = (mycoins, packprice) => {
    return mycoins - packprice
  }

  return (
    <>
    {renderedContent}
    </>
  )
}

export default PanelPack