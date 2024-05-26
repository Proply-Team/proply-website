import { useEffect } from "react";
import { IconWriting,IconEraser,IconPlus } from "@tabler/icons-react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedProcurement, remove,getProcurementAction } from "../../redux/procurementSlice";
import moment from "moment";

export default function ProcurementList() {
    const{procs,isLoading} = useSelector((state)=>state.procurement)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getProcurementAction());
    },[dispatch]);

    // if(isLoading) {
    //     return <Loading/>;
    // }

    const handleDate = (date) =>{
        return moment(date).format('LL');
    }

    const handleAdd = (procurement) =>{
        dispatch(selectedProcurement(procurement));
        navigate("form");
    }
    const handleSelectedProcurement = (procurement) =>{
        dispatch(selectedProcurement(procurement));
        navigate("id");
    }
        return(
            <div className="d-flex flex-column table-responsive gap-4">
                <div>
                <button onClick={()=>handleAdd()} className="btn btn-secondary fw-semibold">
                    <IconPlus size={22} className="me-2 pb-1" />
                    Request New Procurement
                </button></div>
                <table className="table text-center ">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Procurement Category</th>
                            <th>Requested At</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {procs.map((procurement,idx)=>{
                            return(
                                <tr key={idx} >
                                    <td onClick={()=>handleSelectedProcurement(procurement)}>{++idx}</td>
                                    <td onClick={()=>handleSelectedProcurement(procurement)}>{procurement.procurementCategory}</td>
                                    <td onClick={()=>handleSelectedProcurement(procurement)}>{handleDate(procurement.requestedAt)}</td>
                                    <td onClick={()=>handleSelectedProcurement(procurement)}>Item total: {procurement.items.length}</td>
                                    {/* <td className="fw-semibold" style={{color:procurement.isActive?'green':'red'}}>{procurement.isActive? "Active":"Nonactive"}</td> */}
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            {/* <button onClick={()=>{console.log(procurement); handleSelectedProcurement(procurement)}} className="btn btn-light">
                                                <IconWriting size={22} color="blue" />
                                            </button> */}
                                            <button onClick={()=>dispatch(remove(procurement.id))} className="btn btn-light text-white">
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
