import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SteamUserData } from "../../../models/Typos";

export interface UserInitialState {
    steamId?: string;
    username?: string;
    displayName?: string;
    steamUser?: SteamUserData;
}
const initialState: UserInitialState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInitialState>) => {
            return { ...action.payload };
        },
        clearUser: (state) => {
            return {};
        },
        addSteamUser: (state, action: PayloadAction<{ success: boolean; data: SteamUserData }>) =>{
            if (action.payload.success) {
                const steamUserData = action.payload.data;
                return { ...state, steamUser: steamUserData };
              } else {
                return state;
              }
        }
    }
})

export default userSlice.reducer;
export const {setUser, clearUser,addSteamUser} = userSlice.actions