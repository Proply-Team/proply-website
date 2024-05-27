import { IconDeviceFloppy, IconPlus,IconMinus } from "@tabler/icons-react";
import { add, update } from "../../redux/procurementSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "react-toastify";


const schema =z.object({
    id: z.string().nullable(),
})

export default function ProcurementForm() {
    const {proCats} = useSelector((state)=>state.procurementCategory)
    const {cats} = useSelector((state)=>state.category)
    const {itms} = useSelector((state)=>state.item)
    const [procurementCategory,setProcurementCategory] = useState(["Select Procurement Category",null]);
    const [itemCategory,setItemCategory] = useState(["Select Item Category",null]);
    const [item,setItem] = useState(["Select Item",null]);
    const [qty,setQty] =useState(0)
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
        if (data&&procurementCategory[1]!=null&&itemList!=[]) {  
            const proc ={
                ...data,
                id: new Date().getMilliseconds().toString(),
                user:"this user",
                procurementCategory: procurementCategory[1],
                requestedAt: Date.now(),
                items: itemList
            };
            console.log(proc);
            dispatch(add(proc));      
            console.log(data);
            toast.success("Procurement successfully requested");
            navigate("/procurements");
        }else {
            toast.error("All fields are required");
        }
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
        if (qty<1) {
            toast.error("Quantity should be more than 0")
        } else if (procurementCategory[1]==null&&itemCategory[1]==null&&item[1]==null) {
            toast.error("All fields are required")
        } else {
            const items = {
                id: new Date().getMilliseconds().toString(),
                item: item[1],
                qty: qty,
                itemCategory: itemCategory[1]
            }
            console.log(items);
            itemList.push(items);
            console.log(itemList);
            setQty(0)                        
        }
    }
    
    const navigate = useNavigate();
        return(
            <>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mb-3 d-flex gap-5 shadow-sm p-4 rounded-2 bg-white w-100">
                        <div className="d-flex flex-column gap-3 w-75">
                            <div className="dropdown">
                                <h6>Procurement Category</h6>
                                <button className="btn btn-info dropdown-toggle px-4 fw-semibold" type="button" id="dropdownProcurementCategory" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {procurementCategory[0]}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownProcurementCategory" >
                                    {proCats.map((proCat)=>{
                                        return(
                                            <a className="dropdown-item" onClick={()=>setProcurementCategory([proCat.name,proCat.name])}>{proCat.name}</a>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="d-flex flex-column mb-3 gap-3">
                                <div className="dropdown">
                                    <h6>Item Category</h6>
                                    <button className="btn btn-info dropdown-toggle px-4 fw-semibold" type="button" id="dropdownItemCategory" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {itemCategory[0]}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownItemCategory" >
                                    {cats.map((cat)=>{
                                        return(
                                            <a className="dropdown-item" onClick={()=>setItemCategory([cat.name,cat.name])}>{cat.name}</a>
                                        )
                                    })}
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-4">
                                    <div className="dropdown">
                                        <h6>Item Name</h6>
                                        <button className="btn btn-info dropdown-toggle px-4 fw-semibold" type="button" id="dropdownItem" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {item[0]}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownItem" >
                                        {itms.map((itm)=>{
                                            return(
                                                <a className="dropdown-item" onClick={()=>setItem([itm.name,itm.name])}>{itm.name}</a>
                                            )
                                        })}
                                        </div>
                                    </div>
                                    <div className="mb-2 w-50">
                                        <label className="form-label">Quantity</label>
                                        <input value={qty} onChange={onChange} className={`form-control rounded-3 border-0 border-bottom `} type="number" name="qty" />
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
