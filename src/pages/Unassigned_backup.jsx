import { useContext, useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import Contexto from "../context/Contexto"
import { fighters } from '../data/data'; /* data  */
import Card from "../components/card/Card";
import ManageCardPanel from "../components/manage_card_panel/ManageCardPanel";
import { useNavigate } from "react-router-dom";
import ManageCardPanelMobile from "../components/manage_card_panel/ManageCardPanelMobile";

const Unassigned = () => {
  const {uData, setUData, updateUserDataProperty, setUserDataProperty, getUserDataByUsername, removeItemFromArray} = useContext(Contexto);
  const [propID, setPropID] = useState()
  const [propNewCard, setPropNewCard] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const navegacion = useNavigate()

  useEffect(() => {
    if (uData && Object.keys(uData).length === 0) return //espera a que cargue uData
    if (uData && uData.unassigned.length === 0) navegacion("/home") //si está vacío vuelve al home

    console.log(uData.unassigned[0])
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

  //Clic en cada carta
  const manageClickItem = (fighterId) => {
    setPropID(fighterId) //cambiar id para ManageCard component
    setIsVisible(true) //movil panel
    console.log(propNewCard);
  }

  /* Send all items to My Collection */
  const handleUnassignedItems = () => {
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

  //Destroy card
  const destroyCard = (id) => {
    console.log('Cart to destroy: ', id);
    removeItemFromArray(uData.username, 'unassigned', id)

    //Update useState
    setUData(getUserDataByUsername(uData.username))
  }

  return (
    <>
    <Layout>
      <div className='flex flex-row justify-end'>
        {/* left section */}
        <div className="flex flex-col flex-1 w-[calc(100%-320px)]">
          {/* top submenu header */}
          <div className='flex justify-between items-center w-full h-12 bg-zinc-900 text-white py-1 px-4 border-b border-solid border-slate-600'>
            <p className='font-medium font-oswald italic text-sm'>
              MANAGE
            </p>
            <button className='font-normal font-oswald text-xs sm:text-sm p-2 rounded bg-rose-500 hover:bg-rose-600 select-none'
            onClick={() => handleUnassignedItems()}>
              SEND ALL TO MY COLLECTION
            </button>
          </div>
          {/* list of cards */}
          {
            uData?.unassigned?.map((fighterId, i) => {
              const fighter = fighters.find((fighter) => fighter.id === fighterId);
              if (fighter) {
                return (
                  <div key={i} className='flex flex-row justify-between items-center w-full pe-6 bg-zinc-700 border-t border-b border-solid border-slate-600 hover:bg-zinc-600 cursor-pointer'
                  onClick={() => manageClickItem(fighterId)}>
                    <div className='transform scale-75 -my-6'>
                      <Card id={fighter.id} fighter={fighter} />
                    </div>
                    {/* right part */}
                    <div className='flex flex-col gap-2'>
                      { propNewCard && (
                        <span className='py-1 px-2 font-semibold italic items-center text-xs tracking-tighter text-amber-400'> NEW CARD!</span>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })
          }
          {/* bottom mobile panel */}
          { isVisible && (
            <div className='slide-in-bottom flex sm:hidden flex-col fixed bottom-0 left-0 w-full h-[calc(100vh-64px)] bg-zinc-800'>
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
    </Layout>
    </>
  )
}

export default Unassigned