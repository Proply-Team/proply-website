import React from 'react'
import HeaderComponent from '../components/Header.component';
import FooterComponent from '../components/Footer.component';
import NavbarComponent from '../components/Navbar.component';
import { Outlet } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  return (
    <div className="d-flex bg-light my-2" style={{minHeight:'100vh'}} >
        <div className='left-component' style={{width:'300px',height:'100vh', position:'fixed'}} >
          <NavbarComponent />
        </div>
      <main className='right-component w-100' style={{marginLeft:320}} >
          <HeaderComponent />
          <div className='m-3'>
          <Outlet />
          </div>
          <FooterComponent />
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