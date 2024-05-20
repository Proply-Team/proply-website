import { useState } from 'react'
import './App.css'
import HeaderComponent from './components/Header.component'
import FooterComponent from './components/Footer.component'
import NavbarComponent from './components/Navbar.component'
import { Outlet } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{flex:1}}>
      <NavbarComponent />
      <main>
        <HeaderComponent />
        <Outlet />
        <FooterComponent />
      </main>
    </div>
  )
}

export default App
