import Layout from "../components/layout/Layout"
import Panel from "../components/panels/Panel"
import kumite_logo_sm from '../assets/kumite_logo_sm.png' /* imgs */
import my_cards_06 from '../assets/my_cards_06.png'
import my_cards_07 from '../assets/my_cards_07.png'

const Compete = () => {
  const panels = [
    {
    title: 'Fight Night Bout',
    image: my_cards_06,
    description: `Compete in daily solo Fight Bouts and earn rewards.
    `,
    to: 'fight',
    type: 'description_link',
    },
    {
      title: 'Kumite Tournament',
      image: kumite_logo_sm,
      description: `This feature is not available.`,
      to: '',
      type: 'description_gray',
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

export default Compete