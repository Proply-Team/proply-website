import React from 'react'
import { Outlet } from 'react-router-dom'

const Profile = () => {

  
  return (
    <div>
      <h2>Profile</h2>
      <Outlet />
    </div>
  )
}

export default Profile