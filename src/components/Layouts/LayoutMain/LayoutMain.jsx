import { useSelector } from 'react-redux';
import Dashboard from '../../../pages/Dashboard.page';
import { Navigate } from 'react-router-dom';

export default function LayoutMain() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if(isAuthenticated){
        return <Dashboard/>
    }else{
        return <Navigate to={"/auth/login"}/>
    }
}
