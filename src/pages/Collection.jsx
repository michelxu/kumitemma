import Layout from "../components/layout/Layout"
import Panel from '../components/panels/Panel';
import panel_pack_01 from '../assets/panel_pack_01.png' //imgs
import my_cards_01 from '../assets/my_cards_01.png'
import my_cards_03 from '../assets/my_cards_03.png'
import my_cards_04 from '../assets/my_cards_04.png'

const Collection = () => {
  //Panel component data
  const paneles = [
    {
      title: 'My Collection',
      image: my_cards_01,
      description: '',
      to: 'my-collection',
      type: 'no_description_link'
    },
    {
      title: 'Database',
      image: my_cards_04,
      description: 'The entire collection. The best fighters around the world plus Legendary fighters from all times.',
      to: 'database',
      type: 'no_description_link'
    }  
  ]

  return (
    <>
    <Layout>
      <div className="flex flex-col items-center mb-8 mx-auto max-w-5xl mt-8 gap-6 select-none">
        <Panel props={paneles[0]}/>
        <Panel props={paneles[1]}/>
      </div>
    </Layout>
    </>
  )
}

export default Collection