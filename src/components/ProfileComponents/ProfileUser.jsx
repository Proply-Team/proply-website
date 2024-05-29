import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../redux/auth/authSlice';
import { getCurrentUserAction, selectedUser } from '../../redux/userSlice';
import { useEffect,useState } from 'react';

const ProfileUser = () => {
    const{user} = useSelector(selectAuth)
    const[currentUser, setCurrentUser] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUser = async() =>{
        if(user){
           const current =await dispatch(getCurrentUserAction({email: user.email}))
           console.log(current.payload)
           setCurrentUser(current.payload)
        };
    }

    useEffect(()=>{
        handleUser()
    },[dispatch]);

    const handleEdit = (currentUser) =>{
        dispatch(selectedUser(currentUser));
        navigate("edit");
    }

//   return (
//             <div className="card container d-flex flex-row justify-content-around align-items-center rounded-8 shadow-lg  border-0" >
//                 <div className="d-flex flex-column p-4 w-50">
//                 <img className="card-img-top img-fluid img-responsive justify-content-end bg-black align-self-center" alt="profile-image" style={{width:200, height:200}} />
//                         <button onClick={()=>handleEdit(currentUser)} className="btn btn-info my-4 w-25 align-self-end">
//                             Edit
//                         </button>
//                     </div>
//                 <div className="card-body p-4 w-50">
//                     <h5 className="card-title text-center">{currentUser.fullName}</h5>
//                     <h5 className="card-title text-center">{currentUser.email}</h5>
//                     <p className="card-text text-center">{currentUser.divisionResponse.name}</p>
//                     <p className="card-text text-center">{currentUser.userCredentialResponse.role}</p>
//                     <p className="card-text text-center">{currentUser.birthdate}</p>
//                     <p className="card-text text-center">{currentUser.gender}</p>
//                     <p className="card-text text-center">{currentUser.status}</p>
//                 </div>
//             </div>
//   )
}

export default ProfileUser