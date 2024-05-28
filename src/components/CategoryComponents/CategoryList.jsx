import { useEffect } from "react";
import { IconWriting,IconEraser,IconPlus } from "@tabler/icons-react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedCategory, deleteCategoryAction,getCategoryAction } from "../../redux/categorySlice";

export default function CategoryList() {
    const{cats,cat,isLoading} = useSelector((state)=>state.category)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getCategoryAction());
    },[dispatch]);

    // if(isLoading) {
    //     return <Loading/>;
    // }

    const handleSelectedCategory = (category) =>{
        dispatch(selectedCategory(category));
        navigate("form");

    }
        return(
            <div className="d-flex flex-column table-responsive gap-4">
                <div>
                <button onClick={()=>handleSelectedCategory()} className="btn btn-secondary fw-semibold">
                    <IconPlus size={22} className="me-2 pb-1" />
                    Insert New Category
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
                        {cats.map((category,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>{++idx}</td>
                                    <td>{category.name}</td>
                                    <td className="fw-semibold" style={{color:category.isActive?'green':'red'}}>{category.isActive? "Active":"Nonactive"}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <button onClick={()=>{console.log(category); handleSelectedCategory(category)}} className="btn btn-light">
                                                <IconWriting size={22} color="blue" />
                                            </button>
                                            <button onClick={()=>{if (!confirm("Delete this item category?")) return; dispatch(deleteCategoryAction(category))}} className="btn btn-light text-white">
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
