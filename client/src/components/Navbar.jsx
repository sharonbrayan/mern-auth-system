import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className='w-100 d-flex justify-content-between px-5'>
        <img src={assets.logo} alt="" />
        <button className='btn btn-outline-primary rounded-4 px-4'>Login <img src={assets.arrow_icon} alt="" /></button>
    </div>
  )
}

export default Navbar