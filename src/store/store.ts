import {configureStore} from "@reduxjs/toolkit";
import {stoodoAPI} from "../services/StoodoService";
import authReducer from "./authSlice"
import {createWrapper} from "next-redux-wrapper";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [stoodoAPI.reducerPath]: stoodoAPI.reducer,
            auth: authReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(stoodoAPI.middleware),
    });
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<AppStore['getState']>

export const wrapper = createWrapper<AppStore>(makeStore);
