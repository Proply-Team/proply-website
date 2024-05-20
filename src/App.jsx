import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './redux/authSlice';
import { Routes,Route } from 'react-router-dom';
import Login from './pages/Login.page';
import RequireAuth from './redux/RequireAuth';
import Dashboard from './pages/Dashboard.page';
import Landing from './pages/Landing.page';
import User from './pages/User.page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} >
        <Route path='login' element={<Login />} />
        <Route path='app' element={<RequireAuth />}>
          <Route index element={<Dashboard />} />
          <Route path='user' element={<User />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;





// import { useState } from 'react'
// import './App.css'
// import HeaderComponent from './components/Header.component'
// import FooterComponent from './components/Footer.component'
// import NavbarComponent from './components/Navbar.component'
// import { Outlet } from 'react-router-dom';


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div style={{flex:1}}>
//       <NavbarComponent />
//       <main>
//         <HeaderComponent />
//         <Outlet />
//         <FooterComponent />
//       </main>
//     </div>
//   )
// }

// export default App
