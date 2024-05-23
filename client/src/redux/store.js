import {configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
const appstore=configureStore({
    reducer:{
        user:userReducer
    }
})



export default appstore;