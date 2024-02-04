'use client'

import React , { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars  , faXmark , faClapperboard   } from '@fortawesome/free-solid-svg-icons';
import {navbar} from '@/context/index';
import Link from 'next/link';
import { useAnimate , stagger  } from "framer-motion";
import SearchBar from './SearchBar';

 

const Navbar = () => {
  const [open, setOpen] = useState(true)
  const [scroll, setScroll] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [scope, animate] = useAnimate();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navBarVisible, setNavBarVisible] = useState(true);


  const changeBackground = () => {
    if(window.scrollY >= 80) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop){
        setNavBarVisible(false);
      } else {
        setNavBarVisible(true);
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

useEffect(() => {
  window.addEventListener('scroll', changeBackground);
  return () => {
    window.removeEventListener('scroll', changeBackground);
  };
}, []);



useEffect(() => {


  animate(open ? [
    [".an-nav",{transform: "translateX(0%)"}, {duration: 0.3}] ,
    [".an-side",{opacity : [ 0, 1 ]},],
    [
      ".an-li",
      { transform: "scale(1) translateX(0%)", opacity: 1, filter: "blur(0px)" },
      { delay: stagger(0.05), at: "-0.1" }
    ]
  ] :[  [
          ".an-li",
          { transform: "scale(0.5) translateX(100%)", opacity: 0, filter: "blur(10px)" },
          { delay: stagger(0.05, { from: "last" }), at: "<" }
        ],
        [".an-side",{opacity :0 } ,{duration: 0}] ,
        [".an-nav",{transform: "translateX(200%)"}] 
      ] );
}, [open]);



  return (
    <nav className={`p-4 md:px-20  flex items-center justify-between fixed top-0
    left-0 right-0 z-[9999]
    ${navBarVisible ? 'inline'  : 'hidden'}
    ${scroll && 'md:backdrop-blur-xl  bg-black/50  '}`} ref={scope} >
      <div className='flex items-center justify-between gap-10 '>
        <Link href='/' className='flex justify-between items-center gap-2
          cursor-pointer transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-105'>
          <h1 className='text-white text-3xl font-bold'>Movies</h1>
          <FontAwesomeIcon icon={faClapperboard} style={{color: "#2563eb", height : '30px'}} />
        </Link>
        <SearchBar setOpenSearch={setOpenSearch} openSearch={openSearch}/>
      </div>



      <div className={`flex items-center justify-between gap-10
      cursor-pointer max-md:hidden ${openSearch && 'max-lg:hidden'}`}>
        {navbar.map((item , index) => (
          <Link href={`/${item.pathName }`}>
          <p className='text-white text-md font-bold
          cursor-pointer transition ease-in-out duration-300
           hover:-translate-y-1 hover:scale-110' key={index}>
            {item.name}
            </p>
          
          </Link>
        ))}
      </div>

      <div  className={` ${openSearch && 'max-lg:hidden'}  md:hidden  `}>
      <FontAwesomeIcon icon={faBars} style={{color: "#2563eb", height : '30px'}}
        onClick={()=> setOpen((prev) => !prev)} className='cursor-pointer transition ease-in-out
         duration-300 hover:-translate-y-1 hover:scale-110'/>
        <div className='an-nav  fixed top-0 right-0 left-0 flex  w-full   h-full z-50 '>
            <div className='an-side backdrop-blur-sm bg-slate-950/55 w-full h-full ' onClick={()=> setOpen((prev) => !prev)}>
            </div>

            <div  className='w-3/5 h-full bg-black'>
                <div className='flex items-center justify-between gap-5 p-9 '>
                    <FontAwesomeIcon icon={faXmark} style={{color: "#2563eb", height : '30px'}}
                     onClick={()=> setOpen((prev) => !prev)} className='
                     cursor-pointer transition ease-in-out duration-300
                      hover:-translate-y-1 hover:scale-110' />
                    <Link href='/' className='flex justify-between items-center
                    transition ease-in-out duration-300 hover:-translate-y-1
                     hover:scale-110 gap-2  cursor-pointer'>
                    <h1 className='text-white text-3xl font-bold'>Movies</h1>
                    <FontAwesomeIcon icon={faClapperboard} style={{color: "#2563eb", height : '30px'}} />
                    </Link>
                </div>

                <div className='flex flex-col items-end justify-center'>
                {navbar.map((item , index) => (
                    <div key={index} className='an-li text-white text-md font-bold hover:bg-slate-900 p-4
                    w-full text-right cursor-pointer transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110'>
                      <Link href={`/${item.pathName}`}>
                        <p className='cursor-pointer transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110'>{item.name}</p>

                      </Link>
                    </div>
                
                ))}
                </div>
            </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar