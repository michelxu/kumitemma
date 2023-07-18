import { useNavigate } from 'react-router-dom'
import { useEffect, useReducer, useState } from 'react'
import Contexto from './Contexto'
import miReducer from './miReducer'
import types from './types'
import usersJson from '../data/users.json'
import { weights } from '../data/data'
import { getNestedPropertyValue } from '../utils/utils'

const init = () => {
  const valor = localStorage.getItem('estado')
  return{
    estado: !!valor, // El operador !! revisa si: Existe = true, si no = false
    usuario: valor
  }
}

const Provider = ({ children }) => {
  const [logged, dispatch] = useReducer(miReducer, {}, init)
  const [referencia, setReferencia] = useState('')
  const [uData, setUData] = useState({})
  const navegacion = useNavigate()

  //APP START: Pasar variables de localStorage --> useState

  //1. Obtener local username y pasarlo a useState
  useEffect(() => {
    const localUser = localStorage.getItem('localUsername')
    if(localUser){
      setReferencia(localUser) // useState
      console.log('1. start app: ', localUser);
    }
  }, [])

  // 2. Obtener local data y pasarlo a useState
  useEffect(() => {
    if (!referencia) return
    const userData = getUserDataByUsername(localStorage.getItem('localUsername'))
    // useState
    if (userData) setUData(userData)
  }, [referencia])

  //logs
  useEffect(() => {
    if (uData && Object.keys(uData).length > 0) {
      console.log('user usestate: ', uData)
      console.log('user localstorage: ', getUserDataByUsername(referencia))
      //console.log('allusers localstorage: ', getAllUsersData())
    }
  }, [uData])

/* ***************** s o m e   f n s ***************** */
const logout = () => {
  navegacion('/login', {replace:true})
  setReferencia('')
  setUData({})
  desloguearme()
}

/* ***************** l o c a l   s t o r a g e   f n s ***************** */
  // Function to get all user data
  const getAllUsersData = () => {
    const userDataJson = localStorage.getItem('usersData');
    return userDataJson ? JSON.parse(userDataJson) : [];
  };

  // Function to set all user data
  const setAllUsersData = (usersData) => {
    const userDataJson = JSON.stringify(usersData);
    localStorage.setItem('usersData', userDataJson);
  };

  // Function to insert a new user
  const insertNewUser = (newUserData) => {
    const allUserData = getAllUsersData();
    allUserData.push(newUserData);
    setAllUsersData(allUserData);
  };

  // Function to get the user data based on the username
  const getUserDataByUsername = (username) => {
    const allUserData = getAllUsersData();
    return allUserData.find((user) => user.username === username) || null;
  };

  // Function to set the user data based on the username • data = {}
  const setUserDataByUsername = (username, data) => {
    const allUserData = getAllUsersData();
    const updatedUserData = allUserData.map((user) =>
      user.username === username ? { ...user, ...data } : user
    );
    setAllUsersData(updatedUserData);
  };

  // Function to UPDATE a specific property for a user
  /* En arrays (solo arrays) hace push (agrega) y NO sobreescribe
  como sí lo hace setUserDataProperty */
  const updateUserDataProperty = (username, propertyName, value) => {
    const userData = getUserDataByUsername(username);
    if (userData) {
      // La propiedad a modificar es un array? (como myCollection o unassigned)
      if (Array.isArray(userData[propertyName])) {
        // El valor a insertar es un array?
        if (Array.isArray(value)) {
          // Si `value` a insertar es un propio array, push each item individually
          value.forEach((item) => userData[propertyName].push(item));
        } else {
          // Si `value` es un valor único, push it as a single item
          userData[propertyName].push(value);
        }
      } else {
        userData[propertyName] = value;
      }
      setUserDataByUsername(username, userData);
    }
  };

  // Function to SET a specific property for a user
  /* Sobreescribe el valor, puede ser un valor o un array */
  /*const setUserDataProperty = (username, propertyName, value) => {
    const userData = getUserDataByUsername(username);
    if (userData) {
      userData[propertyName] = value;
      setUserDataByUsername(username, userData);
    }
  };*/
  // Updated, handles nested properties
  const setUserDataProperty = (username, propertyName, value) => {
    const userData = getUserDataByUsername(username);
    if (userData) {
      const propertyParts = propertyName.split('.');
      const lastPart = propertyParts.pop();
      const parentObject = getNestedPropertyValue(userData, propertyParts);
      if (parentObject) {
        parentObject[lastPart] = value;
        setUserDataByUsername(username, userData);
      }
    }
  };

  // Function to remove an element from an array of a user
  /* Para entenderlo mejor: Regresa todos los items excepto:
  el primer itemid que haga match con el itemidToRemove 
  indexOf(itemIdToRemove) siempre será el mismo valor
  Si deseas eliminar el id 3 [1,2,3,1,2,3]
  userData[arrayName].indexOf(itemIdToRemove) siempre será la posición '2'
  y ese return regresará falso solo si ambos index concuerdan*/
  const removeItemFromArray = (username, arrayName, itemIdToRemove) => {
    const userData = getUserDataByUsername(username);
    if (userData) {
      const updatedArray = userData[arrayName].filter(
        (itemId, i) => {
          // Remove the first occurrence of itemIdToRemove
          if(itemId === itemIdToRemove) {
            return i !== userData[arrayName].indexOf(itemIdToRemove)
          }
          return true;
        }
      );
      setUserDataProperty(username, arrayName, updatedArray) // localdata update
      setUData(getUserDataByUsername(referencia)) // usestate update
    }
  };

  // Function to remove an item from an array of a user based on the index • se usa en my-packs
  const removeItemFromArrayByIndex = (username, arrayName, itemIndex) => {
    const userData = getUserDataByUsername(username);
    if (userData) {
      const updatedArray = [...userData[arrayName]];
      updatedArray.splice(itemIndex, 1);
      setUserDataProperty(username, arrayName, updatedArray) // localdata update
      //setUData(getUserDataByUsername(referencia)) // usestate update
    }
  };
/* ***************** l o c a l   s t o r a g e   f n s ***************** */

/* ***************** m a n a g e   c a r d s   f n s ***************** */
  function searchObjectByValue(obj, searchValue) {
    const values = Object.values(obj);
    return values.find((item) => item.value === searchValue) || null;
  }

  //Send card to my collection
  const sendCardToMyCollection = (id) => {
    const isIncluded = uData.myCollection.includes(id)
    if (isIncluded) {
      alert('You already have this card in your collection.')
      return
    }
    console.log('Cart to save: ', id);

    updateUserDataProperty(uData.username, 'myCollection', id) //Añadirlo a myCollection
    removeItemFromArray(uData.username, 'unassigned', id) //Eliminarlo de unassigned

    setUData(getUserDataByUsername(uData.username)) //update useState
  }

  //Trade card
  const tradeCard = (id, fighter_rarity) => {
    console.log('Cart to trade: ', id);
    const weight = searchObjectByValue(weights, fighter_rarity)
    const coins = uData.coins + weight.card_price;

    updateUserDataProperty(uData.username, 'coins', coins) //Actualizar coins
    removeItemFromArray(uData.username, 'unassigned', id) //Eliminarlo de unassigned
    setUData(getUserDataByUsername(uData.username)) //update useState
  }

  //Destroy card
  const destroyCard = (id) => {
    console.log('Cart to destroy: ', id)
    removeItemFromArray(uData.username, 'unassigned', id)
    
    setUData(getUserDataByUsername(uData.username)) //update useState
  }

/* ***************** m a n a g e   c a r d s   f n s ***************** */

  const loguearme = (user='') => {
    const action = {
      type: types.login,
      payload: user
    }
    //console.log('user: ', user);
    //localStorage.setItem('estado', true) //guardar en localStorage
    localStorage.setItem('estado', user)  
    dispatch(action) // ejecutar miReducer
  }

  const desloguearme = () => {
    const action = {
      type: types.logout
    }
    localStorage.removeItem('estado') //remover en localStorage
    localStorage.removeItem('localUsername')
    setReferencia('')
    dispatch(action) // ejecutar miReducer
  }

  return (
    <Contexto.Provider value={{
      ...logged,
      loguearme,
      desloguearme,
      referencia, 
      setReferencia,
      getAllUsersData, //localStorage userData stuff
      setAllUsersData,
      insertNewUser,
      getUserDataByUsername,
      setUserDataByUsername,
      setUserDataProperty,
      updateUserDataProperty,
      removeItemFromArray,
      removeItemFromArrayByIndex,
      uData, setUData,
      logout,
      destroyCard, tradeCard, sendCardToMyCollection, //manage card functions (uses localstorage functions)
    }}>
      {children}
    </Contexto.Provider>
  )
}

export default Provider