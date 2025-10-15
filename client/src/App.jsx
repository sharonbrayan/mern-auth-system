import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Verifyemail from './pages/verifyemail'
import Resetpass from './pages/resetpass'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/email-verify' element={<Verifyemail/>}/>
            <Route path='/reset-password' element={<Resetpass/>}/>
        </Routes>
    </div>
  )
}

export default App