import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../services/categoryService";


const service = CategoryService();

export const getCategoryAction = createAsyncThunk('categories/getCategory',async ()=>{
    return await service.getAll();
})

export const postCategoryAction = createAsyncThunk('categories/postCategory',async (payload,thunkAPI)=>{
    const response = await service.create(payload)
    await thunkAPI.dispatch(getCategoryAction())
    return response;
})
export const putCategoryAction = createAsyncThunk('categories/putCategory',async (payload,thunkAPI)=>{
    const response = await service.update(payload)
    await thunkAPI.dispatch(getCategoryAction())
    return response;
})


const categorySlice = createSlice ({
    name:"category",
    initialState:{
        cats:[],
        cat:null,
        isLoading:false,
        message:"",
    },

    reducers: {
        add: (state, {payload}) => {
            state.cats.push(payload);
        },
        remove : (state, {payload}) => {
            if (!confirm("delete row?")) return;
            state.cats = state.cats.filter(cat => cat.id !== payload);
        },
        selectedCategory : (state, {payload}) => {
            state.cat = payload;
            console.log(state.cat);
        },
        update : (state, {payload}) => {
            state.cats = state.cats.map(cat => {
                if (cat.id === payload.id) {
                    return {...payload}
                }
                return cat;
            })
        }
    },

    // extraReducers: (builder) =>{
    //     builder.addCase(getCategoryAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(getCategoryAction.fulfilled,(state,{payload})=>{
    //         console.log(payload);
    //         state.cats=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(getCategoryAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(postCategoryAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(postCategoryAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(postCategoryAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(putCategoryAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(putCategoryAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(putCategoryAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     })
    //     builder.addCase(deleteCategoryAction.pending,(state)=>{
    //         state.isLoading= true;
    //     }),
    //     builder.addCase(deleteCategoryAction.fulfilled,(state,{payload})=>{
    //         state.message=payload;
    //         state.isLoading=false;
    //     }),
    //     builder.addCase(deleteCategoryAction.rejected,(state)=>{
    //         state.isLoading=false;
    //     })
    // }
})
export const {add,remove,selectedCategory,update}=categorySlice.actions;
export const selectCat = (state) => state.category;

export default categorySlice;