import React from 'react'
import { useDispatch } from 'react-redux'
import RegisterAdmin from '../components/RegisterComponents/RegisterAdmin'
import RegisterMenu from '../components/RegisterComponents/RegisterMenu';

const Dashboard = () => {
    const dispatch = useDispatch();
  return (
    <div className="container-fluid pt-4 px-4 bg-white bg-opacity-75" style={{height:"100vh", width:"100vw"}}>
    <div>Dashboard</div>
    <RegisterAdmin />
    {/* <RegisterMenu /> */}
    </div>
  )
}

export default Dashboard