import { IconDeviceFloppy, IconRefresh } from "@tabler/icons-react";
import { add, update } from "../../redux/procurementCategorySlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const schema =z.object({
    id: z.string().nullable(),
    name: z.string().min(1,"name can not be blank"),
    isActive: z.boolean()
})

export default function ProcurementCategoryForm() {
    const {proCat} = useSelector((state)=>state.procurementCategory)
    const [status,setStatus] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    }=useForm({
        defaultValues:{
          id: "",
          name: "",
          isActive: false,
        },
        mode: "onChange",
        resolver:zodResolver(schema),
        
    });
      
    const dispatch = useDispatch();

    useEffect(()=>{
        if(proCat){
            reset(proCat);
            setStatus(proCat.isActive);
        };
    },[proCat]);

    const onSubmit = (data) => {
      data.isActive=status;
        if (data.id&&data.id!="") {  
          const proCat = {...data};
          dispatch(update(proCat));      
        }else {
            const proCat ={
                ...data,
                id: new Date().getMilliseconds().toString(),
            };
            dispatch(add(proCat));      
        }
        handleReset();
        navigate("/procurement-categories");
    }

    const handleReset = () =>{
        reset({ id:"", name: "", isActive: false })
    }
    const navigate = useNavigate();

        return(
            <>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="shadow-sm p-4 rounded-2 bg-white bg-opacity-75">
                    <h3>Form Procurement Category</h3>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input {...register("name")} type="text" className={`form-control ${errors.name &&"is-invalid"}`} id="name" name="name"/>
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isActive" className="form-label">
                            Status
                        </label>
                        <div>
                          <button className={`btn ${status? "bg-success":"bg-danger"} me-2 d-flex align-procurementCategorys-center gap-2 bg-opacity-75 fw-semibold text-white`} type="button" onClick={()=>setStatus(!status)}>{status? "Active":"Nonactive"}</button>
                        </div>
                    </div>

                    <div className="d-flex gap-2 mt-4 ">
                        <button type="submit" className="btn btn-secondary me-2 d-flex align-procurementCategorys-center gap-2 fw-semibold">
                                <IconDeviceFloppy size={22} />Submit
                        </button>
                        <button onClick={handleReset} type="button" className="btn btn-outline-primary me-2 d-flex align-procurementCategorys-center gap-2 fw-semibold border-2">
                            <i>
                                <IconRefresh size={22}/>
                            </i>
                            Reset
                        </button>
                    </div>
                </form>

            </>
        )
    }
