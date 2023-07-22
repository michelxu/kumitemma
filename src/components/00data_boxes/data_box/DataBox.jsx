const DataBox = (props) => {
  const {title, description} = props;
  let desc
  if (description === '') desc = '-'
  if (description !== '') desc = description

  return (
    <>
    <div className='flex flex-col items-center w-full text-zinc-200 font-oswald tracking-tight uppercase rounded bg-zinc-600 '>
      {/* top */}
      <div className='flex justify-center w-full bg-zinc-800 rounded-t'>
        <p className='text-center text-xs text-zinc-400'>{title}</p>
      </div>
      {/* body */}
      <div className='flex flex-col justify-center items-center w-full px-2 py-1'>
        <p className='text-2xl uppercase'>{desc}</p>
      </div>
    </div>
    </>
  )
}

// Set default props using the defaultProps static property
DataBox.defaultProps = {
  title: 'Title',
  description: 'Default Value',
};


export default DataBox