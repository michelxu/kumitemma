import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Contexto from '../context/Contexto'
import Layout from '../components/layout/Layout'
import Panel from '../components/panels/Panel'
import panel_pack_01 from '../assets/panel_pack_01.png' //**imgs
import panel_pack_02 from '../assets/starter_banner.png'


const Welcome = () => {
  const navegacion = useNavigate()
  const {getAllUsersData, setUserDataByUsername, uData, setUData} = useContext(Contexto)

  const panels = [
    {
    title: 'Claim your rewards',
    image: panel_pack_01,
    description: `Enjoy your free rewards to start your journey.
    • 3500 Coins & 500 XP
    • x3 Starter Packs
    • x1 Standard Pack
    • x1 Premium Pack`,
    to: 'home',
    type: 'mini_message',
    },
    {
      title: 'Claim your rewards',
      image: panel_pack_02,
      description: `Enjoy the following rewards:
      3500 Coins
      500 XP
      x3 Starter Packs`,
      to: 'home',
      type: 'image',
      },
  ]

  //Inicial con useState
  useEffect(() => {
    if(Object.keys(uData).length === 0) return

    console.log('Welcome: ', uData.username);

    // 3. Obtener data
    console.log('Welcome, Data: ', uData);

    // 4. Si NO es usuario nuevo:
    if (uData.coins > 0 || uData.xp > 0) {
      console.log(`${uData.username} is not a new user. Redirecting to: /home`);
      navegacion('/')
    }

    console.log('Welcome, Local Users Data: ', getAllUsersData())
  }, [uData])

  const claimRewards = () => {
    const rewards = {
      coins: 3500,
      xp: 500,
      packs: [1, 1, 1, 2, 3],
    }
    setUserDataByUsername(uData.username, rewards) //localdb
    setUData((prevUData) => ({ //useState
      ...prevUData,
      ...rewards
    }))
  }

  return (
    <>
    <Layout>
      <div className="flex flex-col justify-center items-center mx-auto mb-8 max-w-5xl mt-8 gap-2">
        <Panel props={panels[0]}/>
        <Panel props={panels[1]}/>
        <button className="font-regular text-2xl font-oswald text-white rounded w-11/12 lg:max-w-[900px] p-2.5 mt-4 bg-rose-500 hover:bg-rose-600" 
          onClick={() => claimRewards()}>
          CLAIM REWARDS
        </button>
      </div>
    </Layout>
    </>
  )
}

export default Welcome