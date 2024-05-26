import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProfileService from "../services/profileService";


const service = ProfileService();

export const getProfileAction = createAsyncThunk('profiles/getProfile',async ()=>{
    return await service.getAll();
})

export const postProfileAction = createAsyncThunk('profiles/postProfile',async (payload,thunkAPI)=>{
    const response = await service.create(payload)
    await thunkAPI.dispatch(getProfileAction())
    return response;
})
export const putProfileAction = createAsyncThunk('profiles/putProfile',async (payload,thunkAPI)=>{
    const response = await service.update(payload)
    await thunkAPI.dispatch(getProfileAction())
    return response;
})


const profileSlice = createSlice ({
    name:"profile",
    initialState:{
        profs:[
            {id:"1",name:"this is name",division:"this is division",birthdate:"11111",status:"single",gender:"unknown",email:"mail"}
        ],
        prof:null,
        isLoading:false,
        message:"",
    },

    reducers: {
        add: (state, {payload}) => {
            state.profs.push(payload);
        },
        remove : (state, {payload}) => {
            if (!confirm("delete row?")) return;
            state.profs = state.profs.filter(prof => prof.id !== payload);
        },
        selectedProfile : (state, {payload}) => {
            state.prof = payload;
            console.log(state.prof);
        },
        update : (state, {payload}) => {
            state.profs = state.profs.map(prof => {
                if (prof.id === payload.id) {
                    return {...payload}
                }
                return prof;
            })
        }
    },

    // extraReducers: (builder) =>{
    //     builder.addCase(getProfileAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(getProfileAction.fulfilled,(state,{payload})=>{
    //         console.log(payload);
    //         state.profs=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(getProfileAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(postProfileAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(postProfileAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(postProfileAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(putProfileAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(putProfileAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(putProfileAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     })
    //     builder.addCase(deleteProfileAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(deleteProfileAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(deleteProfileAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     })
    // }
})
export const {add,remove,selectedProfile,update}=profileSlice.actions;
export const selectProfile = (state) => state.profile;

export default profileSlice;