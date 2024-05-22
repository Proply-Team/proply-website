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
        <div className='d-flex flex-column w-100 h-100 justify-content-between'>
          <Outlet />
          <FooterComponent />
        </div>
      </main>
    </div>
  )
}

export default Dashboard