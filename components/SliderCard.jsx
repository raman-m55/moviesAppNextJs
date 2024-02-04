'use client';

import React from 'react'
import Button from './Button';
import {Scrollbar} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/scrollbar';
import  Card  from './Card';


const SliderCard = ({results , title , href}) => {

  return (
    <div className='w-full flex flex-col items-center justify-center
    gap-5'>
        <div className='w-full flex items-center justify-between'>
        <div>
            <h1 className='text-md font-bold
            text-white'>{title}</h1>
        </div>
        <Link href={{
          pathname : `/${href}`,
          query : {page : 1}
        }} className='pointer-curser'>
            <Button item ='View more' style='border-solid border-2 border-white
            min-w-[140px] p-1 font-wight text-white text-md rounded-xl text-center  '/>
        </Link>

        </div>
        <Swiper
            className='w-full  swiper-container '
            modules={[ Scrollbar ]}
            spaceBetween={50}
            slidesPerView={9}
            scrollbar={{ draggable: true , }}
            pagination={{
                clickable: true,
              }}
              breakpoints={{
                200 : {
                    slidesPerView: 3,
                    spaceBetween:150,
                } ,
                460: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 50,
                },
                1280 :{
                    slidesPerView: 7,
                    spaceBetween: 60,
                },
                1536 :{
                    slidesPerView: 8,
                    spaceBetween: 40,
                }
              }}
            >
                {results && results?.map((item , index) => (

                    <SwiperSlide key={index} style={{marginBottom : '10px'}}>
                            <Card item={item} type={href} />
                    </SwiperSlide>

                ))}
        </Swiper>
    </div>
  )
}

export default SliderCard