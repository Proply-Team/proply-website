import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { getProcurementCategoryAction } from "../../redux/procurementCategorySlice";
import { getItemAction } from "../../redux/itemSlice";
import { getCategoryAction } from "../../redux/categorySlice";
import { getDivisionAction } from "../../redux/divisionSlice";
import { useRef } from "react";
import { createPortal } from "react-dom";
import ProcurementApproval from "./ProcurementApproval";
import { getCurrentUserAction, getUserAction } from "../../redux/userSlice";
import { postProcurementAction } from "../../redux/procurementSlice";
import { useNavigate } from "react-router-dom";


const schema = z.object({
    userId: z.string().nullable(),
    procurementCategoryId: z.string().min(1, "Procurement Category Id required"),
    procurementDetailRequests:  z.array(z.object({
        itemId: z.string().or(z.number()).nullable(),
        quantity: z.string().nullable()
    })).min(1, "Minimal 1 approval required"),
    approvalRequests: z.array(z.object({
        userId: z.string().nullable()
    })).min(1, "Minimal 1 approval required"),
    level: z.number().nullable()
})

export default function ProcurementForm() {
    const {proCats} = useSelector((state)=>state.procurementCategory)
    // const {cats} = useSelector((state)=>state.category)
    const {divs} = useSelector((state) => state.division)
    const {usrs, current} = useSelector((state) => state.user)
    const {user} = useSelector((state) => state.auth)
    const {itms} = useSelector((state)=>state.item)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const approvalRef = useRef()
    
    const [elementApprove, SetElementApprove] = useState([])
    const [isSetProCat, setIsSetProCat] = useState(false)
    const [item, setItem] = useState({
        itemId: '',
        quantity: 0
    })
    
    const {
        register,
        handleSubmit,
        watch,
        formState: {isValid},
        reset,
        getValues,
        setValue,
        trigger
    }=useForm({
        defaultValues:{
          userId: "",
          procurementCategoryId:"",
          procurementDetailRequests: [],
          approvalRequests: [],
          level: 0
        },
        mode: 'all',
        resolver:zodResolver(schema),
    });

    const fetchData = async () => {
        await dispatch(getProcurementCategoryAction())
        await dispatch(getItemAction())
        await dispatch(getCategoryAction())
        await dispatch(getDivisionAction())
        await dispatch(getUserAction())
        await dispatch(getCurrentUserAction({email: user.email}))
    }

    useEffect(()=>{
        fetchData()
    },[]);
    

    const onSubmit = async (data) => {
        data = {
            ...data,
            userId: current.userId,
            procurementDetailRequests: [
                ...data.procurementDetailRequests.map(val => {
                    if(typeof val.itemId == 'number'){
                        val.itemId = null
                    }
                    val.quantity = parseInt(val.quantity)
                    return val
                })
            ],
            level: data.approvalRequests.length
        }
        

        const res = await dispatch(postProcurementAction(data))
        if(await res?.payload?.statusCode == 201){
            return navigate("/procurements")
        }
    }

    const onSaveProcurementCategory = () => {
        setIsSetProCat(true)
    }
    
    const onChangeItem = (e) => {
        const {name, value} = e.target
        
        const itemForm = {
            ...item,
            [name]: value
        }

        setItem(itemForm)
    }

    const onAddItemProcurement = () => {
        let items = getValues('procurementDetailRequests')

        if(!item.itemId){
            const max = Math.max(...items.map(val => val.items)) == '-Infinity' ? 0 : Math.max(...items.map(val => val.itemId))
            item.itemId = max + 1
        }
        
        if(items.find(val => val.itemId == item.itemId)){
            items = items.map(val => {
                if(val.itemId == item.itemId){
                    val.quantity = item.quantity
                }
                return val
            })
        }else{
            items.push(item)
        }
        setValue('procurementDetailRequests', items)

        setItem({
            itemId: '',
            quantity: 0
        })
        trigger()
    }

    const onDeleteItem = (id) => {
        const items = getValues('procurementDetailRequests').filter(item => item.itemId != id)
        setValue('procurementDetailRequests', items)
    }

    const onAddApprovalData = (approval) => {
        const approvalRequests = getValues("approvalRequests")

        approvalRequests.push({
            userId: approval.userId
        })

        setValue('approvalRequests', approvalRequests)

        trigger()
    }

    
    const onDelete = () => {
        setValue('approvalRequests', [])
        SetElementApprove([])
        trigger()
    }

    const onResetAll = () => {
        reset()
        setIsSetProCat(false)
        SetElementApprove([])
        trigger()
    }


    const onAddApprovalElement = () => {
        const length = elementApprove.length + 1
        const elementUpdate =  
            {
                id: length,
                component: <ProcurementApproval
                 key={length} 
                 id={length}
                 divisions={divs}
                 users={usrs}
                 onAddApprovalData={onAddApprovalData}
                 onDelete={onDelete}
                 elementApprove={elementApprove}
                />
            }

        SetElementApprove(prevEl => [...prevEl, elementUpdate])
    }

    return(
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mb-3 shadow-sm p-4 rounded-2 bg-white w-100">
            <div className="w-100 row mb-3">
                <div className="col">
                    <label htmlFor="procurementCategory" className="form-label">Procurement Category</label>
                    <select disabled={isSetProCat} {...register("procurementCategoryId")} id="procurementCategory" className="form-select">
                        <option value="">--Select Procurement Category--</option>
                        {proCats.map((val, idx) => (
                            <option key={idx} value={val.procurementCategoryId}>{val.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col align-self-end text-end">
                    <button
                     type="button" 
                     onClick={onSaveProcurementCategory} 
                     disabled={isSetProCat || !watch('procurementCategoryId')} 
                     className="btn btn-primary text-white fw-bold"
                    >Save</button>
                </div>
            </div>
            {isSetProCat && (
                <>
                    <hr />
                    <div className="w-100 row">
                        {proCats.find(val => val.procurementCategoryId == watch('procurementCategoryId')).name != "Funds Procurement"  && (
                            <div className="col">
                                <label htmlFor="itemId" className="form-label">Item</label>
                                <select onChange={onChangeItem} value={item.itemId} name="itemId" id="itemId" className="form-select">
                                    <option value="">--Select Item--</option>
                                    {itms.map((val, idx) => (
                                        <option key={idx} value={val.itemId}>{val.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="col-3">
                            <label htmlFor="quantity" className="form-label">{proCats.find(val => val.procurementCategoryId == watch('procurementCategoryId')).name == "Funds Procurement" ? "Money" : "Quantity"}</label>
                            <input type="number" onChange={onChangeItem} value={item.quantity} name="quantity" id="quantity" className="form-control" />
                        </div>
                        <div className="col align-self-end text-end">
                            <button
                            type="button" 
                            onClick={onAddItemProcurement} 
                            disabled={proCats.find(val => val.procurementCategoryId == watch('procurementCategoryId')).name == "Funds Procurement" ? !(item.quantity == 0 ? false : true) : !(item.itemId && !item.quantity == 0)} 
                            className="btn btn-primary text-white fw-bold"
                            >Add Item</button>
                        </div>
                    </div>

                    <div className="table-responsive mt-4 p-2 bg-light">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {watch("procurementDetailRequests") && getValues("procurementDetailRequests").length != 0 ?
                                getValues("procurementDetailRequests").map((item, idx) => (
                                    <tr key={idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>{itms.find(val => val.itemId == item.itemId)?.name ?? "Money"}</td>
                                        <td>{item.quantity}</td>
                                        <td className="text-center">
                                            <button type="button" onClick={() => onDeleteItem(item.itemId)} className="btn btn-danger text-white fw-bold">Delete</button>
                                        </td>
                                    </tr>
                                )):
                                <tr>
                                    <td colSpan={4} className="text-center">Item not found</td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="w-100 row mt-3">
                        <div className="col">
                            <div className="d-flex gap-2">
                                <button type="button" onClick={onAddApprovalElement} className="btn btn-primary text-white fw-bold mb-4">Add Approval</button>
                                <button type="button" onClick={onDelete} className="btn btn-danger text-white fw-bold mb-4">Reset Approval</button>
                            </div>
                            <div ref={approvalRef} className="row">
                                {elementApprove.map(el => 
                                    createPortal(el.component, approvalRef.current)
                                )}
                            </div>
                        </div>
                    </div>
                    {console.log(isValid)}
                    <div className="row w-100">
                        <div className="col-12 text-end">
                            <button
                             type="submit" 
                             className="btn btn-primary text-white fw-bold me-2"
                             disabled={!isValid}
                            >Submit</button>
                            <button onClick={onResetAll} type="button" className="btn btn-danger text-white fw-bold">
                                Reset
                            </button>
                        </div>
                    </div>
                </>
            )}
        </form>
    )
}
