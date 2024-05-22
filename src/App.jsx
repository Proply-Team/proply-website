import { useState } from 'react'
// import './App.css'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Login from './pages/Login.page';
import Dashboard from './pages/Dashboard.page';
import { useEffect } from 'react';


function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  return (
    <>
    {!isAuthenticated?
    <Dashboard />
    :
    <Navigate to='/login' replace /> }
    </>
  )
}

export default App
