import React, { useState, useEffect } from 'react'

const Rates = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD')
    const [rates, setRates] = useState([])
    const [countries, setCountries] = useState([])

    useEffect(() => {
        fetch(`https://api.exchangeratesapi.io/latest?base=${selectedCurrency}`)
        .then((response) =>{
            if(response.ok){
              return response
            } else {
              let errorMessage = `${response.status} ${response.statusText}`,
                error = new Error(errorMessage)
                throw (error)
            }
        })
        .then(res => res.json())
        .then(data => {
            setSelectedCurrency(data.base)
            setCountries(Object.keys(data.rates))
            setRates(Object.entries(data.rates))
        })
    },[selectedCurrency])

    const handleCountryChange = (e) => {
        setSelectedCurrency(e.target.value)
    }

    return (
        <>
            <div className='m-2 py-5'>
                <div className='mb-2'> Live Exchange Rates </div>
                    <div className='flex flex-wrap flex-col'>
                        <select onChange={handleCountryChange} value={selectedCurrency} className='mx-auto block bg-white hover:border-gray-500 mx-2 px-2 py-2 text-md font-bold rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
                            {
                                countries.map(country => (
                                    <option value={country}>
                                        {country}
                                    </option>
                                ))
                            }
                        </select>
                    <div className='p-2 m-2'>
                        {rates.map(([key, value]) => (
                            <ul className='p-2'>
                                <li>
                                    {key} {value.toFixed(2)}
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rates