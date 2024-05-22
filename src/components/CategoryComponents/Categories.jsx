import React from 'react'
import { Outlet } from 'react-router-dom'

const Categories = () => {
  return (
    <div>
      <h2>Categories</h2>
      <Outlet />
    </div>
  )
}

export default Categories