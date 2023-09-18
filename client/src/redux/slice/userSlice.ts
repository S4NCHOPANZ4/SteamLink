import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserInitialState {
    steamId?: string;
    username?: string;
    displayName?: string;
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
    }
})

export default userSlice.reducer;
export const {setUser, clearUser} = userSlice.actions