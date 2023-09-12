import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./userSlice"
const appStore = configureStore({
    reducer:{
        user: userAuth
    }
})

export default appStore