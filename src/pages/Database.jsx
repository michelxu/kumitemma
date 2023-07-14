import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { fighters } from '../data/data';
import Card from '../components/card/Card';

const Database = () => {
  useEffect(() =>{

  }, [])

  return (
    <>
    <Layout>
    <div className='flex justify-center items-center pb-8 gap-0 pt-8'>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 sm:gap-4 md:gap-6 lg:gap-8 rounded">
        {
          fighters.map(fighter => (
            <div key={fighter.id} className='transform scale-75 sm:scale-100'>
              <div className='bg-zinc-100 p-1.5 -m-4 sm:m-0 sm:p-1.5'>
                <Card id={fighter.id}/>
              </div>
            </div>
          ))
        }
      </div>
    </div>
    </Layout>
    </>
  )
}

export default Database