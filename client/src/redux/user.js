import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{
        _id:"",
        name:"",
        email:"",
        profilepicurl:"",
        token:""
    },

    reducers:{
        setUser:(state,action)=>{
            state.name=action.payload.name;
            state._id=action.payload._id;
            state.email=action.payload.email;
            state.profilepicurl=action.payload.profilepicurl
        },
        logout:(state)=>{
            state.name="";
            state._id="";
            state.email="";
            state.profilepicurl="";
            state.token=""
        },
        setToken:(state,action)=>{
            state.token=action.payload
        }
    }
})


export const {setUser,logout,setToken}=userSlice.actions;

export default userSlice.reducer;