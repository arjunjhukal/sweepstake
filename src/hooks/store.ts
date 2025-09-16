import { authApi } from "@/services/authApi";
import { configureStore } from "@reduxjs/toolkit";
import auth from "@/slice/authSlice";
import toastSlice from "@/slice/toastSlice";
import { gameApi } from "@/services/gameApi";
import { playerApi } from "@/services/playerApi";

export const store = configureStore({
    reducer: {
        auth,
        toastSlice,
        [authApi.reducerPath]: authApi.reducer,
        [gameApi.reducerPath]: gameApi.reducer,
        [playerApi.reducerPath]: playerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(gameApi.middleware)
            .concat(playerApi.middleware)

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;