import Layout from '../components/layout/Layout'
import Panel from '../components/panels/Panel'
import panel_pack_01 from '../assets/panel_pack_01.png' /* imgs */
import panel_pack_02 from '../assets/panel_pack_02.png'
import my_packs_01 from '../assets/my_packs_01.png'


const Store = () => {
  const panels = [
    {
      title: 'My Packs',
      image: panel_pack_01,
      description: 'All my packs.',
      to: 'my-packs',
      type: 'description_link',
    },
    {
      title: 'Store Packs',
      image: panel_pack_02,
      description: 'Packs available in store.',
      to: 'store-packs',
      type: 'description_link',
    },
  ]

  return (
    <>
    <Layout>
      <div className="flex flex-col items-center mb-8 mx-auto max-w-5xl mt-8 gap-6 select-none">
        <Panel props={panels[0]}/>
        <Panel props={panels[1]}/>
      </div>
    </Layout>
    </>
  )
}

export default Store