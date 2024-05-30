import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProcurementService from "../services/procurementService";


const service = ProcurementService();

export const getProcurementAction = createAsyncThunk('procurements/getProcurement',async (payload, thunnkAPI)=>{
    try{
        return await service.getAll(payload);
    }catch(e){
        return thunnkAPI.rejectWithValue(e.message)
    }
})

export const getProcurementByIdAction = createAsyncThunk('procurements/getProcurementById', async (payload, thunkAPI) => {
    try{
        return await service.getById(payload)
    }catch(e){
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const postProcurementAction = createAsyncThunk('procurements/postProcurement',async (payload,thunkAPI)=>{
    const response = await service.create(payload)
    console.log(response)
    await thunkAPI.dispatch(getProcurementAction(payload.userId))
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

    extraReducers: (builder) =>{
        builder.addCase(getProcurementAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProcurementAction.fulfilled, (state, {payload}) => {
            state.isLoading = false

            state.procs = payload.data
        })
        builder.addCase(getProcurementAction.rejected, (state, {payload}) => {
            state.isLoading = false
            console.log(payload)
            state.message = payload.message
        })

        builder.addCase(getProcurementByIdAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProcurementByIdAction.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.proc = payload.data
        })
        builder.addCase(getProcurementByIdAction.rejected, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message
        })

        builder.addCase(postProcurementAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(postProcurementAction.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message
        })
        builder.addCase(postProcurementAction.rejected, (state) => {
            state.isLoading = false
        })
    }
})
export const {add,remove,selectedProcurement,update}=procurementSlice.actions;
export const selectProcurement = (state) => state.procurement;

export default procurementSlice;