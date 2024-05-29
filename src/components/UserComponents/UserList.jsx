import { useEffect } from "react";
import { IconWriting,IconEraser,IconPlus } from "@tabler/icons-react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedUser,getUserAction, deleteUserAction } from "../../redux/userSlice";
import moment from "moment";

export default function UserList() {
    const{usrs,isLoading} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getUserAction());
    },[dispatch]);

    // if(isLoading) {
    //     return <Loading/>;
    // }

    const handleDate = (date) =>{
        return moment(date).format('LL');
    }

    const handleAdd = (user) =>{
        dispatch(selectedUser(user));
        navigate("register");
    }
    const handleSelectedUser = (user) =>{
        dispatch(selectedUser(user));
        navigate("id");
    }
        return(
            <div className="d-flex flex-column table-responsive gap-4">
                <div>
                <button onClick={()=>handleAdd()} className="btn btn-secondary fw-semibold">
                    <IconPlus size={22} className="me-2 pb-1" />
                    Register New User
                </button></div>
                <table className="table text-center ">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Division</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usrs.map((user,idx)=>{
                            return(
                                <tr key={idx} >
                                    <td onClick={()=>handleSelectedUser(user)}>{++idx}</td>
                                    <td onClick={()=>handleSelectedUser(user)}>{user.fullName}</td>
                                    <td onClick={()=>handleSelectedUser(user)}>{user.divisionResponse.name}</td>
                                    <td onClick={()=>handleSelectedUser(user)}>{user.userCredentialResponse.role}</td>
                                    <td className="fw-semibold" style={{color:user.isActive?'green':'red'}}>{user.isActive? "Active":"Nonactive"}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <button onClick={()=>{if (!confirm("Delete this user?")) return;dispatch(deleteUserAction(user))}} className="btn btn-light text-white">
                                                <IconEraser size={22} color="red"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                    })}
                    </tbody>
                </table>
            </div>

        )
}
