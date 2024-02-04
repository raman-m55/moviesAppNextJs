import React from 'react'
import { Card } from '.'

const gridCard = ({results}) => {
  return (
    <div className='w-full flex justify-start max-md:justify-center flex-wrap gap-10'>
        {results && results?.map((item , index) => (
            (item?.poster_path && <Card item={item} key={index}/>)
        ))}
    </div>
  )
}

export default gridCard