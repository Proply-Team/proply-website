import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DivisionService from "../services/divisionService";


const service = DivisionService();

export const getDivisionAction = createAsyncThunk('divisions/getDivision',async ()=>{
    return await service.getAll();
})

export const postDivisionAction = createAsyncThunk('divisions/postDivision',async (payload,thunkAPI)=>{
    const response = await service.create(payload)
    await thunkAPI.dispatch(getDivisionAction())
    return response;
})
export const putDivisionAction = createAsyncThunk('divisions/putDivision',async (payload,thunkAPI)=>{
    const response = await service.update(payload)
    await thunkAPI.dispatch(getDivisionAction())
    return response;
})


const divisionSlice = createSlice ({
    name:"division",
    initialState:{
        divs:[],
        div:null,
        isLoading:false,
        message:"",
    },

    reducers: {
        add: (state, {payload}) => {
            state.divs.push(payload);
        },
        remove : (state, {payload}) => {
            if (!confirm("delete row?")) return;
            state.divs = state.divs.filter(div => div.id !== payload);
        },
        selectedDivision : (state, {payload}) => {
            state.div = payload;
            console.log(state.div);
        },
        update : (state, {payload}) => {
            state.divs = state.divs.map(div => {
                if (div.id === payload.id) {
                    return {...payload}
                }
                return div;
            })
        }
    },

    // extraReducers: (builder) =>{
    //     builder.addCase(getDivisionAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(getDivisionAction.fulfilled,(state,{payload})=>{
    //         console.log(payload);
    //         state.divs=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(getDivisionAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(postDivisionAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(postDivisionAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(postDivisionAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(putDivisionAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(putDivisionAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(putDivisionAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     })
    //     builder.addCase(deleteDivisionAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(deleteDivisionAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(deleteDivisionAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     })
    // }
})
export const {add,remove,selectedDivision,update}=divisionSlice.actions;
export const selectDiv = (state) => state.division;

export default divisionSlice;