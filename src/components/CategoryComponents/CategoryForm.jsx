import { IconDeviceFloppy, IconRefresh } from "@tabler/icons-react";
import { add, update } from "../../redux/categorySlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { toast } from "react-toastify";

const schema =z.object({
    id: z.string().nullable(),
    name: z.string().min(1,"name can not be blank"),
    isActive: z.boolean()
})

export default function CategoryForm() {
    const {cat} = useSelector((state)=>state.category)
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
        if(cat){
            reset(cat);
            setStatus(cat.isActive);
        };
    },[cat]);

    const onSubmit = (data) => {
      data.isActive=status;
        if (data.id&&data.id!="") {  
          const cat = {...data};
          dispatch(update(cat));
          toast.success("Item category successfully updated");      
        }else {
            const cat ={
                ...data,
                id: new Date().getMilliseconds().toString(),
            };
            dispatch(add(cat));
            toast.success("Item category successfully added");
      
        }
        handleReset();
        navigate("/item-categories");
    }

    const handleReset = () =>{
        reset({ id:"", name: "", isActive: false })
    }
    const navigate = useNavigate();

        return(
            <>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="shadow-sm p-4 rounded-2 bg-white bg-opacity-75">
                    <h3>Form Category</h3>
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
                          <button className={`btn ${status? "bg-success":"bg-danger"} me-2 d-flex align-items-center gap-2 bg-opacity-75 fw-semibold text-white`} type="button" onClick={()=>setStatus(!status)}>{status? "Active":"Nonactive"}</button>
                        </div>
                    </div>

                    <div className="d-flex gap-2 mt-4 ">
                        <button type="submit" className="btn btn-secondary me-2 d-flex align-items-center gap-2 fw-semibold">
                                <IconDeviceFloppy size={22} />Submit
                        </button>
                        <button onClick={handleReset} type="button" className="btn btn-outline-primary me-2 d-flex align-items-center gap-2 fw-semibold border-2">
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
