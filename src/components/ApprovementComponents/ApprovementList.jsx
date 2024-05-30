import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProcurementAction } from "../../redux/procurementSlice";
import moment from "moment";
import { getCurrentUserAction } from "../../redux/userSlice";
import Loading from "../../animation/Loading";

export default function ApprovementList() {
    const{procs,isLoading} = useSelector((state)=>state.procurement)
    const {
        user
    } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(procs);
    const fetchData = async () => {
        const {payload} = await dispatch(getCurrentUserAction({email:user.email}))
        console.log(payload);
        if(payload?.userCredentialResponse.role != "ROLE_ADMIN"){
            await dispatch(getProcurementAction(payload.userId));
        }else{
            await dispatch(getProcurementAction())
        }
    }
    
    useEffect(()=>{
        fetchData()
    },[]);

    const statusApproval = (data) => {
        let status = data.map(val => val.status)
        if(status.some(val => val == "REJECTED")) return "REJECTED"
        if(status.every(val => val == "APPROVED")) return "APPROVED"
        if(status.some(val => val == "PENDING") && status.some(val => val != "REJECTED")) return "PENDING"
        else if(status.every(val => val == "CANCELED")) return "CANCELED"
    }


    const handleDate = (date) =>{
        return moment(date).format('LL');
    }
    
    const handleSelectedProcurement = (procurement) =>{
        navigate(`/procurements/${procurement.procurementId}`);
    }

    if(isLoading) {
        return <Loading/>;
    }

        return(
            <div className="d-flex flex-column table-responsive gap-4">
                <table className="table text-center ">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Procurement Category</th>
                            <th>Requested At</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {procs.length ==  0 ?
                        <tr>
                            <td colSpan={5} className="text-center">Procurement not found</td>
                        </tr>
                         : 
                        (procs.filter(procurement=>statusApproval(procurement.approvalResponses)=="PENDING"&&procurement.approvalResponses.some(res=>res.userResponse.fullName==user.fullName))).map((procurement,idx)=>{
                            return(
                                <tr key={idx} onClick={()=>handleSelectedProcurement(procurement)} >
                                    <td>{++idx}</td>
                                    <td>{procurement.procurementCategoryResponse.name}</td>
                                    <td>{handleDate(procurement.createdAt)}</td>
                                    <td>
                                        <span className={`badge ${
                                            statusApproval(procurement.approvalResponses) == "REJECTED" ? "bg-danger" :
                                            statusApproval(procurement.approvalResponses) == "PENDING" ? "bg-primary" :
                                            statusApproval(procurement.approvalResponses) == "APPROVED" ? "bg-success" : "bg-secondary"
                                        } text-white`}>
                                            {statusApproval(procurement.approvalResponses)}
                                        </span>
                                    </td>
                                </tr>
                            )
                    })}
                    </tbody>
                </table>
            </div>

        )
}
