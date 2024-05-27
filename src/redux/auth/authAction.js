import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

const authService = AuthService()

export class AuthAction{
    static loginAsyncThunk = createAsyncThunk("[Auth] login", async ({toast, data}, thunkAPI) => {
        try{
            const res = await authService.login(data)
            toast.success("asdad")
            return res
        }catch(e){
            toast.error(e.message)
            return thunkAPI.rejectWithValue(e)
        }
    })

    static validateAsyncThunk = createAsyncThunk("[Auth] validate token", async (_, thunkAPI) => {
        try{
            const res = await authService.validateToken()
            return res
        }catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    })
}