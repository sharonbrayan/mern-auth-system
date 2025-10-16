import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate=useNavigate();g
  return (
    <div onClick={()=>navigate('/login')} className='w-100 d-flex justify-content-between px-5'>
        <img src={assets.logo} alt="" />
        <button className='btn btn-outline-primary rounded-4 px-4 border border-2'>Login <img src={assets.arrow_icon} alt="" /></button>
    </div>
  )
}

export default Navbar