import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {login, logout} from '../redux/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: '',
    credentials: 'include',
    prepareHeaders:(headers, {getState}) =>{
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args,api,extraOptions) =>{
    let result = await baseQuery(args,api,extraOptions);

    if(result?.error?.originalStatus === 403) {
        console.log('token is expired');
        api.dispatch(logout());
    }
    return result;
}

export const apiSlice =createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder=>({})
})