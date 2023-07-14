import { useContext } from "react"
import Layout from "../components/layout/Layout"
import Contexto from "../context/Contexto"

const Settings = () => {
  const { logout } = useContext(Contexto)

  const deleteDB = () => {
    localStorage.clear()
      alert('Database has been deleted :-(')
      window.location.reload()
  }

  // Display a confirmation dialogs
  const handleDeleteDatabase = () => {
    const confirmed = window.confirm(`Are you sure you want to delete the database?`);
    if (confirmed) deleteDB()
  }

  return (
    <>
    <Layout>
      <div className="flex flex-col items-center mb-8 mx-auto min-h-[calc(100%-64px)] max-w-5xl mt-8 gap-4">
        <div className='flex flex-col justify-center w-4/5 gap-2'>
          <button className='flex justify-center w-full p-2 rounded bg-slate-700 hover:bg-slate-800 border border-solid border-slate-500 font-oswald text-zinc-50'
          onClick={() => logout()}>
            Logout
          </button>
        </div>
        <div className='flex flex-col justify-center w-4/5 gap-2'>
          <button className='flex justify-center w-full p-2 rounded bg-slate-700 hover:bg-slate-800 border border-solid border-slate-500 font-oswald text-zinc-50'
          onClick={() => alert('This feature is not available at the moment.')}>
            Select Language
          </button>
        </div>
        <div className='flex-1'></div>
        <div className='flex flex-col justify-center w-4/5 gap-2 bg-zinc-600 p-2 border border-solid border-slate-500'>
          <p className='font-poppins text-sm tracking-tight text-zinc-200'>
            You won't be able to recover your progress.
          </p>
          <button className='flex justify-center w-full p-2 rounded bg-rose-500 hover:bg-rose-600 border border-solid border-rose-400 font-oswald text-zinc-50'
          onClick={handleDeleteDatabase}>
            Delete All Database
          </button>
        </div>
      </div>
    </Layout>
    </>
  )
}

export default Settings