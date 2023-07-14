import { useContext, useEffect } from "react";
import Contexto from "../context/Contexto";
import Card from "../components/card/Card" /* components  */
import Layout from "../components/layout/Layout"
import { fighters } from '../data/data'; /* data  */


const MyCollection = () => {
  const {uData} = useContext(Contexto)

  useEffect(() => {
    console.log(uData.myCollection);
  }, [uData])

  return (
    <>
    <Layout>
      <div className='flex flex-col justify-center items-center pb-8 gap-0'>
        {/* top submenu header */}
        <div className='flex justify-between items-center w-full h-12 bg-zinc-900 text-white py-1 px-2 mb-4 border-b border-solid border-slate-600'>
          <p className='font-medium font-oswald italic text-sm'>
            MANAGE
          </p>
          <div className='flex flex-row gap-2'>
            <button className='font-normal font-oswald text-xs sm:text-sm p-2 rounded bg-rose-500 hover:bg-rose-600 select-none'
            >
              Sort by Overall
            </button>
            <button className='font-normal font-oswald text-xs sm:text-sm p-2 rounded bg-rose-500 hover:bg-rose-600 select-none'
            >
              Sort by Type
            </button>
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
                      <Card id={fighter.id} fighter={fighter} />
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