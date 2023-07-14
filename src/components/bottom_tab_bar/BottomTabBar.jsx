import TabBarItem from "../tab_bar_item/TabBarItem"

const BottomTabBar = () => {
  return (
    <>
    <section className="fixed bottom-0 left-0 right-0 flex sm:hidden justify-center items-center bg-zinc-800 h-16 z-50 w-full">
      {/* Buttons for HOME, PLAY, PROFILE, SETTINGS */}
      <TabBarItem title={'home'}/>
      <TabBarItem title={'compete'}/>
      <TabBarItem title={'store'}/>
      <TabBarItem title={'collection'}/>
      <TabBarItem title={'settings'}/>

    </section>
    </>
  )
}

export default BottomTabBar