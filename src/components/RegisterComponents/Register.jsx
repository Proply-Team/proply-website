import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [label,setLabel] = useState("Choose Role to be Registered");
  const navigate = useNavigate();

  const handleOption = (role,name)=> {
    setLabel(name);
    navigate(role)
  }

  return (
    <div className='d-flex flex-column gap-3'>
    <h1>User Registration</h1>
    <div className="dropdown">
      <button className="btn btn-info dropdown-toggle px-4 fw-semibold" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {label}
      </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
      <a className="dropdown-item" onClick={()=>handleOption("admin","Admin")}>Admin</a>
      <a className="dropdown-item" onClick={()=>handleOption("manager","Manager")}>Manager</a>
      <a className="dropdown-item" onClick={()=>handleOption("employee","Employee")}>Employee</a>
    </div>
  </div>

    <Outlet />
    </div>
  )
}

export default Register