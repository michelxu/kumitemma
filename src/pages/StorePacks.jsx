import { useContext, useEffect } from "react";
import Contexto from "../context/Contexto";
import Layout from "../components/layout/Layout"
import { packs } from '../data/pack_data' /* data */
import PanelPack from "../components/panels/PanelPack";


const StorePacks = () => {
  const {uData} = useContext(Contexto)

const availablePacks = packs.filter(pack => pack.available === true)
const storePacks = availablePacks?.map((pack, i) => {
  // Create a new object with the modified properties
  const packObject = {
    idpack: pack.id,
    title: pack.name,
    image: pack.image,
    quantity: pack.quantity,
    description: pack.description,
    to: 'opening',
    index_pack: i,
    price: pack.price,
    type: 'store'
  }

  return (
    <PanelPack key={i} props={packObject}/>
  )
})

  return (
    <>
    <Layout>
      <div className="flex flex-col items-center mb-8 mx-auto max-w-5xl mt-8 gap-6">
        {storePacks}
      </div>
    </Layout>
    </>
  )
}

export default StorePacks