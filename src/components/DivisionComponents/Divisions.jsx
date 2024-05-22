import React from 'react'
import { Outlet } from 'react-router-dom'

const Divisions = () => {
  return (
    <div>
      <h2>Divisions</h2>
      <Outlet />
    </div>
  )
}

export default Divisions