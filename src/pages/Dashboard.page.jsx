import React from 'react'
import HeaderComponent from '../components/Header.component';
import FooterComponent from '../components/Footer.component';
import NavbarComponent from '../components/Navbar.component';
import { Outlet } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className="d-flex flex-column bg-light" style={{minHeight:'100'}} >
      <header className='d-flex' >
        <HeaderComponent />
      </header>
      <main className='d-flex flex-row' >
        <div style={{width:'300px'}}>
          <NavbarComponent />
        </div>
        <div className='d-flex flex-column justify-content-between p-4 flex-grow-1'>
          <Outlet />
          <FooterComponent />
        </div>
      </main>
    </div>
  )
}

export default Dashboard