import { useContext, useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import Contexto from "../context/Contexto"
import { fighters } from '../data/data'; /* data  */
import Card from "../components/card/Card";
import ManageCardPanel from "../components/manage_card_panel/ManageCardPanel";
import { useNavigate } from "react-router-dom";
import ManageCardPanelMobile from "../components/manage_card_panel/ManageCardPanelMobile";
import { getAllFighters, getRarityPrice } from "../utils/utils";

const Unassigned = () => {
  const {uData, setUData, updateUserDataProperty, setUserDataProperty, getUserDataByUsername, removeItemFromArray} = useContext(Contexto);
  const [propID, setPropID] = useState()
  const [propNewCard, setPropNewCard] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const navegacion = useNavigate()

  useEffect(() => {
    if (uData && Object.keys(uData).length === 0) return //espera a que cargue uData
    if (uData && uData.unassigned.length === 0){
      navegacion('/store') //si está vacío vuelve al home
      return
    }

    // Setear true para /Opening (solo se puede visitar 1 por pack)
    localStorage.setItem('hasViewedOpening', true);

    console.log('Unassigned [0]:', uData.unassigned[0])
    setPropID(uData.unassigned[0])
  }, [uData])

  //Is New Card?
  useEffect(() => {
    const isNewCard = !uData.myCollection?.includes(propID)
    setPropNewCard(isNewCard)
    //console.log('isnew card', isNewCard)
  }, [propID])

  //prop enviada al componente para ocultar el panel que se abre desde movil
  const handleVisibleComponent = () => {
    setIsVisible(false)
  };

  //Al hacer click en una carta
  const manageClickItem = (fighterId) => {
    setPropID(fighterId) //cambiar id para ManageCard component
    setIsVisible(true) //movil panel
  }

  /* Send all items to My Collection */
  const sendAllCardsToMyCollection = () => {
    const newUnassigned = [];
    const newMyCollection = [];

    //Recorrer unassigned, por cada carta:
    uData.unassigned.map((cardID) => {
      //La carta está también en myCollection?
      const isIncluded = uData.myCollection.includes(cardID)
      isIncluded
      ? newUnassigned.push(cardID) //Sí: Mantener en unassigned
      : newMyCollection.push(cardID) //No: Enviar a myCollection
    })

    //Mover a myCollection • Update (push, no sobreescribe)
    updateUserDataProperty(uData.username, 'myCollection', newMyCollection)

    //Sobre escribir unassigned
    setUserDataProperty(uData.username, 'unassigned', newUnassigned)

    //Update useState
    setUData(getUserDataByUsername(uData.username))

    console.log('newUnassigned: ', newUnassigned);
    console.log('newMyCollection: ', newMyCollection);

  }

  /* Trade all items */
  const tradeAllCards = (coinsFromTrade) => {
    console.log('Coins from trading all: ', coinsFromTrade)
    const newCoinBalance = uData.coins + coinsFromTrade

    //Set new coin balance
    updateUserDataProperty(uData.username, 'coins', newCoinBalance)

    //Delete from unassigned • Remplazar con un [] vacío
    const emptyArray = []
    setUserDataProperty(uData.username, 'unassigned', emptyArray)

    //useState update
    setUData(getUserDataByUsername(uData.username))
  }

  // Display a confirmation dialogs
  const handleTradeAllCards = () => {
    //Get Array de cards • [{}, {}, {}...]
    const fighters = getAllFighters(uData.unassigned)
    console.log('Cards to trade:', fighters)

    //Get Array con los precios de cada carta en unassigned [n, n, n...]
    const rarity_price = getRarityPrice(fighters)

    //Get suma de coins & crear newCoinBalance
    const coinsFromTrade = rarity_price.reduce(
      (acc, currentValue) => acc + currentValue, 0
    );

    const confirmed = window.confirm(`Are you sure you want to trade all cards for ${coinsFromTrade} coins?`);
    if (confirmed) tradeAllCards(coinsFromTrade)
  }

  return (
    <>
    <Layout>
    {uData && uData?.unassigned?.length > 0 && (
      <div className='flex flex-row justify-end'>
        {/* left section */}
        <div className="flex flex-col flex-1 w-[calc(100%-320px)]">
          {/* top submenu header */}
          <div className='flex justify-between items-center w-full h-12 bg-zinc-900 text-white py-1 px-2 border-b border-solid border-slate-600'>
            <p className='font-medium font-oswald italic text-sm'>
              MANAGE
            </p>
            <div className='flex flex-row gap-2'>
              <button className='font-normal font-oswald text-xs sm:text-sm p-2 rounded bg-rose-500 hover:bg-rose-600 select-none'
              onClick={() => sendAllCardsToMyCollection()}>
                {`Store All (MyCollection)`}
              </button>
              <button className='font-normal font-oswald text-xs sm:text-sm p-2 rounded bg-rose-500 hover:bg-rose-600 select-none'
              onClick={() => handleTradeAllCards()}>
                Trade All
              </button>
            </div>
          </div>
          {/* list of cards */}
          {
            uData?.unassigned?.map((fighterId, i) => {
              const fighter = fighters.find((fighter) => fighter.id === fighterId) //get fighter object
              const isNewFighter = !uData.myCollection?.includes(fighterId) //is new?
              if (fighter) {
                return (
                  <div key={i} className='flex flex-row justify-between items-center w-full pe-6 bg-zinc-700 border-t border-b border-solid border-slate-600 hover:bg-zinc-600 cursor-pointer'
                  onClick={() => manageClickItem(fighterId)}>
                    <div className='transform scale-75 -my-6'>
                      <Card id={fighter.id} fighter={fighter} />
                    </div>
                    {/* right part */}
                    <div className='flex flex-col gap-2'>
                      { isNewFighter
                      ?(<span className='py-1 px-2 font-semibold italic items-center text-xs tracking-tighter text-zinc-200'> NEW CARD!</span>)
                      : (<span className='py-1 px-2 font-semibold italic items-center text-xs tracking-tighter text-zinc-400'> DUPLICATED</span>)
                      }
                    </div>
                  </div>
                );
              }
              return null;
            })
          }
          {/* bottom mobile panel */}
          { isVisible && (
            <div className='slide-in-bottom flex sm:hidden flex-col fixed z-50 overflow-y-auto w-full h-[calc(100vh-64px)] bg-zinc-800'>
              <ManageCardPanelMobile visibleChange={handleVisibleComponent} isNewCard={propNewCard} id={propID}/>
            </div>
          )
          }
        </div>
        {/* right panel */}
        <div className='hidden sm:flex flex-col sm:w-[250px] md:w-96 min-h-[calc(100vh-64px)] border-l border-solid border-slate-600 bg-zinc-800'>
          <ManageCardPanel isNewCard={propNewCard} id={propID}/>
        </div>
      </div>
      )}
    </Layout>
    </>
  )
}

export default Unassigned