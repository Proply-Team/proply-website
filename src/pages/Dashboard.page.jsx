import React from 'react'
import HeaderComponent from '../components/Header.component';
import FooterComponent from '../components/Footer.component';
import NavbarComponent from '../components/Navbar.component';
import { Outlet } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  return (
    <div className="d-flex bg-light" style={{minHeight:'100vh'}} >
        <div style={{width:'300px',height:'100vh'}} >
          <NavbarComponent />
        </div>
      <main className='d-flex flex-column flex-fill m-2' >
          <HeaderComponent />
        <div className='d-flex flex-column justify-content-between flex-grow-1'>
          <div className='m-3'>
          <Outlet />
          </div>
          <FooterComponent />
        </div>
      </main>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Flip}
        />
    </div>
  )
}

export default Dashboard