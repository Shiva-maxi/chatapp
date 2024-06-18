import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{
        _id:"",
        name:"",
        email:"",
        profilepicurl:"",
        token:"",
        onlineUser:[]
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
        },
        setOnlineuser:(state,action)=>{
            state.onlineUser=action.payload
        }
    }
})


export const {setUser,logout,setToken,setOnlineuser}=userSlice.actions;

export default userSlice.reducer;