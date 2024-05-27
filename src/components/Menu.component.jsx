import { useSelector } from "react-redux";
import management from "../assets/icons/database-management.png"
import submission from "../assets/icons/budgeting.png"
import profile from "../assets/icons/project-manager.png"
import company from "../assets/icons/new-company.png"
import document from "../assets/icons/sign-document.png"
import manager from "../assets/icons/management.png"
import { useState } from "react";
import { selectAuth } from "../redux/auth/authSlice";
import { Link } from "react-router-dom";

const MenuComponent = () => {
  const {user} = useSelector(selectAuth)
  const [isShowing, setIsShowing] = useState([false,false,false])

  return (
    <>
    <div className="container shadow-sm mb-4 p-4 rounded-2 align-items-center">
    <div className="row row-cols-lg-4 row-cols-1-1 g-4 justify-content-around">
    {(user.role == "ROLE_ADMIN"||user.role == "ROLE_MANAGER") && (
        <div className="col" onClick={()=>setIsShowing([true,false,false])}>
            <div style={{width:200, height:200}} className="card shadow-sm rounded-circle align-items-center ">
                <img src={management} alt="management-image" className="w-50 m-3  " />
                <h5 className="text-center">Management</h5>
            </div>
        </div>
    )}
        <div className="col" onClick={()=>setIsShowing([false,true,false])}>
            <div style={{width:200, height:200}} className="card shadow-sm rounded-circle align-items-center ">
                <img src={submission} alt="submission-image" className="w-50 m-3 " />
                <h5 className="text-center">Submission</h5>
            </div>
        </div>
        <div className="col" onClick={()=>setIsShowing([false,false,true])}>
            <div style={{width:200, height:200}} className="card shadow-sm rounded-circle align-items-center ">
                <img src={profile} alt="profile-image" className="w-50 m-3 " />
                <h5 className="text-center">User Profile</h5>
            </div>
        </div>
    </div>
 </div>
 {isShowing[0]&&
  <div className="d-flex flex-wrap gap-4 justify-content-around">
    <Link to='register'>
        <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
          <img src={company} alt="company-image" style={{width:50}} />
          <h6 className="text-center">Register User</h6>
        </div>
    </Link>
    <Link to='item-categories'>
        <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
          <img src={company} alt="company-image" style={{width:50}} />
          <h6 className="text-center">Item Category</h6>
        </div>
    </Link>
    <Link to='items'>
        <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
          <img src={company} alt="company-image" style={{width:50}} />
          <h6 className="text-center">Item</h6>
        </div>
    </Link>
    <Link to='procurement-categories'>
        <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
          <img src={company} alt="company-image" style={{width:50}} />
          <h6 className="text-center">Procurement Category</h6>
        </div>
    </Link>
    <Link to='divisions'>
        <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
          <img src={company} alt="company-image" style={{width:50}} />
          <h6 className="text-center">Division</h6>
        </div>
    </Link>
 </div>}
 {isShowing[1]&& 
 <div className="d-flex flex-wrap gap-4 justify-content-around">
    <Link to='procurements'>
        <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
          <img src={document} alt="document-image" style={{width:50}} />
          <h6 className="text-center">Procurement Form</h6>
        </div>
    </Link>
    <Link to='history'>
        <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
          <img src={document} alt="document-image" style={{width:50}} />
          <h6 className="text-center">History</h6>
        </div>
    </Link>
    {(user.role=='ROLE_ADMIN'||user.role=='ROLE_MANAGER')&&(
      <Link to='approvement'>
          <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
            <img src={document} alt="document-image" style={{width:50}} />
            <h6 className="text-center">Approvement</h6>
          </div>
      </Link>  
    )}
 </div>}
 {isShowing[2]&& 
 <div className="d-flex flex-wrap gap-4 justify-content-around">
     <Link to='profile'>
       <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
          <img src={manager} alt="user-image" style={{width:50}} />
          <h6 className="text-center">User Profile</h6>
        </div>
    </Link>
        <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
          <img src={manager} alt="user-image" style={{width:50}} />
          <h6 className="text-center">Setting</h6>
        </div>
        <div className="element list-item bg-white d-flex flex-row gap-3 py-2 px-4 shadow-sm rounded-5 align-items-center justify-content-center ">
          <img src={manager} alt="user-image" style={{width:50}} />
          <h6 className="text-center">what</h6>
        </div>
 </div>}
</>)
}

export default MenuComponent