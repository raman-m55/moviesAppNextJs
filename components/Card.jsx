'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import { motion ,AnimatePresence } from "framer-motion";
import Link from 'next/link';

export function formatTitle(item) {
  let title = item?.title || item?.name;
  if (title.length > 12) {
      return title.slice(0, 12)  ;
  } else {
      return title;
  }
}

const Card = ({item , type}) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(item);


  return (
    <Link href={`/details/${type}/${item.id}`}>
    <div

    className='w-[150px] max-md:min-w-[120px] max-sm:min-w-[70px]
     flex flex-col items-center justify-center 
     '> 
        <motion.div
         className='click relative w-full h-[240px]'
         id='click'
         onHoverStart={() => setIsHovered(true)}
         >
          
        <Image
              src={`http://image.tmdb.org/t/p/w500${item?.poster_path}`}
              alt='image'
              className=' bg-cover bg-center rounded-xl'
              fill/>

{isHovered && (
          <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className='p-3 w-full h-full  bg-black/75 z-[9990] absolute
          rounded-xl'
            initial={{ height: 0 , opacity: 0}}
            animate={{ height: '100%' , opacity: 1 }}
            exit={{ height: 0  , opacity: 0}}
            transition={{ delay: 0.7 }} 

          >
          <p className='text-gray-200 text-xs font-serif leading-5	'> 
            {item?.overview.split(" ").slice(0, 30).join(" ")} ...  
          </p>
          </motion.div>
        
      )}
        </motion.div>
        <div  className='p-3 text-white text-sm
        font-medium w-full flex flex-col items-start justify-start'>
          { (item?.release_date || item?.first_air_date) && item?.vote_average &&
          <div className="flex items-center justify-between w-full pb-2">
               <p className='text-white text-xs text-gray-500 pb-1'>
                ( {(item?.first_air_date || item?.release_date).split('-')[0]} )</p>
          <div className='flex gpa-[20px] items-center justify-between'>
            <FontAwesomeIcon icon={faThumbsUp} style={{color: "#2563eb",height : '10px',
            paddingRight:'10px'}} />
            <p className='text-xs text-white text-gray-500'>
            10 / {Math.floor(item?.vote_average) } 
            </p>
          </div>
          </div>

          }

          <p className='pb-1'>{formatTitle(item)}</p>

        </div>
    </div>
    </Link>

  )
}

export default Card