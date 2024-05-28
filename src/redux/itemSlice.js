import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ItemService from "../services/itemService";



const service = ItemService();

export const getItemAction = createAsyncThunk('items/getItem',async ()=>{
    return await service.getAll();
})

export const postItemAction = createAsyncThunk('items/postItem',async (payload,thunkAPI)=>{
    const response = await service.create(payload)
    await thunkAPI.dispatch(getItemAction())
    return response;
})
export const putItemAction = createAsyncThunk('items/putItem',async (payload,thunkAPI)=>{
    const response = await service.update(payload)
    await thunkAPI.dispatch(getItemAction())
    return response;
})
export const deleteItemAction = createAsyncThunk('items/deleteItem',async (payload,thunkAPI)=>{
    const response = await service.remove(payload)
    await thunkAPI.dispatch(getItemAction())
    return response;
})


const itemSlice = createSlice ({
    name:"item",
    initialState:{
        itms:[],
        itm:null,
        isLoading:false,
        message:"",
    },

    reducers: {
        add: (state, {payload}) => {
            state.itms.push(payload);
        },
        remove : (state, {payload}) => {
            if (!confirm("delete row?")) return;
            state.itms = state.itms.filter(itm => itm.id !== payload);
        },
        selectedItem : (state, {payload}) => {
            state.itm = payload;
            console.log(state.itm);
        },
        update : (state, {payload}) => {
            state.itms = state.itms.map(itm => {
                if (itm.id === payload.id) {
                    return {...payload}
                }
                return itm;
            })
        }
    },

    extraReducers: (builder) =>{
        builder.addCase(getItemAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(getItemAction.fulfilled,(state,{payload})=>{
            console.log(payload);
            state.itms=payload;
            state.isLoading=false;
        }),
        builder.addCase(getItemAction.rejected,(state)=>{
            state.isLoading=false;
        }),
        builder.addCase(postItemAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(postItemAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(postItemAction.rejected,(state)=>{
            state.isLoading=false;
        }),
        builder.addCase(putItemAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(putItemAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(putItemAction.rejected,(state)=>{
            state.isLoading=false;
        })
        builder.addCase(deleteItemAction.pending,(state)=>{
            state.isLoading= true;
        }),
        builder.addCase(deleteItemAction.fulfilled,(state,{payload})=>{
            state.message=payload;
            state.isLoading=false;
        }),
        builder.addCase(deleteItemAction.rejected,(state)=>{
            state.isLoading=false;
        })
    }
})
export const {add,remove,selectedItem,update}=itemSlice.actions;
export const selectItem = (state) => state.item;

export default itemSlice;