import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/authSlice";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AuthGuard = () => {
    const {
      isAuthenticated,
    } = useSelector(selectAuth)

    if(isAuthenticated){
      return <Navigate to={"/"}/>
    }else{
      return <Outlet/>
    }
}

export default AuthGuard