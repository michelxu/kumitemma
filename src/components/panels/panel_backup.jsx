import { Link } from 'react-router-dom';

const Panel = ({props}) => {
  const {title, image, description, to} = props;

  const renderedContent = description === ''
  //no description text at bottom
  ? (
    <>
    <Link to={`/${to}`} className='flex flex-col w-11/12 lg:min-w-[900px] lg:max-w-[900px] h-[250px] sm:h-[364px] bg-slate-800 hover:bg-slate-700 border border-solid border-slate-500 mx-4'>
      <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase mb-3'>
        {title}
      </h1>
      <img src={image} alt='Welcome back'
      className='h-44 sm:h-60 justify-center items-center mx-auto pointer-events-none pb-2'/>
    </Link>
    </>
  )
  //description text at bottom
  : (
    <>
    <Link to={`/${to}`} className='flex flex-col w-11/12 lg:min-w-[900px] lg:max-w-[900px] h-[300px] sm:h-[364px] bg-slate-800 hover:bg-slate-700 border border-solid border-slate-500 mx-4'>
      <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase'>
        {title}
      </h1>
      <img src={image} alt='Welcome back' className='h-44 sm:h-60 justify-center items-center mx-auto pointer-events-none pb-2'/>
      {/* bottom text description */}
      <div className='flex-1'></div>
      <div className='flex-grow-1 items-center w-full bg-slate-700'>
        <h2 className='font-normal font-poppins text-sm sm:text-base text-zinc-50 tracking-tight truncate-lines-2 md:truncate-none py-2 px-2'>
          {description}
        </h2>
      </div>
    </Link>
    </>
  );

  return (
    <>
    {renderedContent}
    </>
  )
}

// Set default props for the component
Panel.defaultProps = {
  title: 'default',
  image: 'default',
  description: 'no description',
};


export default Panel