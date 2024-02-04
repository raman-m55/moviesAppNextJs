'use client'
import React, { useState , Fragment } from 'react'
import { Combobox ,Transition } from '@headlessui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown , faCheck} from '@fortawesome/free-solid-svg-icons';




const ComboboxComponent = ({setSelected , selected , keyObject , items}) => {
    const [query, setQuery] = useState('')


    const filteredPeople =
    query === ''
      ? items
      : items.filter((item) =>
          item[keyObject]
            .toLowerCase()
            .replace(/\s/g, '')
            .includes(query.toLowerCase().replace(/\s/g, ''))
        )

  return (
    <Combobox value={selected} onChange={setSelected} className="flex-1">
            <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-900 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                className="w-full border-none py-3 pl-3 pr-10 text-sm leading-5 text-white
                bg-gray-900  focus:ring-0"
              displayValue={(item) => item[keyObject]}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 bg-gray-900 ">
            <FontAwesomeIcon icon={faChevronDown} style={{color: "#ffffff",}} />
            </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto
             rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5
              focus:outline-none sm:text-sm z-[999]">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((item , index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item[keyObject]}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",height : "20px"
                        , width : '20px'}} />
                          </span>
                        ) : null}
                      </>
                     )}
                        </Combobox.Option>
                        ))
                        )}
                        </Combobox.Options>
                    </Transition>
                    </div>
                </Combobox>
  )
}

export default ComboboxComponent