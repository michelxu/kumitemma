import { HomeIcon, ShoppingCartIcon, HeartIcon, QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon, Cog8ToothIcon } from '@heroicons/react/24/solid'
import { SiBetfair } from "react-icons/si";
import { GiPunch, GiCardExchange } from "react-icons/gi";
import { IoLogoOctocat } from "react-icons/io";
import { PiCardsFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';


const TabBarItem = (props) => {
  const {title} = props;

  const renderIcon = () => {
    switch (title) {
      case 'home':
        return <HomeIcon className='h-6 w-6' />;
      case 'compete':
        return <GiPunch className='h-6 w-6' />;
      case 'store':
        return <ShoppingCartIcon className='h-6 w-6' />;
      case 'about':
        return <IoLogoOctocat className='h-6 w-6' />;
      case 'picks':
        return <GiCardExchange className='h-6 w-6' />;
      case 'collection':
        return <PiCardsFill className='h-6 w-6' />;
      case 'settings':
        return <Cog8ToothIcon className='h-6 w-6' />;
      case 'logout':
        return <ArrowLeftOnRectangleIcon className='h-6 w-6' />;
      case 'default':
        return <QuestionMarkCircleIcon className='h-6 w-6' />;
      // Add more cases for other icons if needed
      default:
        return <QuestionMarkCircleIcon className='h-6 w-6' />;
    }
  };

  return (
    <>
    <NavLink
    to={`/${title}`}
    className={`flex flex-col justify-center items-center w-full py-2.5 my-1 text-zinc-300 hover:bg-zinc-900`}>
      <div className='flex flex-col justify-center items-center mx-auto'>
        {renderIcon()}
        <p className='font-oswald text-sm font-regular tracking-tighter'>{title?.toUpperCase()}</p>
      </div>
    </NavLink>
    </>
  )
}

// Set default props for the component
TabBarItem.defaultProps = {
  title: 'default', // Default title to be displayed if no title prop is provided
};

export default TabBarItem