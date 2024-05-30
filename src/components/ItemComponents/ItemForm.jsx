import { IconDeviceFloppy, IconRefresh } from "@tabler/icons-react";
import { add, postItemAction, putItemAction, update } from "../../redux/itemSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { getCategoryAction, selectCat } from "../../redux/categorySlice";

const schema =z.object({
    itemId: z.string().nullable(),
    itemCategoryId: z.string().nullable(),
    name: z.string().min(1,"name can not be blank"),
})

export default function ItemForm() {
    const {itm} = useSelector((state)=>state.item)
    const {cats} = useSelector(selectCat)
    const [itemCategory,setItemCategory] = useState(["Select Item Category",null]);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    }=useForm({
        defaultValues:{
          itemId: "",
          name: "",
          itemCategoryId:""
        },
        mode: "onChange",
        resolver:zodResolver(schema),
        
    });
      
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCategoryAction())
        if(itm){
            reset({itemId:itm.itemId, name:itm.name,itemCategoryId:itm.itemCategoryResponse.itemCategoryId});
            setItemCategory([itm.itemCategoryResponse.name,itm.itemCategoryResponse.itemCategoryId])
        };
    },[itm,dispatch]);

    const onSubmit = async (data) => {
        if (itemCategory[1]!=null) {
            try {
                if (data.itemId&&data.itemId!="") {  
                    const itm = {id:data.itemId, name:data.name,itemCategoryId:itemCategory[1]};
                    await dispatch(putItemAction(itm));      
                  }else {
                      const itm ={
                          ...data,itemCategoryId:itemCategory[1]
                      };
                      await dispatch(postItemAction(itm));      
                  }
                  handleReset();
                  navigate("/items");                      
            } catch (error) {
                console.log(error);
            }
        }
        else {
            toast.error("Choose item category")
        }
    }

    const handleReset = () =>{
        reset({ itemId:"", name: "", itemCategoryId:"" })
    }
    const navigate = useNavigate();

        return(
            <>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="shadow-sm p-4 rounded-2 bg-white bg-opacity-75">
                    <h3>Form Item</h3>
                    <div className="dropdown">
                        <h6>Item Category</h6>
                        <button className="btn btn-info dropdown-toggle px-4 fw-semibold" type="button" id="dropdownItemCategory" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {itemCategory[0]}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownItemCategory" >
                        {cats.map((cat,idx)=>{
                            return(
                                <a className="dropdown-item" key={++idx} onClick={()=>setItemCategory([cat.name,cat.itemCategoryId])}>{cat.name}</a>
                            )
                        })}
                        </div>
                    </div>
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
