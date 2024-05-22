import React from 'react'
import { Outlet } from 'react-router-dom'

const Register = () => {
  return (
    <div className='d-flex flex-column'>
    <h2>Register</h2>
    <Outlet />
    </div>
  )
}

export default Register