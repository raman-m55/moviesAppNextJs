import React from 'react'

const VideoYoutube = ({item}) => {
    console.log(item);
    
  return (
<>
    <div className='text-left w-full mb-5 rounded-xl'>
    <h1 className='text-white text-2xl'>{item?.name}</h1>
    </div>
    <div className='relative pb-[56.25%] h-[70%] w-full  mb-10 overflow-hidden rounded-xl'>
        <iframe 
            src={`https://www.youtube.com/embed/${item?.key}`}
                className='absolute top-0 left-0 w-full h-full rounded-xl'
        ></iframe>
    </div>
</>

  )
}

export default VideoYoutube