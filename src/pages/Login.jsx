import { useContext, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Contexto from "../context/Contexto"
import usersJson from '../data/users.json'
import kumite_logo_rose from '../assets/kumite_logo_rose.png' /* imgs */
import kumite_logo_w from '../assets/kumite_logo_w.png'
import CardSlider from "../components/card_slider/CardSlider"


const Login = () => {
  const navegacion = useNavigate()
  const {loguearme, setReferencia, referencia,
    getAllUsersData, getUserDataByUsername, insertNewUser, uData, setUData, } = useContext(Contexto)
  const inputRef = useRef(null); //input

  //input focus
  useEffect(() => {
    // When the component mounts, focus on the input element
    inputRef.current.focus();
  }, []);

  //on key down
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') login(referencia)

    if (e.currentTarget.value != null) console.log('handleEnterPress', referencia)
  };

  //on change
  const registro = (e) => {
    setReferencia(e.currentTarget.value)
  }

  //función login
  const login = (username) => {
    //no spaces, min 4 length
    if (username.includes(' ')){
      alert('Spaces are not allowed in the username')
      return
    }
    if (username.length < 4){
      alert('Please enter at least 4 characters.')
      return
    }
    if (username.length > 18){
      alert('Please enter max 18 characters.')
      return
    }

    //0. Asignar username a variable local
    localStorage.setItem('localUsername', username);
    
    //1. Verificar si existe una Database en localStore
    const localDB = getAllUsersData()
    if (localDB.length === 0){
      // 1.1 Si no: Guardar users.json en localStorage
      localStorage.setItem('usersData', JSON.stringify(usersJson.users));
    }

    //2. Buscar username en localDB
    const userData = getUserDataByUsername(username)
    console.log('search userData', userData);

    //2.1 No existe: Añadirlo a la localDB
    if (!userData){
      console.log(`un nuevo usuario (${username}) inició sesión, se agregó a la local database`);
      const newUserData = {
        "username": username,
        "coins": 0,
        "xp": 0,
        "myCollection": [],
        "unassigned": [],
        "packs": [],
        "compete": {
          "fightInProgress": "",
          "fightsToday" : 0,
          "myFighter": "",
          "myOpponent": "",
          "points": 0,
          "recordedDate": "",
          "rounds": [],
          "roundsWinner": [],
          "scorecard": {
            "myFighter": [],
            "myOpponent": [],
            "myOdds": []
          },
          "winMethod": "",
          "winner": ""
        }
      }
      insertNewUser(newUserData)
      setUData(newUserData)
    } else{
      // Si si existe, setearlo en la useState database
      setUData(userData)
    }
    
    //3. Obtener data: del usuario... > Continúa > En home


    //navegar al home
    navegacion('/', {replace:true})
    loguearme(username) //Cualq. valor (true). El Provider solo consulta si existe o no.
  }

  return (
    <>
    <div className='flex flex-col overflow-hidden items-center min-h-screen bg-gradient-to-t from-black via-zinc-900 to-black py-0'>
      <div className='flex-1'></div>
      {/* input login */}
      <div className='flex flex-col w-4/5 max-w-lg py-20 px-12 sm:px-20 gap-2 bg-zinc-900 rounded'>
        <div className='flex mx-auto'>
          <img src={kumite_logo_rose} className='w-full h-auto object-cover' alt='Kumite Logo' />
        </div>
        <label htmlFor='referencia' className='text-white font-oswald font-medium'>CREDENTIALS</label>
        <input
          id="referencia"
          type="text"
          onChange={registro}
          onKeyDown={handleEnterPress}
          ref={inputRef} // Assign the ref to the input element
          placeholder="username"
          className='rounded px-4 py-2 border border-gray-400 custom-input'
        />
        <button className=" text-white font-oswald font-medium px-4 py-2 mb-4 rounded bg-rose-500 hover:bg-rose-600"
        onClick={() => login(referencia)}>
          LOGIN
        </button>
        <Link to='/kumite'>
          <p className='font-oswald text-center font-medium underline text-base tracking-tighter text-zinc-500 hover:text-rose-500 cursor-pointer'>
            ABOUT KUMITE MMA
          </p>
        </Link>
      </div>
      <div className='flex-1'></div>
    </div>
    </>
  )
}

export default Login