import { IconDeviceFloppy, IconRefresh } from "@tabler/icons-react";
import { postCategoryAction,putCategoryAction, selectCat } from "../../redux/categorySlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const schema =z.object({
    name: z.string().min(1,"name can not be blank"),
})

export default function CategoryForm() {
    const {cat} = useSelector(selectCat)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    }=useForm({
        defaultValues:{
          itemCategoryId: "",
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
        };
    },[cat]);

    const onSubmit = async (data) => {
        console.log(data);
        console.log(cat);
        try {
            if (cat.itemCategoryId&&cat.itemCategoryId!="") {  
              await dispatch(putCategoryAction({itemCategoryId:cat.itemCategoryId,name:data.name}));
              toast.success("Item category successfully updated");      
            }else {
                const cat ={
                    ...data,
                    isActive:true
                };
                await dispatch(postCategoryAction(cat));
                toast.success("Item category successfully added");
          
            }            
        } catch (error) {
            console.log(error);
        }
        handleReset();
        navigate("/item-categories");
    }

    const handleReset = () =>{
        reset({ itemCategoryId:"", name: "", isActive: false })
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
