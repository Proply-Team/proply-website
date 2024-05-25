import { useEffect } from "react";
import { IconMinus } from "@tabler/icons-react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { remove,getProcurementDetailAction } from "../../../redux/procurementDetailSlice";

export default function ProcurementDetailList(itemList,{setList}) {
    console.log(itemList);
    const{procDets,isLoading} = useSelector((state)=>state.procurementDetail)

    const dispatch = useDispatch();
    
    // useEffect(()=>{
    // },[itemList]);


    const handleRemove=(id)=>{
        console.log(id);
        console.log(itemList);
        setList(itemList.filter(procDet => procDet.id !== id));
    }

    // if(isLoading) {
    //     return <Loading/>;
    // }

        return(
            <div className="d-flex flex-column table-responsive gap-4">
                <table className="table text-center ">
                    <tbody>
                        {itemList.map((procurementDetail,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>
                                        <p >{++idx}. {procurementDetail.item}</p>
                                        <p>Category: {procurementDetail.itemCategory}</p>
                                        <p>Quantity: {procurementDetail.qty}</p>
                                    </td>
                                    <td>
                                        <button onClick={()=>handleRemove(procurementDetail.id)} className="btn btn-light text-white">
                                            <IconMinus size={22} color="red"/>
                                        </button>
                                    </td>
                                </tr>
                            )
                    })}
                    </tbody>
                </table>
            </div>

        )
}
