import React from 'react'
import { Outlet } from 'react-router-dom'

const Items = () => {
  return (
    <div>
      <h2>Items</h2>
      <Outlet />
    </div>
  )
}

export default Items