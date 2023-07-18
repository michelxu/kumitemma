import Layout from "../components/layout/Layout"
import Panel from "../components/panels/Panel"

const Picks = () => {
  const panels = [
    {
    title: 'Fight Picks',
    image: '',
    description: `Predict the winners of the upcoming UFC events and earn rewards.`,
    to: '',
    type: 'mini_message',
    },
    {
      title: 'Claim your rewards',
      image: '',
      description: `Predict the winners of the upcoming UFC events and earn rewards as:
      - Packs
      - XP
      - Badges

      This feature is not available at the moment.`,
      to: 'home',
      type: 'message_text_gray',
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

export default Picks