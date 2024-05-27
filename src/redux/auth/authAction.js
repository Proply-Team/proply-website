import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

const authService = AuthService()

export class AuthAction{
    static loginAsyncThunk = createAsyncThunk("[Auth] login", async (payload, thunkAPI) => {
        try{
            const res = await authService.login(payload)
            console.log('thunk', res)
        }catch(e){
            // return thunkAPI.rejectWithValue(e)
            console.log("error", e)
        }
    })
}