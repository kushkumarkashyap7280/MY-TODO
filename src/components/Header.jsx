import React from 'react'
import { useState, useEffect } from 'react'
import { FaCheckCircle, FaClock } from 'react-icons/fa'

function Header() {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  return (
    <header>
      <nav className='h-[12vh] flex flex-col bg-gradient-to-r from-blue-500 to-purple-600 justify-center items-center shadow-lg px-4'>
        <div className='flex items-center gap-2 sm:gap-3'>
          <FaCheckCircle className='text-2xl sm:text-4xl text-white' />
          <h1 className='text-2xl sm:text-4xl font-bold text-white'>TODO APP</h1>
        </div>
        <div className='flex items-center gap-2 mt-2'>
          <FaClock className='text-white text-sm sm:text-lg' />
          <h2 className='text-white font-semibold text-xs sm:text-base text-center'>{time.toLocaleString("default", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</h2>
        </div>
      </nav>
    </header>
  )
}

export default Header
