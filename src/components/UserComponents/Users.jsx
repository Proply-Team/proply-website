import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { selectAuth } from '../../redux/auth/authSlice'

const Users = () => {
  return (
    <div className='d-flex flex-column gap-3'>
    <h1>User Management</h1>

    <Outlet />
    </div>
  )
}

export default Users