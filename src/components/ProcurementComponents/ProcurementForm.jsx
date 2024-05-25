import { IconDeviceFloppy, IconPlus,IconMinus } from "@tabler/icons-react";
import { add, update } from "../../redux/procurementSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import ProcurementDetailForm from "./ProcurementDetailComponents/ProcurementDetailForm";
import ProcurementDetailList from "./ProcurementDetailComponents/ProcurementDetailList";



const schema =z.object({
    id: z.string().nullable(),
})

export default function ProcurementForm() {
    const {proc} = useSelector((state)=>state.procurement)
    const [label,setLabel] = useState("Select Procurement Category");
    const [label2,setLabel2] = useState("Select Item Category");
    const [error, setError] = useState("Can not be blank")
    const [detail,setDetail] =useState({item:"",qty:""})
    const dispatch = useDispatch();
    const [itemList,setItemList] = useState([]) 
    
    const {
        handleSubmit,
        reset,
        formState: {errors},
    }=useForm({
        defaultValues:{
          id: "",
          procurementCategory:"",
          items: [],
          requestedAt: "",
          user:""
        },
        resolver:zodResolver(schema),
        
    });

    useEffect(()=>{
    },[itemList]);
    

    const onSubmit = (data) => {
        // if (data.id&&data.id!="") {  
        //   const proc = {...data};
        //   dispatch(update(proc));      
        // }else {
            const proc ={
                ...data,
                id: new Date().getMilliseconds().toString(),
                user:"this user",
                procurementCategory: label,
                requestedAt: Date.now(),
                items: itemList
            };
            console.log(proc);
            dispatch(add(proc));      
            // }
            console.log(data);
            navigate("/procurements");
    }

    const onChange =(event)=>{
        setDetail({ ...detail, [event.target.name]: event.target.value })
    }
    const handleRemove=(id)=>{
        console.log(id);
        console.log(itemList);
        setItemList(itemList.filter(procDet => procDet.id !== id));
    }
        
    const handleAdd = () =>{
        const items = {
            id: new Date().getMilliseconds().toString(),
            item: detail.item,
            qty: detail.qty,
            itemCategory: label2
        }
        console.log(items);
        itemList.push(items);
        console.log(itemList);
        setDetail({item:"",qty:""})
    }
    
    const navigate = useNavigate();

        return(
            <>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mb-3 d-flex gap-5 shadow-sm p-4 rounded-2 bg-white w-100">
                        <div className="d-flex flex-column gap-3 w-75">
                            <div className="dropdown">
                                <button className="btn btn-info dropdown-toggle px-4 fw-semibold" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {label}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                                <a className="dropdown-item" onClick={()=>setLabel("Technology")}>Technology</a>
                                <a className="dropdown-item" onClick={()=>setLabel("Funds")}>Funds</a>
                                <a className="dropdown-item" onClick={()=>setLabel("Else")}>Else</a>
                                </div>
                            </div>
                            <h5>Items</h5>
                            <div className="d-flex flex-column mb-3 gap-3">
                                <div className="dropdown">
                                    <button className="btn btn-info dropdown-toggle px-4 fw-semibold" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {label2}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                                    <a className="dropdown-item" onClick={()=>setLabel2("Foods")}>Foods</a>
                                    <a className="dropdown-item" onClick={()=>setLabel2("Equipments")}>Equipments</a>
                                    <a className="dropdown-item" onClick={()=>setLabel2("Else")}>Else</a>
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-4">
                                    <div className="mb-2">
                                        <label className="form-label">Item Name</label>
                                        <input value={detail.item} onChange={onChange} className={`form-control rounded-3 border-0 border-bottom `} type="text" name="item" />
                                        {/* {errors.item && <div className="invalid-feedback">{errors.item.message}</div>} */}
                                    </div>
                                    <div className="mb-2 w-50">
                                        <label className="form-label">Quantity</label>
                                        <input value={detail.qty} onChange={onChange} className={`form-control rounded-3 border-0 border-bottom `} type="number" name="qty" />
                                        {/* {errors.qty && <div className="invalid-feedback">{errors.qty.message}</div>} */}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-2 mt-4 ">
                                <button type="button" onClick={()=>handleAdd()} className="btn btn-secondary me-2 d-flex align-procurementDetails-center gap-2 fw-semibold">
                                        <IconPlus size={22} />Add Item
                                </button>
                            </div>
                        </div>
                        <div className="d-flex flex-column table-responsive gap-4 w-100 justify-content-between me-5">
                            <div >
                                <table className="table text-center ">
                                    <thead>
                                        <tr>
                                            <td>No</td>
                                            <td>Item</td>
                                            <td>Item Category</td>
                                            <td>Quantity</td>
                                            <td>No</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemList.map((procurementDetail,idx)=>{
                                            return(
                                                <tr key={idx}>
                                                    <td>{++idx}</td>
                                                    <td className="fw-semibold">{procurementDetail.item}</td>
                                                    <td>{procurementDetail.itemCategory}</td>
                                                    <td>{procurementDetail.qty}</td>
                                                    <td>
                                                        <button type="button" onClick={()=>handleRemove(procurementDetail.id)} className="btn btn-light text-white">
                                                            <IconMinus size={22} color="red"/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex gap-2 mt-4 justify-content-end">
                                <button type="submit" className="btn btn-secondary me-2 px-5 d-flex align-procurements-center gap-2 fw-semibold">
                                        <IconDeviceFloppy size={22} />Submit
                                </button>
                                {/* <button onClick={handleReset} type="button" className="btn btn-outline-primary me-2 d-flex align-procurements-center gap-2 fw-semibold border-2">
                                    <i>
                                    <IconRefresh size={22}/>
                                    </i>
                                    Reset
                                </button> */}
                            </div>
                        </div>
                </form>

            </>
        )
    }
