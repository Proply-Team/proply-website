import {createBrowserRouter} from "react-router-dom";
import App from '../App.jsx'
import Dashboard from "../pages/Dashboard.page.jsx";
import Landing from "../pages/Landing.page.jsx";
import Login from "../pages/Login.page.jsx";
import Register from "../pages/Register.page.jsx";
import User from "../pages/User.page.jsx";
import SubmissionFormComponent from "../components/SubmissionForm.component.jsx";
import SubmissionListComponent from "../components/SubmissionList.component.jsx";


const router = createBrowserRouter([
    {
        path:"/", 
        element:<Landing />, 
    },
    {
        path:"/login", 
        element: <Login />, 
    },
    {
        path:"/register", 
        element: <Register />, 
    },
    {
        path:"/app", 
        element: <App />, 
        children: [
        {
            index:true,
            element: <Dashboard />, 
        },
        {
            path:"form", 
            element: <SubmissionFormComponent />, 
        },
        {
            path:"user", 
            element: <User />, 
        }]
    },
  ]);


  export default router;