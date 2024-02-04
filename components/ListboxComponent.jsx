'use client'
import React from 'react'

import { Listbox,Transition } from '@headlessui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronDown , faCheck} from '@fortawesome/free-solid-svg-icons';

const ListboxComponent = ({setSelected , selected  ,keyObject ,items}) => {
  return (
    <Listbox value={selected} as='div' onChange={setSelected} className='flex-1'>
            <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-900
           py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500
           focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2
            focus-visible:ring-offset-orange-300 sm:text-sm text-white">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FontAwesomeIcon icon={faChevronDown} style={{color: "#ffffff",}} />
            </span>
          </Listbox.Button>
          <Transition
            as={'div'}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full
             overflow-auto rounded-md bg-gray-900 py-1 text-base  ring-1
              ring-black/5 focus:outline-none sm:text-sm">
              {items.map((item, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-500' : 'text-white'}`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item[keyObject]}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",height : "20px"
                        , width : '20px'}} />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
  )
}

export default ListboxComponent