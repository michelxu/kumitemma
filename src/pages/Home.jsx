import { useContext, useEffect, useState } from 'react' //react
import { useNavigate } from 'react-router-dom';
import Contexto from '../context/Contexto';
import '../App.css' //css
import {selectRandomCard} from '../data/data'; //functions & files
import Card from "../components/card/Card"; //components
import Layout from '../components/layout/Layout';
import Panel from '../components/panels/Panel';
import panel_pack_01 from '../assets/panel_pack_01.png' //images
import panel_pack_02 from '../assets/panel_pack_02.png'
import my_cards_05 from '../assets/my_cards_05.png'
import my_cards_06 from '../assets/my_cards_06.png'
import kumite_logo_sm from '../assets/kumite_logo_sm.png'
import settings from '../assets/settings.png'



const Home = () => {
  //Panel component data
  const panels = [
    {
      title: 'welcome back',
      image: kumite_logo_sm,
      description: 'Get your team ready and compete for the glory. Open packs and trade your duplicate ones to collect all the Fighters.',
      to: 'home',
      type: 'description',
    },
    {
      title: 'Store',
      image: panel_pack_01,
      description: 'Visit the Store. Open packs and trade your duplicate ones to collect all the Fighters.',
      to: 'store',
      type: 'description_link',
    },
    {
      title: 'Unassigned items',
      image: panel_pack_02,
      description: 'Unassigned items.',
      to: 'unassigned',
      type: 'mini_link',
    },
    {
      title: 'Settings',
      image: settings,
      description: '',
      to: 'settings',
      type: 'half_no_description_small_img',
    },
    {
      title: 'About',
      image: my_cards_05,
      description: '',
      to: 'about',
      type: 'half_no_description',
    },
    {
      title: 'Compete',
      image: my_cards_06,
      description: 'Compete on the octagon with fighters from your collection to earn some rewards.',
      to: 'compete',
      type: 'description_link',
    },
  ]

  const navegacion = useNavigate()
  const {uData} = useContext(Contexto)

  //S t a r t :
  useEffect(() => {
    //for new users to claim their welcome package
    if (uData?.xp === 0){
      console.log('New user: Redirecting to /welcome');
      navegacion('/welcome')
    }
    if(Object.keys(uData).length > 0){
      //console.log('usestate: ', uData);
      //console.log('localstorage: ', getAllUsersData())
    }  
  }, [uData])

  /* open pack test */
  /* probar en cuántos intentos se consigue una carta con
  id, rarity, etc parámetro */
  const [showDiv, setShowDiv] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [cardId2, setCardId2] = useState(null);

  const openPack = () => {
    let f1 = {};
    let f2 = {};
    let loop = 0;
    while (!(f1?.id && f1.rarity === 1) && !(f2?.id && f2.rarity === 1)) {
      f1 = selectRandomCard();
      console.log('f1: ', f1.id);
      f2 = selectRandomCard();
      console.log('f2: ',f2.id);
      loop = loop+1;
    }
    console.log('loop: ', loop);
    console.log('f1: ', f1.id);
    console.log('f2: ', f2.id);

    setCardId(f1.id);
    setCardId2(f2.id);
    setShowDiv(true);

  }

  const openPack2 = () => {
    const fighter = selectRandomCard();
    setCardId(fighter.id);
    const fighter2 = selectRandomCard();
    setCardId2(fighter2.id);
    setShowDiv(true);
  }

  return (
    <>
    <Layout>
      {/* content */}
      <div className="flex flex-col justify-center items-center mb-8 mx-auto max-w-5xl mt-8 gap-6 select-none">
        {uData?.unassigned?.length > 0 && <Panel props={panels[2]}/>}
        <Panel props={panels[0]}/>
        <Panel props={panels[5]}/>
        <Panel props={panels[1]}/>
        <div className='flex flex-row justify-center items-center w-11/12 gap-6'>
          <Panel props={panels[3]}/>
          <Panel props={panels[4]}/>
        </div>
      </div>

      {/* title description button */}
      <div className="flex flex-col justify-center items-center gap-4 mt-8 mb-8">
        <button className="font-semibold text-white rounded p-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500"  onClick={openPack}>
          Open Pack
        </button>
      </div>
      {/* cards section */}
      <div className="flex flex-wrap justify-center items-center mb-8 mx-auto max-w-5xl">
        {showDiv && (
          <div className="flex flex-wrap justify-center items-center gap-2 bounce-in-top">
            {cardId && <Card id={cardId} />}
            {cardId2 && <Card id={cardId2} />}
          </div>
        )}
      </div>
    </Layout>
    </>
  )
}

export default Home