import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../contexts/appConetxt'

const Header = () => {
  const {userData}=useContext(AppContext);
  console.log(userData);
  return (
    <div className='d-flex flex-column align-items-center'>
        <img src={assets.header_img} alt="" width={250}/>
        <h1>Hey {userData?userData.name:"Developer"}</h1>
        <h2>Welcome to my Web Application</h2>
        <p className='w-50 text-center'>Get started on your journey today and discover the possibilities that await you. Take the first step towards achieving your goals and make your dreams a reality.</p>
        <button  className='btn btn-outline-primary rounded-4 px-4 border border-2'>Get Started</button>
    </div>
  )
}

export default Header