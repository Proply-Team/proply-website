import { useEffect } from "react";
import { IconWriting,IconEraser,IconPlus } from "@tabler/icons-react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedDivision, remove,getDivisionAction } from "../../redux/divisionSlice";

export default function DivisionList() {
    const{divs,div,isLoading} = useSelector((state)=>state.division)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getDivisionAction());
    },[dispatch]);

    // if(isLoading) {
    //     return <Loading/>;
    // }

    const handleSelectedDivision = (division) =>{
        dispatch(selectedDivision(division));
        navigate("form");

    }
        return(
            <div className="d-flex flex-column table-responsive gap-4">
                <div>
                <button onClick={()=>handleSelectedDivision()} className="btn btn-secondary fw-semibold">
                    <IconPlus size={22} className="me-2 pb-1" />
                    Insert New Division
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
                        {divs.map((division,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>{++idx}</td>
                                    <td>{division.name}</td>
                                    <td className="fw-semibold" style={{color:division.isActive?'green':'red'}}>{division.isActive? "Active":"Nonactive"}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <button onClick={()=>{console.log(division); handleSelectedDivision(division)}} className="btn btn-light">
                                                <IconWriting size={22} color="blue" />
                                            </button>
                                            <button onClick={()=>dispatch(remove(division.id))} className="btn btn-light text-white">
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
