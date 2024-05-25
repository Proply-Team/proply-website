import { IconPlus } from "@tabler/icons-react";
import { add, update } from "../../../redux/procurementDetailSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const schema =z.object({
    id: z.string().nullable(),
    item: z.string().min(1,"item can not be blank"),
    qty: z.string().min(1,"quantity can not be blank"),
})

export default function ProcurementDetailForm() {
    const {procDet} = useSelector((state)=>state.procurementDetail)
    const [label,setLabel] = useState("Select Item Category");

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    }=useForm({
        defaultValues:{
          id: "",
          itemCategory:"",
          item: "",
          qty: 0
        },
        mode: "onChange",
        resolver:zodResolver(schema),
        
    });
      
    const dispatch = useDispatch();

    useEffect(()=>{
        if(procDet){
            reset(procDet);
        };
    },[procDet]);

    const onSubmit = (data) => {
        console.log(data);
        const procDet ={
            ...data,
            id: new Date().getMilliseconds().toString(),
            itemCategory:label
        };
        console.log(procDet);
        dispatch(add(procDet));      
        handleReset();
    }

    const handleReset = () =>{
        reset()
    }

        return(
            <>

            </>
        )
    }
