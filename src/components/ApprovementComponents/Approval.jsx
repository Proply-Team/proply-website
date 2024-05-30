import { useEffect } from "react";
import { IconWriting,IconEraser,IconX } from "@tabler/icons-react";
import { useSelector,useDispatch } from "react-redux";
import { putRejectAction, remove,getProcurementAction, putApprovalAction } from "../../redux/procurementSlice";
import { Link } from "react-router-dom";
import Loading from "../../animation/Loading"


export default function Approval({}) {
    const{user} = useSelector((state) => state.auth)
    const{proc,isLoading} = useSelector((state)=>state.procurement)
    const dispatch = useDispatch();
    console.log(proc);
    useEffect(()=>{
        dispatch(getProcurementAction());
    },[dispatch]);

    const formatDate = new Date(proc.createdAt);
    const date = formatDate.toLocaleDateString(); 

    const handleApprove = async() =>{
        if(!confirm("Approve this procurement?"))return;
        await dispatch(putApprovalAction({procurementId:proc.procurementId}))
    }

    const handleReject = async() =>{
        if(!confirm("Reject this procurement?"))return;
        await dispatch(putRejectAction({procurementId:proc.procurementId}))
    }


    if(isLoading) {
        return <Loading/>;
    }

        return(
            <div className="d-flex flex-column gap-4 m-4">
                <Link to='/approvements'>
                <button className="btn btn-info fw-semibold">
                    <IconX size={22} className="me-2 pb-1" />
                    Back
                </button>
                </Link>
                    <h4>Procurement Details</h4>
                <div className="d-flex flex-column">
                    <p>Procurement ID: <b>{proc.procurementId}</b></p>
                    <p>Procurement Category: <b>{proc.procurementCategoryResponse.name}</b></p>
                    <p>Requested At: <b>{date}</b></p>
                    <p>Requested By: <b>{proc.userResponse.fullName}</b></p>
                    <p>Division: <b>{proc.userResponse.divisionResponse.name}</b></p>
                    <p>Items:</p>
                </div>
            <div className="d-flex flex-column table-responsive gap-4">
                                <table className="table text-center ">
                                    <thead>
                                        <tr>
                                            <td>No</td>
                                            <td>Item</td>
                                            <td>Item Category</td>
                                            <td>Quantity</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {proc.procurementDetailResponses.map((procurementDetail,idx)=>{
                                            return(
                                                <tr key={idx}>
                                                    <td>{++idx}</td>
                                                    <td className="fw-semibold">{procurementDetail.itemResponse.name}</td>
                                                    <td>{procurementDetail.itemResponse.itemCategoryResponse.name}</td>
                                                    <td>{procurementDetail.quantity}</td>
                                                    {/* <td>
                                                        <button type="button" onClick={()=>handleRemove(procurementDetail.id)} className="btn btn-light text-white">
                                                            <IconMinus size={22} color="red"/>
                                                        </button>
                                                    </td> */}
                                                </tr>
                                            )
                                    })}
                                    </tbody>
                                </table>
            </div>
            <div className="d-flex flex-column table-responsive gap-4">
                                <table className="table text-center ">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Approval Requires</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {proc.approvalResponses.map((approvalDetail,idx)=>{
                                            return(
                                                <tr key={idx}>
                                                    <td>{++idx}</td>
                                                    <td className="fw-semibold">{approvalDetail.userResponse.fullName}</td>
                                                    <td>{
                                                        approvalDetail.userResponse.fullName==user.fullName?
                                                        <div className="d-flex gap-2" >
                                                        <button type="button" onClick={handleApprove} className="btn btn-success text-white">
                                                            APPROVE
                                                        </button>
                                                        <button type="button" onClick={handleReject} className="btn btn-danger text-white">
                                                            REJECT
                                                        </button>
                                                        </div>
                                                        :
                                                        <span className={`badge ${
                                                            approvalDetail.status == "REJECTED" ? "bg-danger" :
                                                            approvalDetail.status == "PENDING" ? "bg-primary" :
                                                            approvalDetail.status == "APPROVED" ? "bg-success" : "bg-secondary"
                                                        } text-white`}>
                                                            {approvalDetail.status}
                                                        </span>}
                                                    </td>
                                                    {/* <td>
                                                        <button type="button" onClick={()=>handleRemove(procurementDetail.id)} className="btn btn-light text-white">
                                                            <IconMinus size={22} color="red"/>
                                                        </button>
                                                    </td> */}
                                                </tr>
                                            )
                                    })}
                                    </tbody>
                                </table>
            </div>
            </div>

        )
}
