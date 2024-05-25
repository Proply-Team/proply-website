import { useEffect } from "react";
import { IconWriting,IconEraser,IconX } from "@tabler/icons-react";
import { useSelector,useDispatch } from "react-redux";
import { selectedProcurement, remove,getProcurementAction } from "../../redux/procurementSlice";
import { Link } from "react-router-dom";

export default function ProcurementDetail({}) {
    const{proc,isLoading} = useSelector((state)=>state.procurement)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getProcurementAction());
    },[dispatch]);

    const formatDate = new Date(proc.requestedAt);
    const date = formatDate.toLocaleDateString(); 

    // if(isLoading) {
    //     return <Loading/>;
    // }

        return(
            <div className="d-flex flex-column gap-4 m-4">
                <Link to='/procurements'>
                <button className="btn btn-info fw-semibold">
                    <IconX size={22} className="me-2 pb-1" />
                    Back
                </button>
                </Link>
                    <h4>Procurement Details</h4>
                <div className="d-flex flex-column">
                    <p>Procurement ID: <b>{proc.id}</b></p>
                    <p>Procurement Category: <b>{proc.procurementCategory}</b></p>
                    <p>Requested At: <b>{date}</b></p>
                    <p>Requested By: <b>{proc.user}</b></p>
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
                                        {proc.items.map((procurementDetail,idx)=>{
                                            return(
                                                <tr key={idx}>
                                                    <td>{++idx}</td>
                                                    <td className="fw-semibold">{procurementDetail.item}</td>
                                                    <td>{procurementDetail.itemCategory}</td>
                                                    <td>{procurementDetail.qty}</td>
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
