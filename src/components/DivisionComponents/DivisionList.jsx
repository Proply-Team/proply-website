import { useEffect } from "react";
import { IconEdit,IconTrash,IconPlus } from "@tabler/icons-react";
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
            <div className="table-responsive">
                <button onClick={()=>handleSelectedDivision()} className="btn btn-success m-4">
                    <IconPlus size={22}/>
                    Insert New Division
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{color:"#bccbd2"}}>No</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {divs.map((division,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td style={{color:"#bccbd2"}}>{++idx}</td>
                                    <td>{division.name}</td>
                                    <td style={{color:division.isActive?'green':'red'}}>{division.isActive? "Active":"Nonactive"}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button onClick={()=>{console.log(division); handleSelectedDivision(division)}} className="btn btn-success">
                                                <IconEdit size={22}/>
                                            </button>
                                            <button onClick={()=>dispatch(remove(division.id))} className="btn btn-danger text-white">
                                                <IconTrash size={22}/>
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
