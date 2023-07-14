import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Router2 from "./Router2"
import RutasPublicas from "./RutasPublicas"
import RutasPrivadas from "./RutasPrivadas"
import Kumite from "../pages/Kumite"

const Router1 = () => {
  return (
    <>
    <Routes>
      <Route path='login' element={
        <RutasPublicas>
          <Login/>
        </RutasPublicas>
      } />

      <Route path='kumite' element={
        <RutasPublicas>
          <Kumite/>
        </RutasPublicas>
      } />

      <Route path='/*' element={
        <RutasPrivadas>
          <Router2/>
        </RutasPrivadas>
      } />
      
    </Routes>
    </>
  )
}

export default Router1