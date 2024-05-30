import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../redux/auth/authSlice';
import { getCurrentUserAction, getUserAction, postUserPhotoAction, selectUser, selectedUser } from '../../redux/userSlice';
import { useEffect,useState } from 'react';
import Loading from '../../animation/Loading';
import { toast } from 'react-toastify';

export default function ProfileUser() {
    const{current,isLoading}=useSelector((state)=>state.user)
    const{user} = useSelector(selectAuth)
    const[editPhoto, setEditPhoto] = useState(false)
    const[userPhoto,setUserPhoto] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getCurrentUserAction({email:user.email}))
    },[dispatch]);

    const handleEdit = (currentUser) =>{
        dispatch(selectedUser(currentUser));
        navigate("edit");
    }

    const handlePhoto = async () =>{
        console.log(userPhoto);
        if(userPhoto!=null) {
            const data = new FormData();
            data.append("id", current.userId);
            data.append("image", userPhoto);
            await dispatch(postUserPhotoAction(data));
            setUserPhoto(null)
            setEditPhoto(false)
        }
        else {
            toast.error("Choose image first")
        }
    }

    if(isLoading) {
        return <Loading/>;
    }
    if (!current) {
        return <div>Error: Unable to fetch user data</div>;
      }
      
     return (
            
            <div className="card container d-flex flex-row justify-content-around align-items-center rounded-8 shadow-lg w-75 border-0" >
                <div className="d-flex flex-column p-4 w-50">
                    <img src={current.profileImageUrl} className="card-img-top img-fluid img-responsive justify-content-end bg-black align-self-center" alt="profile-image" style={{width:200, height:200}} />
                        {editPhoto?
                        <div className='d-flex align-items-center justify-content-center'>
                            <input type="file" name='photo' onChange={(event)=>{setUserPhoto(event.target.files[0])}} />
                            <button onClick={handlePhoto} className="btn btn-info my-4 w-25 align-self-end">
                                Upload
                            </button>
                            <button onClick={()=>setEditPhoto(false)}  className="btn btn-info my-4 w-25 align-self-end">
                                Cancel
                            </button>
                        </div>
                        :
                        <button onClick={()=>setEditPhoto(true)} className="btn btn-info my-4 w-25 align-self-end">
                            Edit
                        </button>}
                </div>
                <div className="d-flex flex-column card-body p-4 w-50 align-self-end">
                    <div>
                    <h5 className="card-title text-center">{current.fullName}</h5>
                    <h5 className="card-title text-center">{current.email}</h5>
                    <p className="card-text text-center">{current.divisionResponse.name}</p>
                    <p className="card-text text-center">{current.userCredentialResponse.role}</p>
                    <p className="card-text text-center">{current.birthdate}</p>
                    <p className="card-text text-center">{current.gender}</p>
                    <p className="card-text text-center">{current.status}</p>
                    </div>
                    <button onClick={()=>handleEdit(current)} className="btn btn-info my-4 align-self-end">
                            Edit Data
                        </button>
                </div>
            </div>
   )
}

