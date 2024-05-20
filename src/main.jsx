import React from 'react'
import { RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import router from './routes/router.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store = {store}> */}
      <RouterProvider router={router}/>
      {/* <App /> */}
    {/* </Provider> */}
  </React.StrictMode>,
)
