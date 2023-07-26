import { HomeIcon, ShoppingCartIcon, QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon, Cog8ToothIcon } from '@heroicons/react/24/solid'
import { GiPunch, GiCardExchange } from "react-icons/gi";
import { IoLogoOctocat } from "react-icons/io";
import { PiCardsFill } from "react-icons/pi";

const Feature = ({title, icon, description}) => {

  const iconMap = {
    'compete': GiPunch,
    'about': IoLogoOctocat,
    'picks': GiCardExchange,
    'collection': PiCardsFill,
  }
  const renderIcon = (icono) => {
    const IconComponent = iconMap[icono] || QuestionMarkCircleIcon;
    return <IconComponent className='h-7 w-7 mt-1' />;
  }

  return (
    <>
    <div id='features' className='flex flex-col p-4 text-zinc-100 w-full feature-container rounded bg-zinc-900 hover:bg-zinc-800 cursor-pointer border-t border-b border-zinc-700'>
      <div className='flex flex-row gap-2'>
        {renderIcon(icon)}
        <h2 className='font-oswald text-3xl uppercase mb-2'>{title}</h2>
      </div>
      <p className='font-poppins text-md tracking-tight' style={{ whiteSpace: 'pre-line' }}>
        {description}
      </p>
    </div>
    </>
  )
}

// Set default props for the component
Feature.defaultProps = {
  title: 'default',
  icon: 'default',
  description: 'no description',
};

export default Feature