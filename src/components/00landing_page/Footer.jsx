import { LiaCatSolid } from "react-icons/lia";

const Footer = () => {
  return (
    <>
    <footer className='flex justify-center items-center h-16 w-full border-t border-zinc-700 bg-zinc-950'>
      <div className='flex justify-center items-center gap-1 text-zinc-500 hover:text-rose-500 '>
        <LiaCatSolid className='h-4 w-4'/>
        <p className='font-poppins text-sm hover:font-medium tracking-tighter cursor-default'>jeanmbcode © 2023</p>
      </div>
    </footer>
    </>
  )
}

export default Footer