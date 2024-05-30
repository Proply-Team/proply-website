import { useEffect } from "react";
import { IconWriting,IconEraser,IconPlus } from "@tabler/icons-react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedItem, remove,getItemAction, deleteItemAction } from "../../redux/itemSlice";
import moment from "moment";
import Loading from "../../animation/Loading";

export default function ItemList() {
    const{itms,itm,isLoading} = useSelector((state)=>state.item)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getItemAction());
    },[dispatch]);

    
    const handleSelectedItem = (item) =>{
        dispatch(selectedItem(item));
        navigate("form");
    }
    
    const handleDate = (date) =>{
        return moment(date).format('LL');
    }
    
    if(isLoading) {
        return <Loading/>;
    }
        return(
            <div className="d-flex flex-column table-responsive gap-4">
                <div>
                <button onClick={()=>handleSelectedItem()} className="btn btn-secondary fw-semibold">
                    <IconPlus size={22} className="me-2 pb-1" />
                    Insert New Item
                </button></div>
                <table className="table text-center ">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Item Category</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itms.map((item,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>{++idx}</td>
                                    <td>{item.name}</td>
                                    <td>{item.itemCategoryResponse.name}</td>
                                    <td>{handleDate(item.updatedAt)}</td>
                                    <td className="fw-semibold" style={{color:item.isActive?'green':'red'}}>{item.isActive? "Active":"Nonactive"}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <button onClick={()=>{console.log(item); handleSelectedItem(item)}} className="btn btn-light">
                                                <IconWriting size={22} color="blue" />
                                            </button>
                                            <button onClick={()=>{if (!confirm("Delete this item?")) return;dispatch(deleteItemAction(item))}} className="btn btn-light text-white">
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
