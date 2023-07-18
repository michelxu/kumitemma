import { Link } from 'react-router-dom';

const Panel = ({props}) => {
  const {title, image, description, to, type} = props;

  let renderedContent;

  if (type === 'no_description_link') {
    //no description text at bottom
    renderedContent = (
      <>
      <Link to={`/${to}`} className='flex flex-col w-11/12 lg:max-w-[900px] h-[250px] sm:h-[364px] bg-slate-800 hover:bg-slate-700 border border-solid border-slate-500'>
        <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase mb-3'>
          {title}
        </h1>
        <img src={image} alt='Welcome back'
        className='h-48 sm:h-72 justify-center items-center mx-auto pointer-events-none -mt-3'/>
      </Link>
      </>
    )
  } 
  if (type === 'no_description') {
    //no description text at bottom
    renderedContent = (
      <>
      <div to={`/${to}`} className='flex flex-col w-11/12 lg:max-w-[900px] h-[250px] sm:h-[364px] bg-slate-800 border border-solid border-slate-500'>
        <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase mb-3'>
          {title}
        </h1>
        <img src={image} alt='Welcome back'
        className='h-48 sm:h-72 justify-center items-center mx-auto pointer-events-none -mt-3'/>
      </div>
      </>
    )
  } 
  if ((type === 'description_link')) {
    //description text at bottom
    renderedContent = (
      <>
      <Link to={`/${to}`} className='flex flex-col w-11/12 lg:max-w-[900px] h-[300px] sm:h-[364px] bg-slate-800 hover:bg-slate-700 border border-solid border-slate-500 mx-4'>
        <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase'>
          {title}
        </h1>
        <img src={image} alt='Welcome back' className='h-44 sm:h-60 justify-center items-center mx-auto pointer-events-none pb-2'/>
        {/* bottom text description */}
        <div className='flex-1'></div>
        <div className='flex-grow-1 items-center w-full bg-slate-700'>
          <h2 className='font-normal font-poppins text-sm sm:text-base text-zinc-100 tracking-tight truncate-lines-2 md:truncate-none py-2 px-2'>
            {description}
          </h2>
        </div>
      </Link>
      </>
    )
  }
  if ((type === 'description')) {
    //description text at bottom
    renderedContent = (
      <>
      <div className='flex flex-col w-11/12 lg:max-w-[900px] h-[300px] sm:h-[364px] bg-slate-800 border border-solid border-slate-500 mx-4'>
        <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase'>
          {title}
        </h1>
        <img src={image} alt='Welcome back' className='h-44 sm:h-60 justify-center items-center mx-auto pointer-events-none pb-2'/>
        {/* bottom text description */}
        <div className='flex-1'></div>
        <div className='flex-grow-1 items-center w-full bg-slate-700'>
          <h2 className='font-normal font-poppins text-sm sm:text-base text-zinc-100 tracking-tight truncate-lines-2 md:truncate-none py-2 px-2'>
            {description}
          </h2>
        </div>
      </div>
      </>
    )
  }
  if ((type === 'description_gray')) {
    //description, text at bottom, zinc color
    renderedContent = (
      <>
      <div className='flex flex-col w-11/12 lg:max-w-[900px] h-[300px] sm:h-[364px] bg-zinc-800 border border-solid border-zinc-500 mx-4 cursor-not-allowed'>
        <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase'>
          {title}
        </h1>
        <img src={image} alt='Welcome back' className='h-44 sm:h-60 justify-center items-center mx-auto pointer-events-none pb-2'/>
        {/* bottom text description */}
        <div className='flex-1'></div>
        <div className='flex-grow-1 items-center w-full bg-zinc-700'>
          <h2 className='font-normal font-poppins text-sm sm:text-base text-zinc-100 tracking-tight truncate-lines-2 md:truncate-none py-2 px-2'>
            {description}
          </h2>
        </div>
      </div>
      </>
    )
  }
  if ((type === 'mini_link')) {
    //Mini banner h-[112px]
    renderedContent = (
      <>
      <Link to={`/${to}`} className='flex flex-row justify-between w-11/12 lg:min-w-[900px] lg:max-w-[900px] h-[112px] sm:h-[112px] bg-slate-800 hover:bg-slate-700 border border-solid border-slate-500 mx-4'>
        <div className='flex flex-col'>
          <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase'>
            {title}
          </h1>
          <h2 className='font-normal font-poppins text-sm sm:text-base text-zinc-100 tracking-tight truncate-lines-2 md:truncate-none py-2 px-2'>
            {description}
          </h2>
        </div>
        <div className='flex items-center me-4'>
          <img src={image} alt='Welcome back' className='h-24 mx-auto pointer-events-none'/>
        </div>
      </Link>
      </>
    )
  }
  if ((type === 'mini')) {
    //Mini banner h-[112px], No Link
    renderedContent = (
      <>
      <div className='flex flex-row justify-between w-11/12 lg:min-w-[900px] lg:max-w-[900px] h-[112px] sm:h-[112px] bg-slate-800 border border-solid border-slate-500 select-none'>
        <div className='flex flex-col'>
          <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight px-2 pt-2 pb-0.5 uppercase'>
            {title}
          </h1>
          <h2 className='font-normal font-poppins text-sm sm:text-base text-zinc-100 tracking-tight truncate-lines-2 md:truncate-none py-2 px-2' style={{ whiteSpace: 'pre-line' }}>
            {description}
          </h2>
        </div>
      </div>
      </>
    )
  }
  if ((type === 'image')) {
    //Only Image
    renderedContent = (
      <>
      <div className='flex flex-col w-11/12 lg:max-w-[900px] h-[300px] sm:h-[364px] mx-4 bg-slate-800 border border-solid border-slate-500 '>
        <img src={image} alt='Welcome back' className='h-full w-full object-cover justify-center items-center mx-auto pointer-events-none'/>
      </div>
      </>
    )
  }
  if ((type === 'message_text')) {
    //Message, No title, No Link
    renderedContent = (
      <>
      <div className='flex flex-col w-11/12 lg:max-w-[900px] min-h-[300px] py-4 bg-slate-800 border border-solid border-slate-500 '>
        {/* text description */}
        <div className='flex-grow-1 justify-center items-center w-full'>
          <p className='font-normal font-poppins text-sm sm:text-base text-zinc-300 tracking-tight px-2' style={{ whiteSpace: 'pre-line' }}>
            {description}
          </p>
        </div>
      </div>
      </>
    )
  }
  if ((type === 'message_text_gray')) {
    //Message, No title, No Link
    renderedContent = (
      <>
      <div className='flex flex-col w-11/12 lg:max-w-[900px] min-h-[300px] py-4 bg-zinc-800 border border-solid border-zinc-500 cursor-not-allowed'>
        {/* text description */}
        <div className='flex-grow-1 justify-center items-center w-full'>
          <p className='font-normal font-poppins text-sm sm:text-base text-zinc-300 tracking-tight px-2' style={{ whiteSpace: 'pre-line' }}>
            {description}
          </p>
        </div>
      </div>
      </>
    )
  }
  if ((type === 'mini_message')) {
    //Mini banner h-[112px], No Link
    renderedContent = (
      <>
      <div className='flex flex-row justify-between w-11/12 lg:max-w-[900px] min-h-[112px] bg-slate-800 border border-solid border-slate-500 select-none'>
        <div className='flex flex-col'>
          <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight px-2 pt-2 pb-0.5 uppercase'>
            {title}
          </h1>
          <h2 className='font-normal font-poppins text-sm sm:text-base text-zinc-100 tracking-tight md:truncate-none py-2 px-2' style={{ whiteSpace: 'pre-line' }}>
            {description}
          </h2>
        </div>
      </div>
      </>
    )
  }
  if (type === 'half_no_description') {
    //half width no description text
    renderedContent = (
      <>
      <Link to={`/${to}`} className='flex flex-col w-1/2 lg:max-w-[438px] h-[200px] sm:h-[300px] bg-slate-800 hover:bg-slate-700 border border-solid border-slate-500'>
        <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase'>
          {title}
        </h1>

        <div className='flex flex-grow w-[80%] h-[80%] justify-center items-center mx-auto'>
          <img
            src={image}
            alt='Welcome back'
            className='object-contain h-full w-full'
          />
        </div>
      </Link>
      </>
    )
  } 
  if (type === 'half_no_description_small_img') {
    //half width no description text
    renderedContent = (
      <>
      <Link to={`/${to}`} className='flex flex-col w-1/2 lg:max-w-[438px] h-[200px] sm:h-[300px] bg-slate-800 hover:bg-slate-700 border border-solid border-slate-500'>
        <h1 className='text-2xl sm:text-4xl font-medium font-oswald italic text-zinc-50 tracking-tight p-2 uppercase'>
          {title}
        </h1>

        <div className='flex flex-grow w-[30%] h-[30%] justify-center items-center mx-auto'>
          <img
            src={image}
            alt='Welcome back'
            className='object-contain h-full w-full'
          />
        </div>
      </Link>
      </>
    )
  } 


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