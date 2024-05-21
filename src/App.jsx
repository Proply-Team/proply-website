import { useState } from 'react'
// import './App.css'
import { useSelector } from 'react-redux';
import Login from './pages/Login.page';
import Dashboard from './pages/Dashboard.page';


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
    {isAuthenticated?
    <Dashboard />
    :
    <Login /> }
    </>
  )
}

export default App
