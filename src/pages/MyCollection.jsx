import { useContext, useEffect, useState } from "react";
import Contexto from "../context/Contexto";
import Card from "../components/card/Card" /* components  */
import Layout from "../components/layout/Layout"
import { fighters } from '../data/data'; /* data  */


const MyCollection = () => {
  const {uData} = useContext(Contexto)
  const [qtyAllFighters, setQtyAllFighters] = useState(0)
  const [qtyMyFighters, setQtyMyFighters] = useState(0)

  useEffect(() => {
    setQtyAllFighters(fighters.length)
    setQtyMyFighters(uData.myCollection.length)

  }, [uData])

  return (
    <>
    <Layout>
      <div className='flex flex-col justify-center items-center pb-8 gap-0'>
        {/* top submenu header */}
        <div className='flex justify-between items-center w-full h-12 bg-zinc-900 text-zinc-50 py-1 px-2 mb-4 border-b border-solid border-slate-600'>
          <p className='font-medium font-oswald italic text-sm'>
            MANAGE {qtyMyFighters}/{qtyAllFighters}
          </p>
          <div className='flex flex-row gap-2'>
            <select className=" p-2 border border-gray-300 rounded shadow-sm text-zinc-50 bg-zinc-700 focus:ring focus:ring-opacity-50 focus:ring-rose-300 focus:border-rose-300">
              <option value="option1">All Fighters</option>
              <option value="option2">Best Fighters</option>
              <option value="option3">Flyweight</option>
              <option value="option3">Bantamweight</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-8 rounded">
          {
            uData?.myCollection?.map((fighterId, i) => {
              const fighter = fighters.find((fighter) => fighter.id === fighterId);
              if (fighter) {
                return (
                  <div key={fighter.id} className='transform scale-75 sm:scale-100'>
                    <div className='bg-zinc-100 p-1.5 -m-4 sm:m-0 sm:p-1.5'>
                      <Card id={fighter.id}/>
                    </div>                  
                  </div>
                );
              }
              return null;
            })
          }
        </div>
      </div>
    </Layout>
    </>
  )
}

export default MyCollection