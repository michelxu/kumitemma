import { useContext, useEffect } from "react"
import Layout from "../components/layout/Layout"
import Contexto from "../context/Contexto"
import { fighters } from '../data/data'; /* data  */
import Card from "../components/card/Card";

const Unassigned = () => {
  const {uData, setUData, updateUserDataProperty, setUserDataProperty, getUserDataByUsername, removeItemFromArray} = useContext(Contexto);
  let username = ''

  useEffect(() => {
    if (Object.keys(uData).length === 0) return
    if (uData.unassigned.length === 0) return
    
    username = uData.username
  }, [uData])

  //All items top button
  const handleUnassignedItems = () => {
    if(uData.unassigned.length === 0){
      alert('No unassigned items')
      return
    }

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
    updateUserDataProperty(username, 'myCollection', newMyCollection)

    //Sobre escribir unassigned
    setUserDataProperty(username, 'unassigned', newUnassigned)

    //Update useState
    setUData(getUserDataByUsername(username))

    console.log('newUnassigned: ', newUnassigned);
    console.log('newMyCollection: ', newMyCollection);

  }

  //Destroy card
  const destroyCard = (id) => {
    console.log('Cart to destroy: ', id);
    removeItemFromArray(username, 'unassigned', id)

    //Update useState
    setUData(getUserDataByUsername(username))
  }

  return (
    <>
    <Layout>
      {/* submenu */}
      <div className='flex fixed z-10 justify-between items-center w-full sm:w-[calc(100%-104px)] h-12 bg-zinc-900 text-white py-1 px-4'>
        <p className='font-medium font-oswald italic text-sm'>
          MANAGE
        </p>
        <button className='font-normal font-oswald text-xs sm:text-sm p-2 rounded bg-rose-500 hover:bg-rose-600 select-none'
        onClick={() => handleUnassignedItems()}>
          SEND ALL TO MY COLLECTION
        </button>
      </div>
      <div className='flex flex-row justify-center items-center pb-0 gap-0 pt-12'>
        <div className="flex flex-col items-center gap-0 sm:gap-0 w-full">
          {/* list of cards */}
          {
            uData?.unassigned?.map((fighterId, i) => {
              const fighter = fighters.find((fighter) => fighter.id === fighterId);
              if (fighter) {
                return (
                  <div key={i} className='flex flex-row justify-between items-center w-full pe-6 bg-zinc-700 border border-solid border-slate-600 hover:bg-zinc-600'>
                    <div className='transform scale-75 -my-6'>
                      <Card id={fighter.id} fighter={fighter} />
                    </div>
                    {/* buttons */}
                    <div className='flex flex-col gap-2'>
                      <button className='font-normal font-oswald text-xs sm:text-sm p-2 rounded bg-cyan-600 hover:bg-cyan-700 text-zinc-50 select-none'>
                        MY COLLECTION
                      </button>
                      <button className='font-normal font-oswald text-xs sm:text-sm p-2 rounded bg-cyan-600 hover:bg-cyan-700 text-zinc-50 select-none'>
                        TRADE
                      </button>
                      <button className='font-normal font-oswald text-xs sm:text-sm p-2 rounded bg-rose-500 hover:bg-rose-600 text-zinc-50 select-none'
                      onClick={() => destroyCard(fighter.id)}>
                        DESTROY
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })
          }
        </div>
        {/* right panel */}
        <div className='flex flex-col w-48 h-screen bg-zinc-800'>
          <p className='text-white'>right panel</p>
          <p className='text-white'>right panel</p>
          <p className='text-white'>right panel</p>
        </div>
      </div>
    </Layout>
    </>
  )
}

export default Unassigned