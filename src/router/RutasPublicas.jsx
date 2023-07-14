import { useContext } from "react"
import Contexto from "../context/Contexto"
import { Navigate } from "react-router-dom"

const RutasPublicas = ({ children }) => {
  const {estado} = useContext(Contexto)

  return (!estado) //si no está logueado
  ? children
  : <Navigate to="/home" />
}

export default RutasPublicas