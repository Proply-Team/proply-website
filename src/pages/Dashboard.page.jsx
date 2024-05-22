import React from 'react'
import HeaderComponent from '../components/Header.component';
import FooterComponent from '../components/Footer.component';
import NavbarComponent from '../components/Navbar.component';
import { Outlet } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className="d-flex flex-column bg-white" style={{minHeight:'100'}} >
      <header className='d-flex' >
        <HeaderComponent />
      </header>
      <main className='d-flex' >
        <div style={{width:'300px'}}>
          <NavbarComponent />
        </div>
        <div className='d-flex flex-column flex-grow-1'>
          <div className='d-flex flex-grow-1'>
          <Outlet />
          </div>
          <FooterComponent />
        </div>
      </main>
    </div>
  )
}

export default Dashboard