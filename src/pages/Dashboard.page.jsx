import React from 'react'
import HeaderComponent from '../components/Header.component';
import FooterComponent from '../components/Footer.component';
import NavbarComponent from '../components/Navbar.component';
import { Outlet } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  return (
    <div className="d-flex flex-column bg-light" style={{minHeight:'100'}} >
      <header className='d-flex' >
        <HeaderComponent />
      </header>
      <main className='d-flex flex-row' >
        <div style={{width:'300px',height:'100vh', overflow:'scroll'}}>
          <NavbarComponent />
        </div>
        <div className='d-flex flex-column justify-content-between p-4 flex-grow-1'>
          <Outlet />
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