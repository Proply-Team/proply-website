import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProcurementService from "../services/procurementService";


const service = ProcurementService();

export const getProcurementAction = createAsyncThunk('procurements/getProcurement',async ()=>{
    return await service.getAll();
})

export const postProcurementAction = createAsyncThunk('procurements/postProcurement',async (payload,thunkAPI)=>{
    const response = await service.create(payload)
    await thunkAPI.dispatch(getProcurementAction())
    return response;
})
export const putProcurementAction = createAsyncThunk('procurements/putProcurement',async (payload,thunkAPI)=>{
    const response = await service.update(payload)
    await thunkAPI.dispatch(getProcurementAction())
    return response;
})


const procurementSlice = createSlice ({
    name:"procurement",
    initialState:{
        procs:[],
        proc:null,
        isLoading:false,
        message:"",
    },

    reducers: {
        add: (state, {payload}) => {
            state.procs.push(payload);
        },
        remove : (state, {payload}) => {
            if (!confirm("delete row?")) return;
            state.procs = state.procs.filter(proc => proc.id !== payload);
        },
        selectedProcurement : (state, {payload}) => {
            state.proc = payload;
            console.log(state.proc);
        },
        update : (state, {payload}) => {
            state.procs = state.procs.map(proc => {
                if (proc.id === payload.id) {
                    return {...payload}
                }
                return proc;
            })
        }
    },

    // extraReducers: (builder) =>{
    //     builder.addCase(getProcurementAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(getProcurementAction.fulfilled,(state,{payload})=>{
    //         console.log(payload);
    //         state.procs=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(getProcurementAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(postProcurementAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(postProcurementAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(postProcurementAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(putProcurementAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(putProcurementAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(putProcurementAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     })
    //     builder.addCase(deleteProcurementAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(deleteProcurementAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(deleteProcurementAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     })
    // }
})
export const {add,remove,selectedProcurement,update}=procurementSlice.actions;
export const selectProcurement = (state) => state.procurement;

export default procurementSlice;