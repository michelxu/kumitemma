import {fighters, selectRandomCard} from '../src/data';
import Card from "./components/card/Card";
import { useState } from 'react'
import './App.css'
import NavBar from './components/navbar/NavBar';
import LeftTabBar from './components/left_tab_bar/LeftTabBar';

function App () {
  const [showDiv, setShowDiv] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [cardId2, setCardId2] = useState(null);

  const openPack = () => {
    console.log('openPack()');
    const fighter = selectRandomCard();
    setCardId(fighter.id);
    const fighter2 = selectRandomCard();
    setCardId2(fighter2.id);
    setShowDiv(true);
  }

  return (
    <>
    <section className='flex flex-row'>
      <LeftTabBar/>
      <div className='flex flex-col w-full bg-zinc-600'>
        <NavBar/>
        <section className="flex flex-col justify-center items-center mt-8 mb-4">
        <h1 className="text-2xl font-semibold">
          title
        </h1>
        <h2 className="text-lg font-regular mb-2">
          description
        </h2>
        <div className="flex flex-row justify-end items-center">
          <button className="font-semibold text-white rounded p-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500"  onClick={openPack}>
            Open pack
          </button>
        </div>
        </section>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center items-center mb-16">
            {showDiv && (
              <div className="flex flex-wrap justify-center items-center gap-2 bounce-in-top">
                <Card id={cardId} />
                <Card id={cardId2} />
                <Card id={25} />
                <Card id={1} />
              </div>
            )}
          </div>
        </div>
        </div>
    </section>
    </>
  )
}

export default App
