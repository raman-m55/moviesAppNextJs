'use client'

import { fetchData } from '@/fetchData'
import { useEffect, useState } from 'react'
import GridCard from '@/components/GridCard';
import {useSearchParams } from 'next/navigation'





const page = ({params }) => {
  const [search, setSearch] = useState([])
  const [countPages, setCountPages] = useState(1)
  const item = params.item
  const searchParams = useSearchParams()
  const type = searchParams.get('type');
  const language = searchParams.get('language');
  const genre = searchParams.get('genre');
  const country = searchParams.get('country');
  const sortBy = searchParams.get('sortBy');
  const keyword = searchParams.get('keyword');


  const getData = async () => {

    if(item[0] === 'discover') {
      const data = await fetchData(`discover/${type}?include_adult=false&include_video=false&language=${language}&page=${countPages}&sort_by=${sortBy}${genre !== '' && `&with_genres=${genre}`}${country && `&with_origin_country=${country}`}`);
      return data.results ; 
    } else {
      const data = await fetchData(`search/${item[0]}?query=${item[1]}&include_adult=false&language=en-US&page=${countPages}`);
      return data.results ; 
    }
  }
  useEffect(() => {
    const setData = async () => {
    const data = await getData()
    setSearch([...data])
    console.log(data);
    }
    setData()
  },[language , genre , sortBy , country , keyword ,type ])



  useEffect(  () => {
    const setData = async () => {
      const data = await getData()
      setSearch([...search , ...data])
      const query = new URLSearchParams(window.location.search);
      query.set('page' , countPages)
    console.log(data);

    }
    setData()
    

  },[countPages])




  return (
    <div className='p-4 pt-24 md:px-20 w-full h-full ' >
      <div className='w-full text-center text-gray-200 text-2xl mb-20'>
        {item[0] === 'discover' ? <h1>Advanced search</h1> : 
        <h1>Search results for : {item[1]}</h1>
}
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

export default page