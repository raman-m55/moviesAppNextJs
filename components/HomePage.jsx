import React  from 'react'
import { SliderCard } from './index'
import { fetchData } from '@/fetchData';
const HomePage = async () => {
        const data = await fetchData('trending/movie/day?language=en-US');
        const results = await data.results;

        const data2 = await fetchData('movie/now_playing?language=en-US&page=1');
        const results2 = await data2.results;

        const data3 = await fetchData('trending/tv/day?language=en-US');
        const results3 = await data3.results;

        const data4  = await fetchData('tv/on_the_air?language=en-US&page=1');
        const results4 = await data4.results;


  return (
    <div className='p-7 md:px-20 flex flex-col justify-start items-center
    w-full h-full gap-20'>

        <SliderCard results={results} title='Trending movies'  href='movie' />
        <SliderCard results={results2} title='Movies playing' href='movie'/>
        <SliderCard results={results3} title='Trending TV' href='tv'/>
        <SliderCard results={results4} title='TVs playing' href='tv'/>



    </div>
  )
}

export default HomePage