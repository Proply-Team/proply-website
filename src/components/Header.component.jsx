import { IconBellRinging,IconFileInfo,IconSettings2,IconDoorExit } from "@tabler/icons-react";
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

const HeaderComponent = () => {

  const dispatch=useDispatch();
  const handleLogout = ()=>{
    dispatch(logout())
  }

  return(
    <header className="d-flex justify-content-between align-items-center shadow-sm px-4 py-2 w-100 sticky-top bg-primary rounded-4" >
    <div>
        Logo
    </div>
    <div className="d-flex align-items-center gap-3" >
        <div>
            <button data-bs-toggle="dropdown" id="dropdown-notification" aria-expanded="true" className="btn btn-link" >
               <IconBellRinging color="white" size={26}/>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdown-notification">
                <li className="dropdown-item-text">
                    <p>notif 2:</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                </li>
                <hr />
                <li className="dropdown-item-text">
                    <p>notif 1:</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                </li>
            </ul>
        </div>
        <div>
            <button data-bs-toggle="dropdown" id="dropdown-info" aria-expanded="true" className="btn btn-link" >
               <IconFileInfo color="white" size={26}/>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdown-info">
                <li className="dropdown-item-text">
                    <p>manual document</p>
                </li>
                <li className="dropdown-item-text">
                    <p>call center(?)</p>
                </li>
            </ul>
        </div>
        <div>
            <button data-bs-toggle="dropdown" id="dropdown-profile" aria-expanded="true" className="btn btn-link" >
                <img className="rounded-circle cursor-pointer" width={32} height={32} src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-372-456324.png" alt="avatar" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdown-profile">
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
    </div>
    </header>
)
}

export default HeaderComponent