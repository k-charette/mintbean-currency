import React, { useState, useEffect } from 'react'
import './styles/app.css'
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
    <div className='text-red-500'>
      <CurrencyRow 
        currencyOptions={currencyOptions}
      />

      <CurrencyRow 
        currencyOptions={currencyOptions}
      />
    </div>
  );
}

export default App;
