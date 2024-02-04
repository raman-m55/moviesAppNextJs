'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchData } from '@/fetchData';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {Pagination , EffectFade , Autoplay} from 'swiper/modules';
import { useAnimate, stagger } from "framer-motion";

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-fade';

import  Button  from './Button';
import Loading from './Loading';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';






const TopPage = () => {
  const [results, setResults] = useState([]);
  const [scope, animate] = useAnimate()
  const [slide, setSlide] = useState()

  //برای تایمر اسلادر 
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };



  useEffect (()=> {

    const fetch = async () => {
    const data = await fetchData('trending/all/day?language=en-US');
    setResults(data?.results);
    }
    fetch()
    
  },[])

  useEffect(() => {
    // اجرای انیمیشن هر بار که اسلاید تغییر کند
    animate([
      ['.an-image',{scale : [0, 1] , opacity : [0,1]} , {duration: 0.3}],
      ['.an-button' , {y :[-50 , 0], opacity : [0,1]} , {duration: 0.3}] ,
      ['.an-dec' , {y :[-50 , 0], opacity : [0,1]} , {duration: 0.3} ] ,
      ['.an-like' , {y :[-50 , 0], opacity : [0,1]}   , {duration: 0.3}],
      ['.an-title' , {y :[-50 , 0] ,opacity : [0,1]}  , {duration: 0.3}],
    ]);
  }, [slide]);
  

  return (
    <Swiper
      modules={[ Pagination,EffectFade , Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true  }}
      loop={true}
      effect="fade"
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
       onAutoplayTimeLeft={onAutoplayTimeLeft}
       onSlideChange={(swiper) => {
        setSlide(swiper.activeIndex);
        
      }}
      ref={scope}

    >
      {results && results?.map((item , index) => (
        <SwiperSlide key={index}>
          <Suspense fallback={<Loading/>}>

          <div 
          style={{
            backgroundImage: 
            `linear-gradient(to bottom, rgba(0,0,0,0.9  ), rgba(0,0,0,0)), 
            linear-gradient(to top, rgba(0,0,0,1  ), rgba(0,0,0,0)),
            url(http://image.tmdb.org/t/p/original${item?.backdrop_path})`
        }}
          className='h-[100vh] w-screen  bg-cover bg-center
          flex max-lg:flex-col-reverse  max-lg:pt-[50px] items-center
          justify-around max-lg:justify-around  p-7  gap-2 '>
            <div className='flex flex-col  max-lg:items-center
            max-lg:text-center 
            items-start justify-start gap-4 w-1/2
            max-lg:w-full  ' id='title' >
              <h1 className='an-title text-white text-3xl font-bold
              '>{item?.title || item?.name}
              </h1>
              <div className='an-like flex gpa-[20px] items-center justify-between'>
                <FontAwesomeIcon icon={faThumbsUp} style={{color: "#2563eb",height : '20px',
                paddingRight:'10px'}} />
                <p className='text-xl text-white'>
                10 / {Math.floor(item?.vote_average) } 
                </p>
              </div>

              <p className='an-dec text-gray-400 text-md font-wight'>
                  {item?.overview.split(" ").slice(0, 20).join(" ")} ...
              </p>
              <div className='an-button'>
                <Button item='Watch' style='p-2 text-white text-xl 
                font-bold rounded-xl bg-[#2563eb] min-w-[100px] text-center'
               />
              </div>

            </div>
            <div id='image' className='an-image w-[300px] max-lg:w-[260px]
            min-h-[420px] max-lg:min-h-[370px]  relative
            max-lg:mt-[10px] ' >

              <Image
              src={`http://image.tmdb.org/t/p/w500${item?.poster_path}`}
              alt='image'
              className=' bg-cover bg-center rounded-xl'
              fill/>
            </div>
          </div>
          
          </Suspense>

        </SwiperSlide>
      ))}
          {/*  برای نمایش تایمر اسلایدر */}
    
          <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
    </Swiper>
  )
}

export default TopPage