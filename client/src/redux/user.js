import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{
        _id:"",
        name:"",
        email:"",
        profilepicurl:"",
        token:"",
        onlineUser:[],
        socketconnection:null
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
            state.token="";
            state.socketconnection=null
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setOnlineuser:(state,action)=>{
            state.onlineUser=action.payload
        },
        setSocketconnection:(state,action)=>{
            state.socketconnection=action.payload
        }
    }
})


export const {setUser,logout,setToken,setOnlineuser,setSocketconnection}=userSlice.actions;

export default userSlice.reducer;