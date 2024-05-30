import { useEffect } from "react";
import { IconWriting,IconEraser,IconPlus } from "@tabler/icons-react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedProcurementCategory, deleteProcurementCategoryAction,getProcurementCategoryAction } from "../../redux/procurementCategorySlice";
import Loading from "../../animation/Loading";

export default function ProcurementCategoryList() {
    const{proCats,isLoading} = useSelector((state)=>state.procurementCategory)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getProcurementCategoryAction());
    },[dispatch]);

    if(isLoading) {
        return <Loading/>;
    }

    const handleSelectedProcurementCategory = (procurementCategory) =>{
        dispatch(selectedProcurementCategory(procurementCategory));
        navigate("form");

    }
        return(
            <div className="d-flex flex-column table-responsive gap-4">
                <div>
                <button onClick={()=>handleSelectedProcurementCategory()} className="btn btn-secondary fw-semibold">
                    <IconPlus size={22} className="me-2 pb-1" />
                    Insert New Procurement Category
                </button></div>
                <table className="table text-center ">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proCats.map((procurementCategory,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>{++idx}</td>
                                    <td>{procurementCategory.name}</td>
                                    <td className="fw-semibold" style={{color:procurementCategory.isActive?'green':'red'}}>{procurementCategory.isActive? "Active":"Nonactive"}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <button onClick={()=>{console.log(procurementCategory); handleSelectedProcurementCategory(procurementCategory)}} className="btn btn-light">
                                                <IconWriting size={22} color="blue" />
                                            </button>
                                            <button onClick={()=>{if (!confirm("Delete this procurement category?")) return;dispatch(deleteProcurementCategoryAction(procurementCategory))}} className="btn btn-light text-white">
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
