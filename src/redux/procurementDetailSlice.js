import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProcurementDetailService from "../services/procurementDetailService";


const service = ProcurementDetailService();

export const getProcurementDetailAction = createAsyncThunk('procurementDetails/getProcurementDetail',async ()=>{
    return await service.getAll();
})

export const postProcurementDetailAction = createAsyncThunk('procurementDetails/postProcurementDetail',async (payload,thunkAPI)=>{
    const response = await service.create(payload)
    await thunkAPI.dispatch(getProcurementDetailAction())
    return response;
})
export const putProcurementDetailAction = createAsyncThunk('procurementDetails/putProcurementDetail',async (payload,thunkAPI)=>{
    const response = await service.update(payload)
    await thunkAPI.dispatch(getProcurementDetailAction())
    return response;
})


const procurementDetailSlice = createSlice ({
    name:"procurementDetail",
    initialState:{
        procDets:[],
        procDet:null,
        isLoading:false,
        message:"",
    },

    reducers: {
        add: (state, {payload}) => {
            state.procDets.push(payload);
        },
        remove : (state, {payload}) => {
            state.procDets = state.procDets.filter(procDet => procDet.id !== payload);
        },
        selectedProcurementDetail : (state, {payload}) => {
            state.procDet = payload;
            console.log(state.procDet);
        },
        update : (state, {payload}) => {
            state.procDets = state.procDets.map(procDet => {
                if (procDet.id === payload.id) {
                    return {...payload}
                }
                return procDet;
            })
        }
    },

    // extraReducers: (builder) =>{
    //     builder.addCase(getProcurementDetailAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(getProcurementDetailAction.fulfilled,(state,{payload})=>{
    //         console.log(payload);
    //         state.procs=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(getProcurementDetailAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(postProcurementDetailAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(postProcurementDetailAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(postProcurementDetailAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(putProcurementDetailAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(putProcurementDetailAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(putProcurementDetailAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     })
    //     builder.addCase(deleteProcurementDetailAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(deleteProcurementDetailAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(deleteProcurementDetailAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     })
    // }
})
export const {add,remove,selectedProcurementDetail,update}=procurementDetailSlice.actions;
export const selectProcurementDetail = (state) => state.procurementDetail;

export default procurementDetailSlice;