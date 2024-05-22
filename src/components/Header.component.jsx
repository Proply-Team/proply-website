import { IconSettings2,IconDoorExit } from "@tabler/icons-react";
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const HeaderComponent = () => {

  const dispatch=useDispatch();
  const handleLogout = ()=>{
    dispatch(logout())
  }

  return(
    <div className="d-flex justify-content-end shadow-sm px-4 py-2 w-100" style={{backgroundColor:'#4D869C', borderRadius:25, margin:7}}>
    <button data-bs-toggle="dropdown" aria-expanded="true" className="btn btn-link" >
        <img className="rounded-circle cursor-pointer" width={32} height={32} src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-372-456324.png" alt="avatar" />
    </button>
    <ul className="dropdown-menu">
        <li className="dropdown-item-text">
            <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">this is name</h6>
                <span>email@email.email</span>
            </div>
        </li>
        <hr />
        <Link to='/profile'>
        <li>
            <button className="dropdown-item" href="#">
                <i className="me-2">
                    <IconSettings2 size={16} />
                </i>
                Edit Profile
            </button>
        </li>
        </Link>
        <li>
            <button onClick={()=>handleLogout} className="dropdown-item" href="#">
                <i className="me-2">
                    <IconDoorExit size={16} />
                </i>
                Logout
            </button>
        </li>
    </ul>
    </div>
)
}

export default HeaderComponent