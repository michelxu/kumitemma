import Layout from "../components/layout/Layout"
import { LiaCatSolid } from "react-icons/lia";

const About = () => {
  return (
    <>
    <Layout>
      <div className="flex flex-col pt-16 items-center mx-auto max-w-5xl min-h-[calc(100%-0px)]">
        <a href="mailto:jeanmbcode@gmail.com" className='flex items-center gap-2 px-2 py-0.5 font-mono text-md text-zinc-200 text-center hover:text-zinc-100 rounded bg-zinc-900'>
          By jeanmbcode
          <LiaCatSolid className='h-4 w-4'/>
        </a>
      </div>
    </Layout>
    </>
  )
}

export default About