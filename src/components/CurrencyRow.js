import React from 'react'

const CurrencyRow = (props) => {

    const { currencyOptions } = props
    return (
        <>
            <div className='flex flex-wrap m-2 rounded-md justify-center'>
                <input type='number' className='border-2 border-gray-800 rounded-md p-2 w-32 text-md font-bold'/>
                <select className='block bg-white hover:border-gray-500 mx-2 px-2 py-2 text-md font-bold rounded shadow leading-tight focus:outline-none focus:shadow-outline'> 
                    {
                        currencyOptions.map((option, index) => (
                            <option key={index} value={option}> {option} </option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}

export default CurrencyRow