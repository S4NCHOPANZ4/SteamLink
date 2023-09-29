import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SteamUserData, UserProfileData } from "../../../models/Typos";



const initialState: UserProfileData = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfileData>) => {
            return { ...action.payload };
        },
        clearUser: (state) => {
            return {};
        },

    }
})

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions