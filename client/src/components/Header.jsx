import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='d-flex flex-column align-items-center'>
        <img src={assets.header_img} alt="" width={250}/>
        <h1>Hey Developers</h1>
        <h2>Welcome to my Web Application</h2>
        <p className='w-50 text-center'>Get started on your journey today and discover the possibilities that await you. Take the first step towards achieving your goals and make your dreams a reality.</p>
        <button  className='btn btn-outline-primary rounded-4 px-4 border border-2'>Get Started</button>
    </div>
  )
}

export default Header