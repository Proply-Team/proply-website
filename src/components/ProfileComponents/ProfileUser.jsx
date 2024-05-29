import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../redux/auth/authSlice';
import { getCurrentUserAction, getUserAction, selectUser, selectedUser } from '../../redux/userSlice';
import { useEffect,useState } from 'react';
import Loading from '../../animation/Loading';

export default function ProfileUser() {
    const{current,isLoading}=useSelector((state)=>state.user)
    const{user} = useSelector(selectAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getCurrentUserAction({email:user.email}))
    },[dispatch]);

    const handleEdit = (currentUser) =>{
        dispatch(selectedUser(currentUser));
        navigate("edit");
    }

    if(isLoading) {
        return <Loading/>;
    }
    if (!current) {
        return <div>Error: Unable to fetch user data</div>;
      }
      
     return (
            
            <div className="card container d-flex flex-row justify-content-around align-items-center rounded-8 shadow-lg  border-0" >
                <div className="d-flex flex-column p-4 w-50">
                <img className="card-img-top img-fluid img-responsive justify-content-end bg-black align-self-center" alt="profile-image" style={{width:200, height:200}} />
                        <button onClick={()=>handleEdit(current)} className="btn btn-info my-4 w-25 align-self-end">
                            Edit
                        </button>
                    </div>
                <div className="card-body p-4 w-50">
                    <h5 className="card-title text-center">{current.fullName}</h5>
                    <h5 className="card-title text-center">{current.email}</h5>
                    <p className="card-text text-center">{current.divisionResponse.name}</p>
                    <p className="card-text text-center">{current.userCredentialResponse.role}</p>
                    <p className="card-text text-center">{current.birthdate}</p>
                    <p className="card-text text-center">{current.gender}</p>
                    <p className="card-text text-center">{current.status}</p>
                </div>
            </div>
   )
}

