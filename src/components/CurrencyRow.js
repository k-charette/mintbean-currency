import React from 'react'

const CurrencyRow = (props) => {

    const { currencyOptions } = props
    return (
        <div>
            <input type='number'/>
            <select> 
                {
                    currencyOptions.map((option, index) => (
                        <option key={index} value={option}> {option} </option>
                    ))
                }
            </select>
        </div>
    )
}

export default CurrencyRow