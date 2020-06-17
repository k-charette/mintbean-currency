import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './styles/app.css'
import CurrencyRow from './components/CurrencyRow'
import { BsArrowUpDown } from "react-icons/bs";
import Nav from './components/Nav'

const API_URL = 'https://api.exchangeratesapi.io/latest'

const App = () => {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState(0)
  const [amount, setAmount] = useState(1)
  const [amountFromCurrency, setAmountFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountFromCurrency){
    fromAmount = amount
    toAmount = (amount / exchangeRate).toFixed(2)
  } else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(2)
  }

  useEffect(() => {
    fetch(API_URL)
      .then((response) =>{
        if(response.ok){
          return response
        } else {
          let errorMessage = `${response.status} ${response.statusText}`,
            error = new Error(errorMessage)
            throw (error)
        }
      })
      .then(response => response.json())
      .then((data) => {
        const usCurrency = Object.keys(data.rates)[26]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setExchangeRate(data.rates[usCurrency])
        setFromCurrency(usCurrency)
        setToCurrency(data.base)
      })
  },[])

  useEffect(() => {
    if (fromCurrency != null && toCurrency !=null){
      fetch(`${API_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then((response) =>{
        if(response.ok){
          return response
        } else {
          let errorMessage = `${response.status} ${response.statusText}`,
            error = new Error(errorMessage)
            throw (error)
        }
      })
      .then(response => response.json())
      .then(data => {
        setExchangeRate(data.rates[toCurrency].toFixed(2))
      })
    }

  },[fromCurrency, toCurrency])

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountFromCurrency(true)
  }

  const handleToAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountFromCurrency(false)
  }

  const handleSwap = (e) => {
    e.preventDefault()

    setToCurrency(fromCurrency)
    setFromCurrency(toCurrency)

  }

  let currentRate = `${parseFloat(fromAmount).toFixed(2)} ${fromCurrency} = ${parseFloat(toAmount).toFixed(2)} ${toCurrency}`
  return (
    <> 
      <Switch>
        <div className='flex flex-wrap justify-center items-center text-center min-h-screen text-gray-900'>
          <div className='sm:w-auto md:w-1/4 pb-10 m-5 bg-gray-100 font-medium rounded-md'>
            <Nav />
            <div className='m-2 py-5'>
              From
              <CurrencyRow 
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                handleCurrencyChange={e => setFromCurrency(e.target.value)}
                amount={fromAmount}
                onChangeAmount={handleFromAmountChange}
              />
              <div className='w-full my-2 py-2'><BsArrowUpDown onClick={handleSwap} className='text-3xl m-auto hover:opacity-50'/></div>
              To
              <CurrencyRow 
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                handleCurrencyChange={e => setToCurrency(e.target.value)}
                amount={toAmount}
                onChangeAmount={handleToAmountChange}
              />
            </div>
              <p className='text-gray-600 text-md'>
                 {currentRate}
              </p>
          </div>
        </div>
      </Switch>
    </>
  );
}

export default App;
