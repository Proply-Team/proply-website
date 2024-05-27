import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function App() {
  const token = localStorage.getItem('token');
  return (
    <div className='App'>
      <Outlet/>
    </div>
  )
}

export default App
