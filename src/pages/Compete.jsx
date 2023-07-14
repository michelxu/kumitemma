import Layout from "../components/layout/Layout"
import Panel from "../components/panels/Panel"
import kumite_logo_sm from '../assets/kumite_logo_sm.png' /* imgs */


const Compete = () => {
  const panels = [
    {
    title: 'Fight Night Bout',
    image: '',
    description: `Predict the winners of the upcoming UFC events and earn rewards.
    `,
    to: 'fight',
    type: 'description_link',
    },
    {
      title: 'Kumite Tournament',
      image: kumite_logo_sm,
      description: `This feature is not available.`,
      to: '',
      type: 'description',
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