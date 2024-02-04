'use client'

import { fetchData } from '@/fetchData';
import GridCard from '@/components/GridCard';
import { useEffect, useState } from 'react'


export default function page({params}) {
  const item = params.type ;

  const [countPages, setCountPages] = useState(1);
  const [search, setSearch] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(`${item}/now_playing?language=en-US&page=1`)
      setSearch([...data.results])
      console.log(search);
    } 
    getData()
  },[item ])

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(`${item}/now_playing?language=en-US&page=${countPages}`)
      setSearch([...search , ...data.results])
    } 
    getData()
  },[countPages])


  return (
<div className='p-4 pt-24 md:px-20 w-full h-full ' >
      <div className='w-full text-center text-gray-200 text-2xl mb-20'>
        <h1>{item} playing</h1>
      </div>
      <GridCard results={search}/>
      <div className='w-full flex items-center justify-center '>
        <button className='text-white text-2xl rounded-lg
        outline-0 border-0 shadow-black bg-blue-900 p-3
        hover:bg-blue-700 '
        onClick={() => setCountPages(() => countPages + 1 )}>
        Load More
        </button>
      </div>
    </div>
  )
}