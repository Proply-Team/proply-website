import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../assets/react.svg'
import { IconChevronDown,IconHome2,IconSubtask,IconUsersGroup,IconReplace,IconHomeCog,IconUsers,IconUser,IconDoorExit,IconCategoryPlus } from "@tabler/icons-react";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch } from "react-redux";
import { logout, selectAuth } from "../redux/auth/authSlice";
import { useSelector } from 'react-redux';


const NavbarComponent = () => {
    const {
        role
    } = useSelector(selectAuth)

  const dispatch=useDispatch();
  const handleLogout = ()=>{
    dispatch(logout())

  }

  return(
    <div className={"d-flex flex-column justify-content-between text-white rounded-end-5 py-4 ps-4 pe-2 h-100 "} style={{ backgroundColor:'#4D869C'}}>
        <div className="font-logo text-center mb-5">
            <h2 className="fs-2">
                <i>
                <div className="fw-light">ProPlay</div>
                </i>
            </h2>
            <b>Submission Management</b>
        </div>
        <nav className='overflow-auto'>
            <ul className="d-flex flex-column gap-3 nav-list list-unstyled">
              <Link to='/'>
                <li className="cursor-pointer text-white">
                  <i className="me-3">
                    <IconHome2 />
                  </i>
                <span>Home</span>
                </li>
              </Link>
                <li className="cursor-pointer text-white" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse-1" aria-expanded="true">
                    <i className="me-3">
                        <IconHomeCog />
                    </i>
                    <span>Management</span>
                    <i className="ms-3">
                        <IconChevronDown />
                    </i>                            
                </li>
                <div className="collapse" id="dashboard-collapse-1">
                    <ul className="text-white cursor-pointer d-flex flex-column gap-3 btn-toggle-nav list-unstyled mx-4">
                        {role == "admin" && (
                            <Link to='/register'>
                                <li className="cursor-pointer text-white">
                                    <i className="me-3">
                                        <IconUsers />
                                    </i>
                                    <span>User</span>
                                </li>
                            </Link>
                        )}
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
                    <Link to='/divisions'>
                        <li className="cursor-pointer text-white">
                            <i className="me-3">
                                <IconUsersGroup />
                            </i>
                            <span>Division</span>
                        </li>
                    </Link>
                    <Link to='/procurement-categories'>
                        <li className="cursor-pointer text-white">
                            <i className="me-3">
                                <IconSubtask />
                            </i>
                            <span>Procurement Category</span>
                        </li>
                    </Link>
                    </ul>
                </div>
                <li className="cursor-pointer text-white" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse-2" aria-expanded="true">
                    <i className="me-3">
                        <IconHomeCog />
                    </i>
                    <span>Submission</span>
                    <i className="ms-3">
                        <IconChevronDown />
                    </i>                            
                </li>
                <div className="collapse" id="dashboard-collapse-2">
                    <ul className="text-white cursor-pointer d-flex flex-column gap-3 btn-toggle-nav list-unstyled mx-4">
                    <Link to='/procurements'>
                        <li className="cursor-pointer text-white">
                            <i className="me-3">
                                <IconUsers />
                            </i>
                            <span>Procurements</span>
                        </li>
                    </Link>
                    <Link to='/items'>
                        <li className="cursor-pointer text-white">
                            <i className="me-3">
                                <IconCategoryPlus />
                            </i>
                            <span>History</span>
                        </li>
                    </Link>
                    <Link to='/divisions'>
                        <li className="cursor-pointer text-white">
                            <i className="me-3">
                                <IconUsersGroup />
                            </i>
                            <span>What?</span>
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
