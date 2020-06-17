import React, { useState, useEffect } from 'react'
import './styles/app.css'
import { BsArrowUpDown } from "react-icons/bs";
import CurrencyRow from './components/CurrencyRow'

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'

const App = () => {

  const [currencyOptions, setCurrencyOptions] = useState([])

  useEffect(() => {
    fetch(API_URL)
    .then((response) => {
      if(response.ok){
        return response 
      } else {
        let errorMessage = `${response.status} ${response.statusText}`,
          error = new Error(errorMessage)
          throw(error)
      }
    })
    .then(response => response.json())
    .then(data => {
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
    })
  }, [])

  return (
    <>
      <div className='flex flex-wrap justify-center items-center text-center min-h-screen text-gray-900'>
          <div className='sm:w-auto md:w-1/4 pb-10 m-5 bg-gray-100 font-medium rounded-md'>
            <div className='m-2 py-5'>
              <CurrencyRow 
                currencyOptions={currencyOptions}
              />
               <div className='w-full my-2 py-2'><BsArrowUpDown className='text-3xl m-auto hover:opacity-50'/></div>
              <CurrencyRow 
                currencyOptions={currencyOptions}
              />
            </div>
          </div>
      </div>
    </>
  );
}

export default App;
