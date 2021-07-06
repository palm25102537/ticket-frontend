import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Sign from '../component/Sign'
import axios from '../config/axios'


function Hompage() {
  const [studentClass, setStudentClass] = useState()
  async function getClass() {
    const response = await axios.get('/class')
    const { data: { classes } } = response
    setStudentClass(classes)
  }
  useEffect(() => {
    getClass()
  }, [])
  return (
    <div>
      <Header />
      <div className='homepage-content-box'>
        <Sign sign={'Sign In'} />
        <Sign sign={'Sign up'} classes={studentClass} />
      </div>
    </div>


  )
}

export default Hompage
