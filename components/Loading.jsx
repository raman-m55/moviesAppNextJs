import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='flex gap-5 item-center
        justify-center'>
            <h1 className='text-white text-3xl font-mono '>Loading </h1>
            <FontAwesomeIcon icon={faSpinner} spinPulse style={{color: "#ffffff", height:'35px'}} /> 
        </div>
   
    </div>
  )
}

export default Loading