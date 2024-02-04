import { SliderCard } from '@/components';
import VideoYoutube from '@/components/VideoYoutube';

import { fetchData } from '@/fetchData';
import Image from 'next/image';
import React from 'react'




const page = async ({params}) => {
    const item = params.id;
    const data = await fetchData(`${item[0]}/${item[1]}?language=en-US`);
    const credits = await fetchData(`${item[0]}/${item[1]}/credits?language=en-US`);
    const videos = await fetchData(`${item[0]}/${item[1]}/videos?language=en-US`);
    const similar = await fetchData(`${item[0]}/${item[1]}/similar?language=en-US&page=1
`);

    const video = videos?.results?.filter((item) => item?.official === true);

  return (
    <div className='w-full min-h-screen flex flex-col items-start justify-start
    bg-gradient-to-b from-black '>
        <div 
          style={{
            backgroundImage: 
            `linear-gradient(to bottom, rgba(0,0,0,0.4  ), rgba(0,0,0,0)), 
            linear-gradient(to top, rgba(0,0,0,4  ), rgba(0,0,0,0)),
            url(http://image.tmdb.org/t/p/original${data?.backdrop_path})`
          }}
          className='w-full h-[400px] bg-cover bg-center absolute z-[0]'/>

          <div className='w-full h-[700px] max-lg:h-max
          flex items-center justify-center'>

          <div className=' max-w-max  h-[700px] max-lg:h-max     
            pt-[170px]  max-lg:pt-[100px]  flex max-lg:flex-col justify-center items-start
           max-lg:items-center gap-10 z-[1]'>
            <div
             id='image' className='relative min-w-[290px] h-[460px]'>

              <Image
              src={`http://image.tmdb.org/t/p/w500${data?.poster_path}`}
              alt='image'
              className='bg-center rounded-2xl '
              fill
              />
            </div>
            <div className='h-full max-w-[650px] max-lg:text-center flex flex-col justify-start
            max-lg:items-center items-start gap-5 '>
              <h1 className='text-4xl text-white test-white font-bold '>
                {data?.original_title || data?.name}
              </h1>
              <div className='w-full flex items-center justify-start
               max-lg:justify-center gap-2'>
                {data?.genres?.map((genre , index) => (
                  <div key={index} className='p-1 px-2  font-wight text-lg text-white
                  max-md:text-sm  border-2 border-white rounded-2xl '>
                    <h4>{genre.name}</h4>
                  </div>
                ))}
              </div>
              <div className='text-sm text-gray-400 max-w-[600px] max-md:w-5/6 '>
                <p>{data?.overview}</p>
              </div>
              <div className='flex items-center justify-between gap-5 text-white
              font-mono'>
                <div className='flex items-center justify-between text-white gap-2'>
                  <div className='border-2 border-yellow-400 py-1
                    px-3 rounded-lg text-yellow-400'>
                        IMDB
                  </div>
                  <p>{data?.vote_average}</p>

                </div>
                  |
                <div className='flex items-center justify-between text-white gap-2'>
                  <h4>Vote Count : </h4>
                  <p> {data?.vote_count}</p>
                </div>
              </div>
              
              <div className='flex flex-col items-between justify-center text-white
              gap-3'>
                <h1>casts</h1>
                <div className='flex items-center justify-start gap-7
                max-md:gap-3 rounded-xl'>
                  {credits.cast?.splice(0,5)?.map((item , index) => (
                    <div key={index} className='w-[60px] h-[100px] '>
                      <div className='relative w-full h-[90px]'>
                        <Image 
                        src={`http://image.tmdb.org/t/p/h632${item?.profile_path}`}
                        fill
                        className='rounded-xl'
                        />

                      </div>
                      <h3 className='text-white text-xs pt-1'>{item.name}</h3>
                    </div>
                  ))}

                </div>

              </div>
            </div>
            
          </div>
          </div>
      
      <div className='p-4 md:px-20  w-full h-min md:px-20 flex flex-col
      items-center justify-between mt-20'>
          {video?.splice(0,2).map((item , index) => (
            <VideoYoutube item={item} key={index}/>
          ))}
      </div>

      <div className='p-4 md:px-20 w-full  '>
            <SliderCard results={similar?.results} title='similar'
            href={item[0]} />
      </div>
    </div>
  )
}

export default page