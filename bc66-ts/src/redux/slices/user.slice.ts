import { createSlice } from "@reduxjs/toolkit";
import { CurrentUser } from "../../interfaces/user.interface";
import { getLocalSorage } from "../../untils";



const userLocalStorage = getLocalSorage<CurrentUser>("user")
type UserState ={
    currentUser :CurrentUser | null
}

const initialState:UserState = {
    currentUser:userLocalStorage,   
}


const userSlice = createSlice({
    name: "user",
  initialState,
    reducers: {
        setUser: (state, action) => { 
            state.currentUser= action.payload
         }
    }
})
    
export const { setUser } = userSlice.actions;

export default  userSlice