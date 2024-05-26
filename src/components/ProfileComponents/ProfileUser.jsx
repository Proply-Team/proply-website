import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectedProfile } from '../../redux/profileSlice'
import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {
    const{profs,isLoading} = useSelector((state)=>state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEdit = (prof) =>{
        dispatch(selectedProfile(prof));
        navigate("edit");
    }

  return (
            <div className="card container d-flex flex-row justify-content-around align-items-center rounded-8 shadow-lg  border-0" >
                <div className="d-flex flex-column p-4 w-50">
                <img className="card-img-top img-fluid img-responsive justify-content-end bg-black align-self-center" alt="profile-image" style={{width:200, height:200}} />
                        <button onClick={()=>handleEdit(profs[0])} className="btn btn-info my-4 w-25 align-self-end">
                            Edit
                        </button>
                    </div>
                <div className="card-body p-4 w-50">
                    <h5 className="card-title text-center">{profs[0].name}</h5>
                    <h5 className="card-title text-center">{profs[0].email}</h5>
                    <p className="card-text text-center">{profs[0].division}</p>
                    <p className="card-text text-center">{profs[0].birthdate}</p>
                    <p className="card-text text-center">{profs[0].gender}</p>
                    <p className="card-text text-center">{profs[0].status}</p>
                </div>
            </div>
  )
}

export default ProfileUser