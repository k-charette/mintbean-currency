import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './styles/app.css'
import Nav from './components/Nav'
import Converter from './components/Converter'
import Rates from './components/Rates'
import Info from './components/Info'

const App = () => {

  return (
    <> 
      <Switch>
        <div className='flex flex-wrap justify-center items-center text-center min-h-screen text-gray-900'>
          <div className='block sm:w-auto md:w-1/4 pb-10 m-5 bg-gray-100 font-medium rounded-md'>
            <Nav />
            <Route exact path='/' component={Converter}/>
            <Route path='/rates' component={Rates}/>
            <Route path='/info' component={Info}/>
          </div>
        </div>
      </Switch>
    </>
  );
}

export default App;
