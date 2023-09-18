import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/userSlice";
import { useDispatch,useSelector, TypedUseSelectorHook } from "react-redux"

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});

export const useAppDispatch: () => typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector