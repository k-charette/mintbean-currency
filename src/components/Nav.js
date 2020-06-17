import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className='bg-green-600 w-full py-6 shadow-2xl rounded-t-md'>
            <div className='flex sm:text-md justify-around text-white mx-4'>
                    <Link to='/'><div> Converter </div></Link>
                | 
                    <Link to='/rates'><div> Rates </div></Link>
                
                |
                    <Link to='/'><div> Info </div></Link>
              
            </div>
      </div>
    )
}

export default Nav