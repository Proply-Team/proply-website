import { IconDeviceFloppy, IconRefresh } from "@tabler/icons-react";
import { putDivisionAction, selectDiv,postDivisionAction } from "../../redux/divisionSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "react-toastify";


const schema =z.object({
    divisionId: z.string().nullable(),
    name: z.string().min(1,"name can not be blank"),
})

export default function DivisionForm() {
    const {div} = useSelector(selectDiv)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    }=useForm({
        defaultValues:{
          divisionId: "",
          name: "",
          isActive: false,
        },
        mode: "onChange",
        resolver:zodResolver(schema),
        
    });
      
    const dispatch = useDispatch();

    useEffect(()=>{
        if(div){
            reset(div);
        };
    },[div]);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            if (data.divisionId&&data.divisionId!="") {  
              await dispatch(putDivisionAction({divisionId:div.divisionId,name:data.name}));
            }else {
                const div ={
                    ...data,
                    isActive:true
                };
                await dispatch(postDivisionAction(div));
          
            }            
        } catch (error) {
            console.log(error);
        }
        handleReset();
        navigate("/divisions");
    }

    const handleReset = () =>{
        reset({ divisionId:"", name: "", isActive: false })
    }
    const navigate = useNavigate();

        return(
            <>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="shadow-sm p-4 rounded-2 bg-white bg-opacity-75">
                    <h3>Form Division</h3>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input {...register("name")} type="text" className={`form-control ${errors.name &&"is-invalid"}`} id="name" name="name"/>
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
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
