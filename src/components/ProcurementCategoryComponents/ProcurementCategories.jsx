import React from 'react'
import { Outlet } from 'react-router-dom'

const ProcurementCategories = () => {
  return (
    <div>
      <h2>Procurement Categories</h2>
      <Outlet />
    </div>
  )
}

export default ProcurementCategories