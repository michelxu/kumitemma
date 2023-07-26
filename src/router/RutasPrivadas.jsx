import { useContext } from "react"
import Contexto from "../context/Contexto"
import { Navigate } from "react-router-dom"

const RutasPrivadas = ({ children }) => {
  const {estado} = useContext(Contexto)

  return (estado) //si está logueado
  ? children
  : <Navigate to="/kumite" />
}

export default RutasPrivadas