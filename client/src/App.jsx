import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Verifyemail from './pages/Verifyemail'
import Resetpass from './pages/Resetpass'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer/>
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