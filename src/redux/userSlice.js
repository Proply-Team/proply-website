import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/userService";



const service = UserService();

export const getUserAction = createAsyncThunk('users/getUser',async ()=>{
    return await service.getAll();
})

export const getCurrentUserAction = createAsyncThunk('users/getCurrentUser',async (payload)=>{
    return await service.getCurrentUser(payload);
})
export const postRegisterAdminAction = createAsyncThunk('users/postRegisterAdmin',async (payload,thunkAPI)=>{
    const response = await service.createAdmin(payload)
    await thunkAPI.dispatch(getUserAction())
    return response;
})
export const postRegisterManagerAction = createAsyncThunk('users/postRegisterManager',async (payload,thunkAPI)=>{
    const response = await service.createManager(payload)
    await thunkAPI.dispatch(getUserAction())
    return response;
})
export const postRegisterEmployeeAction = createAsyncThunk('users/postRegisterEmployee',async (payload,thunkAPI)=>{
    const response = await service.createEmployee(payload)
    await thunkAPI.dispatch(getUserAction())
    return response;
})
export const putUserAction = createAsyncThunk('users/putUser',async (payload,thunkAPI)=>{
    const response = await service.update(payload)
    await thunkAPI.dispatch(getUserAction())
    return response;
})
export const postUserPhotoAction = createAsyncThunk('users/postUserPhoto',async (payload,thunkAPI)=>{
    const response = await service.updatePhoto(payload)
    await thunkAPI.dispatch(getUserAction())
    return response;
})
export const deleteUserAction = createAsyncThunk('users/deleteUser',async (payload,thunkAPI)=>{
    const response = await service.remove(payload)
    await thunkAPI.dispatch(getUserAction())
    return response;
})


const userSlice = createSlice ({
    name:"user",
    initialState:{
        usrs:[],
        usr:null,
        current:null,
        isLoading:false,
        message:"",
    },

    reducers: {
        add: (state, {payload}) => {
            state.usrs.push(payload);
        },
        remove : (state, {payload}) => {
            if (!confirm("delete row?")) return;
            state.usrs = state.usrs.filter(usr => usr.id !== payload);
        },
        selectedUser : (state, {payload}) => {
            state.usr = payload;
            console.log(state.usr);
        },
        update : (state, {payload}) => {
            state.usrs = state.usrs.map(usr => {
                if (usr.id === payload.id) {
                    return {...payload}
                }
                return usr;
            })
        }
    },

    extraReducers: (builder) =>{
        builder.addCase(getUserAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(getUserAction.fulfilled,(state,{payload})=>{
            console.log(payload);
            state.usrs=payload;
            state.isLoading=false;
        }),
        builder.addCase(getUserAction.rejected,(state)=>{
            state.isLoading=false;
        }),
        builder.addCase(getCurrentUserAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(getCurrentUserAction.fulfilled,(state,{payload})=>{
            console.log(payload);
            state.current=payload;
            state.isLoading=false;
        }),
        builder.addCase(getCurrentUserAction.rejected,(state,{payload})=>{
            state.isLoading=false;
            state.message=payload;
            console.log(payload);
        }),
        builder.addCase(postRegisterAdminAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(postRegisterAdminAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(postRegisterAdminAction.rejected,(state)=>{
            state.isLoading=false;
        }),
        builder.addCase(postRegisterManagerAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(postRegisterManagerAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(postRegisterManagerAction.rejected,(state)=>{
            state.isLoading=false;
        }),
        builder.addCase(postRegisterEmployeeAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(postRegisterEmployeeAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(postRegisterEmployeeAction.rejected,(state)=>{
            state.isLoading=false;
        }),
        builder.addCase(putUserAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(putUserAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(putUserAction.rejected,(state)=>{
            state.isLoading=false;
        })
        builder.addCase(postUserPhotoAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(postUserPhotoAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(postUserPhotoAction.rejected,(state)=>{
            state.isLoading=false;
        })
        builder.addCase(deleteUserAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(deleteUserAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(deleteUserAction.rejected,(state)=>{
            state.isLoading=false;
        })
    }
})
export const {add,remove,selectedUser,update}=userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice;