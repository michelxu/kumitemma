//funcionando, antes del tutorial 1:29:13

import { useEffect, useReducer, useState } from 'react'
import Contexto from './Contexto'
import miReducer from './miReducer'
import types from './types'
import usersJson from '../data/users.json'

const init = () => {
  const valor = localStorage.getItem('estado')
  return{
    estado: !!valor, // El operador !! revisa si: Existe = true, si no = false
  }
}

const Provider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [logged, dispatch] = useReducer(miReducer, {}, init)


  const loguearme = (user='') => {
    const action = {
      type: types.login,
      payload: user
    }
    console.log('user: ' + user);
    localStorage.setItem('estado', true) //guardar en localStorage
    dispatch(action) // ejecutar miReducer
  }

  const desloguearme = () => {
    const action = {
      type: types.logout
    }
    localStorage.removeItem('estado') //guardar en localStorage
    dispatch(action) // ejecutar miReducer
  }

  return (
    <Contexto.Provider value={{
      ...logged,
      loguearme,
      desloguearme,
      userData,
      setUserData,
    }}>
      {children}
    </Contexto.Provider>
  )
}

export default Provider