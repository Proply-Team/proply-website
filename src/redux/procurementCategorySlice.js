import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProcurementCategoryService from "../services/procurementCategoryService";



const service = ProcurementCategoryService();

export const getProcurementCategoryAction = createAsyncThunk('procurement-categories/getProcurementCategory',async ()=>{
    return await service.getAll();
})

export const postProcurementCategoryAction = createAsyncThunk('procurement-categories/postProcurementCategory',async (payload,thunkAPI)=>{
    const response = await service.create(payload)
    await thunkAPI.dispatch(getProcurementCategoryAction())
    return response;
})
export const putProcurementCategoryAction = createAsyncThunk('procurement-categories/putProcurementCategory',async (payload,thunkAPI)=>{
    const response = await service.update(payload)
    await thunkAPI.dispatch(getProcurementCategoryAction())
    return response;
})
export const deleteProcurementCategoryAction = createAsyncThunk('procurement-categories/deleteProcurementCategory',async (payload,thunkAPI)=>{
    const response = await service.remove(payload)
    await thunkAPI.dispatch(getProcurementCategoryAction())
    return response;
})


const procurementCategorySlice = createSlice ({
    name:"procurementCategory",
    initialState:{
        proCats:[],
        proCat:null,
        isLoading:false,
        message:"",
    },

    reducers: {
        add: (state, {payload}) => {
            state.proCats.push(payload);
        },
        remove : (state, {payload}) => {
            if (!confirm("delete row?")) return;
            state.proCats = state.proCats.filter(proCat => proCat.id !== payload);
        },
        selectedProcurementCategory : (state, {payload}) => {
            state.proCat = payload;
            console.log(state.proCat);
        },
        update : (state, {payload}) => {
            state.proCats = state.proCats.map(proCat => {
                if (proCat.id === payload.id) {
                    return {...payload}
                }
                return proCat;
            })
        }
    },

    extraReducers: (builder) =>{
        builder.addCase(getProcurementCategoryAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(getProcurementCategoryAction.fulfilled,(state,{payload})=>{
            console.log(payload);
            state.proCats=payload;
            state.isLoading=false;
        }),
        builder.addCase(getProcurementCategoryAction.rejected,(state)=>{
            state.isLoading=false;
        }),
        builder.addCase(postProcurementCategoryAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(postProcurementCategoryAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(postProcurementCategoryAction.rejected,(state)=>{
            state.isLoading=false;
        }),
        builder.addCase(putProcurementCategoryAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(putProcurementCategoryAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(putProcurementCategoryAction.rejected,(state)=>{
            state.isLoading=false;
        })
        builder.addCase(deleteProcurementCategoryAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(deleteProcurementCategoryAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(deleteProcurementCategoryAction.rejected,(state)=>{
            state.isLoading=false;
        })
    }
})
export const {add,remove,selectedProcurementCategory,update}=procurementCategorySlice.actions;
export const selectProCat = (state) => state.procurementCategory;

export default procurementCategorySlice;