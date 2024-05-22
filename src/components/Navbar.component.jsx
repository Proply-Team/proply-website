import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../assets/react.svg'
import { IconApps,IconChevronDown,IconHome2,IconSubtask ,IconUsers,IconUser,IconDoorExit,IconCategoryPlus } from "@tabler/icons-react";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";


const NavbarComponent = () => {

  const dispatch=useDispatch();
  const handleLogout = ()=>{
    dispatch(logout())

  }

  return(
    <div className={"d-flex flex-column justify-content-between text-white p-4 shadow"} style={{ backgroundColor:'#4D869C', borderRadius:25, margin:7}}>
        <div className="font-logo text-center mb-5">
            <h2 className="fs-2">
                <i>
                <div className="fw-light">ProPlay</div>
                </i>
            </h2>
            <b>Submission Management</b>
        </div>
        <nav>
            <ul className="d-flex flex-column gap-3 nav-list list-unstyled">
              <Link to='/'>
                <li className="cursor-pointer text-white">
                  <i className="me-3">
                    <IconHome2 />
                  </i>
                <span>Home</span>
                </li>
              </Link>
                <li className="cursor-pointer text-white" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="true">
                    <i className="me-3">
                        <IconApps />
                    </i>
                    <span>Management</span>
                    <i className="ms-3">
                        <IconChevronDown />
                    </i>                            
                </li>
                <div className="collapse" id="dashboard-collapse">
                    <ul className="text-white cursor-pointer d-flex flex-column gap-3 btn-toggle-nav list-unstyled mx-4">
                    <Link to='/register'>
                        <li className="cursor-pointer text-white">
                            <i className="me-3">
                                <IconUsers />
                            </i>
                            <span>User</span>
                        </li>
                    </Link>
                    <Link to='/item-categories'>
                        <li className="cursor-pointer text-white">
                            <i className="me-3">
                                <IconSubtask />
                            </i>
                            <span>Item Category</span>
                        </li>
                    </Link>
                    <Link to='/items'>
                        <li className="cursor-pointer text-white">
                            <i className="me-3">
                                <IconCategoryPlus />
                            </i>
                            <span>Item</span>
                        </li>
                    </Link>
                    </ul>
                </div>
                <p className="fw-bold mt-4">Account</p>
                <Link to='/profile'>
                <li className="cursor-pointer text-white">
                    <i className="me-3">
                        <IconUser />
                    </i>
                    <span>Profile</span>
                </li>
                </Link>
                <Link>
                <li onClick={handleLogout} className="cursor-pointer text-white">
                    <i className="me-3">
                        <IconDoorExit />
                    </i>
                    <span>Logout</span>
                </li>
                </Link>
                <hr />
                <p className="fw-bold mt-4">Settings</p>
                <li  className="cursor-pointer text-white">
                    <i className="me-3">
                        <IconDoorExit />
                    </i>
                    <span>Something</span>
                </li>

            </ul>
        </nav>
        <h2 className="fs-6 my-4 font-primary">
                @EnigmaCamp
        </h2>
    
    </div>
)
}

export default NavbarComponent

// return (
//   <div style={{ display:'flex', height:'90vh',  }}>
//     <Sidebar>
//         <h2>ProPlay</h2>
//       <Menu>
//         <MenuItem icon={logo} component={<Link to="register" />}>Management User</MenuItem>
//         <MenuItem icon={logo} component={<Link to="item-categories" />}>Management Category</MenuItem>
//         <MenuItem icon={logo} component={<Link to="items" />}>Management Item</MenuItem>
//         <MenuItem icon={logo} component={<Link to="divisions" />}>Management Division</MenuItem>
//         <MenuItem icon={logo} component={<Link to="profile" />}>Profile</MenuItem>
//       </Menu>
//         <p>@enigmacamp</p>
//     </Sidebar>
//   </div>
// )
