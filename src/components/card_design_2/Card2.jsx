const Card2 = () => {
  return (
    <>
    <div className='flex flex-col w-48 h-64 select-none border-solid border-2 border-zinc-700 relative'>
      <div className='flex flex-grow flex-col bg-rose-700 ronded-t-sm'>
        {/* top section */}
        <div className='bg-zinc-100 h-44 rounded-t mx-2 mt-2'>
          <img src="https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2020-10/68504%252Fprofile-galery%252Ffullbodyleft-picture%252FNURMAGOMEDOV_KHABIB_L_BELT_10-24.png" 
          className='h-full p-0'
          />
        </div>
        {/* bottom section */}
        <div className='flex flex-col justify-center items-center text-center w-full mt-auto mb-0 h-16 rounded-b bg-zinc-950'>
          <p className='text-md font-bold text-white'>NURMAGOMEDOV</p>
          {/* stats */}
          <div className="flex flex-row space-x-2 text-center text-white">
            <div>
              <h3 className="text-xs font-regular -mb-2">STR</h3>
              <h3 className="font-semibold text-lg">82</h3>
            </div>
            <div>
              <h3 className="text-xs font-regular -mb-2">DEF</h3>
              <h3 className="font-semibold text-lg">94</h3>
            </div>
            <div>
              <h3 className="text-xs font-regular -mb-2">GRP</h3>
              <h3 className="font-semibold text-lg">97</h3>
            </div>
            <div>
              <h3 className="text-xs font-regular -mb-2">BJJ</h3>
              <h3 className="font-semibold text-lg">90</h3>
            </div>
            <div>
              <h3 className="text-xs font-regular -mb-2">STM</h3>
              <h3 className="font-semibold text-lg">98</h3>
            </div>
            <div>
              <h3 className="text-xs font-regular -mb-2">HLT</h3>
              <h3 className="font-semibold text-lg">98</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Card2