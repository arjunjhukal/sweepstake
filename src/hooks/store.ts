import { authApi } from "@/services/authApi";
import { configureStore } from "@reduxjs/toolkit";
import auth from "@/slice/authSlice";
import toastSlice from "@/slice/toastSlice";

export const store = configureStore({
    reducer: {
        auth,
        toastSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;