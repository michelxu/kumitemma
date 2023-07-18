import { useContext, useEffect, useState } from "react"
import Contexto from "../context/Contexto"
import { packs } from '../data/pack_data' /* data  */
import Layout from "../components/layout/Layout" /* components */
import PanelPack from "../components/panels/PanelPack"

const MyPacks = () => {

  const [packElements, setPackElements] = useState([]);
  const {uData} = useContext(Contexto)

  //Render mis packs
  useEffect(() => {
    if(!uData.packs) return

    const userPacks = uData.packs;

    const mappedPackElements = userPacks.map((packID, i) => {
      // Find the pack object with the matching ID
      const pack = packs.find((pack) => pack.id === packID);

      // Handle error if pack id does not exist
      if (!pack) {
        console.error(`Pack with ID: ${packID} not found.`)
        return
      }

      // Create a new object with the modified properties
      const modifiedProps = {
        idpack: pack.id,
        title: pack.name,
        image: pack.image,
        description: pack.description,
        quantity: pack.quantity,
        to: 'opening',
        type: 'mypacks',
        index_pack: i,
      };

      return (
        <PanelPack key={i} props={modifiedProps}/>
      );
    });

    setPackElements(mappedPackElements);
    console.log('Pack IDs restantes: ', uData.packs);
  }, [uData])

  return (
    <>
    <Layout>
      <div className="flex flex-col items-center mb-8 mx-auto max-w-5xl mt-8 gap-6">
        {packElements}
      </div>
    </Layout>
    </>
  )
}

export default MyPacks