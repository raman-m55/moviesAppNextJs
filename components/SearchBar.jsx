'use client' 
import { useRouter } from 'next/navigation'; 

import React, { useState  } from 'react'
import { motion ,AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark ,faGear,  faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {countries , languages , genres , sort} from '@/context/index';
import { ListboxComponent , ComboboxComponent, GroupButtons } from '@/components/index';
import Link from 'next/link';


const SearchBar = ({setOpenSearch ,openSearch }) => {
  const router = useRouter()

    const [openSetting, setOpenSetting] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
    const [selectedGenres, setSelectedGenres] = useState(genres[0])
    const [selectType, setSelectType] = useState('movie');
    const [selectedCountry, setSelectedCountry] = useState(countries[0])
    const [sortBy, setSortBy] = useState(sort[0])
    const [keyword, setKeyword] = useState('')
    const [search, setSearch] = useState('')



    

  return (
    <>
    <div  className={`flex items-center  justify-start 
    bg-gray-900/0 px-2 rounded-lg ${openSearch && 'border lg:w-full'}
     border-blue-600 `}>

      <button
        className="p-2 cursor-pointer transition ease-in-out duration-150
         hover:-translate hover:scale-125"
        onClick={() => !openSearch && setOpenSearch(!openSearch)}>
          {openSearch && search? (
            <Link href={{
        pathname : `/search/${selectType}/${search}`,
        query : {page : '1'}
      }}>
          <FontAwesomeIcon icon={faMagnifyingGlass}
          style={{color: "#2563eb",height :'25px' }} />
      </Link>
          ):(
            <FontAwesomeIcon icon={faMagnifyingGlass}
            style={{color: "#2563eb",height :'25px' }} />
          )}

      </button>
  <AnimatePresence>
    {openSearch && (
      <motion.input
        type="text"
        className="rounded-r-lg p-2 bg-gray-400/0 outline-0 text-gray-200"
        placeholder='Search ...'
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        exit={{ width: 0 }}
        transition={{ duration: 0.2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    )}
  </AnimatePresence>

  {openSearch && (
    <div className='flex items-center justify-between gap-4'>
    <button
      className="rounded-lg cursor-pointer transition
      ease-in-out duration-300  hover:scale-105"
      onClick={() => setOpenSearch(!openSearch)}
    >
            <FontAwesomeIcon icon={faXmark} style={{color: "#2563eb",}} />

    </button>
        <button
        className="rounded-lg cursor-pointer transition
        ease-in-out duration-300 hover:-translate-y-1 hover:scale-105"
        onClick={() => setOpenSetting(!openSetting)}>
              <FontAwesomeIcon icon={faGear} style={{color: "#ffffff",height : '25px'}} />
  
      </button>
      </div>
  )}
</div>

    {openSetting && (
        <div className='absolute p-0 w-screen h-screen top-0 bottom-0
        right-0 left-0 p-4 flex items-center justify-center bg-black/70 '
        >
        <div className='w-[500px] h-max bg-gradient-to-b from-blue-600 to-blue-900
         rounded-xl p-4 flex items-start justify-start flex-col gap-4 relative'>
            <div className='w-full flex items-center justify-center absolute top-[-35px]
             left-0 right-0
             '>
              <div className='bg-blue-600 w-max p-3 rounded-lg'>
                  <h1 className='text-white text-xl
                  font-wight' onClick={()=>{}}>Advanced search</h1>
              </div>
  
            </div>
            <div className='flex flex-col items-between justify-between w-full
            gap-10'>
            <div className='flex items-center justify-between gap-5'>
              <ComboboxComponent setSelected={setSelectedGenres} selected={selectedGenres}
              keyObject={'name'} items={genres} />

              <GroupButtons setSelectType={setSelectType}
              selectType={selectType}/>
            </div>

            <div className='flex items-center justify-between gap-5'>
              <ComboboxComponent setSelected={setSelectedCountry} selected={selectedCountry}
              keyObject={'english_name'} items={countries}/>


              <ComboboxComponent setSelected={setSelectedLanguage} selected={selectedLanguage}
              keyObject={'english_name'} items={languages}/>
            </div>
              
            <div  className='flex items-center justify-between gap-5'>
              <ListboxComponent setSelected={setSortBy} selected={sortBy}
              keyObject='name' items={sort}/>
              <div className='flex-1'>
              <input type="text" className='w-full outline-0 childe:pl-2  cursor-default
              rounded-lg bg-gray-900
              py-3 pl-1   box-border text-left shadow-md sm:text-sm text-white'
              placeholder='Keyword ...'
              value={keyword}
              onChange={(e)=> setKeyword(e.target.value)} />
              </div>

            </div>
            <div className='flex justify-center items-center'>
              <div className='flex items-center justify-center'>
                <button  className='m-2 p-2 rounded-md bg-gray-900
                  text-white outline-0 hover:bg-slate-700 ' 
                  onClick={() => setOpenSetting(!openSetting)} >
                    cancel
                </button>
                <Link href={{
                  pathname : '/search/discover',
                  query : {type : selectType ,
                           language : selectedLanguage['iso_639_1'] ,
                           page : '1',
                           genre : selectedGenres['id'],
                           country : selectedCountry['iso_3166_1'] ,
                           sortBy : sortBy['value'] , 
                           keyword : keyword}
                }}>
                <button  className='m-2 p-2 rounded-md bg-gray-900
                  text-white outline-0 hover:bg-slate-700 '
                 >
                    Search
                </button>
                </Link>
              </div>
            </div>
            </div>
        </div>
        </div>
    )}


</>
  )
}

export default SearchBar