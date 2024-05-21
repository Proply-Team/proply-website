import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import RegisterComponent from '../components/Register.component'

const Dashboard = () => {
    const dispatch = useDispatch();
  return (
    <div className="container-fluid pt-4 px-4 bg-white bg-opacity-75" style={{height:"100vh", width:"100vw"}}>
    <div>Dashboard</div>
    <RegisterComponent />
    {/* <button onClick={()=>dispatch(logout())}></button> */}
    </div>
  )
}

export default Dashboard