import {configureStore, PreloadedState} from "@reduxjs/toolkit";
import {stoodoAPI} from "../services/StoodoService";
import {useMemo} from 'react'
import authReducer from "./authSlice"

let store: AppStore

export const initStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            [stoodoAPI.reducerPath]: stoodoAPI.reducer,
            auth: authReducer,
        },
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stoodoAPI.middleware),
    });
}

export const initializeStore = (preloadedState: PreloadedState<RootState>) => {
    let _store = store ?? initStore(preloadedState)

    if (preloadedState && store) {
        _store = initStore({...store.getState(), ...preloadedState})
    }

    if (typeof window === 'undefined') return _store
    if (!store) store = _store

    return _store
}

export function useStore(initialState: RootState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}

export type AppStore = ReturnType<typeof initStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<AppStore['getState']>

