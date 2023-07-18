import { Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Collection from "../pages/Collection"
import Store from "../pages/Store"
import MyCollection from "../pages/MyCollection"
import Database from "../pages/Database"
import Compete from "../pages/Compete"
import Picks from "../pages/Picks"
import Welcome from "../pages/Welcome"
import Unassigned from "../pages/Unassigned"
import Settings from "../pages/Settings"
import About from "../pages/About"
import MyPacks from "../pages/MyPacks"
import StorePacks from "../pages/StorePacks"
import Opening from "../pages/Opening"
import Fight from "../pages/Compete/Fight"
import InProgress from "../pages/Compete/InProgress"

const Router2 = () => {
  return (
    <>
    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/collection' element={<Collection/>} />
      <Route path='/my-collection' element={<MyCollection/>} />
      <Route path='/database' element={<Database/>} />
      <Route path='/compete' element={<Compete/>} />
      <Route path='/fight' element={<Fight/>} />
      <Route path='/in-progress' element={<InProgress/>} />
      <Route path='/picks' element={<Picks/>} />
      <Route path='/store' element={<Store/>} />
      <Route path='/my-packs' element={<MyPacks/>} />
      <Route path='/store-packs' element={<StorePacks/>} />
      <Route path='/welcome' element={<Welcome/>} />
      <Route path='/opening' element={<Opening/>} />
      <Route path='/unassigned' element={<Unassigned/>} />
      <Route path='/settings' element={<Settings/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/' element={<Navigate to='/home'/>} />
    </Routes>
    </>
  )
}

export default Router2