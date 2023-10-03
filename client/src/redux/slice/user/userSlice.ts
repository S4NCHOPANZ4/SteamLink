import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {  UserProfileData } from "../../../models/Typos";



const initialState: UserProfileData = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfileData>) => {
            console.log(state);
            return { ...action.payload };
        },
        clearUser: (state) => {
            console.log(state);
            return {};
        },

    }
})

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions