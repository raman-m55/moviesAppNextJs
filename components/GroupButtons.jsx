import React from 'react'

const GroupButtons = ({setSelectType,selectType}) => {
  return (
    <div className='rounded-md flex-1 box-border'>
        {['tv','movie'].map((item , index) => (
            <button
            type='button' className={`py-3 text-sm text-white
            h-full  text-center w-1/2 bg-gray-900
            hover:bg-gray-700 outline-0 border-none  rounded-md
            ${selectType === item && 'bg-gradient-to-r from-sky-500 from-10%  to-emerald-500 to-90%'}`} key={index} 
            onClick={()=> setSelectType(item) } >
                {item}
            </button>
        ))}
    </div>
  )
}

export default GroupButtons