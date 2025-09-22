import { authApi } from "@/services/authApi";
import { configureStore } from "@reduxjs/toolkit";
import auth from "@/slice/authSlice";
import toastSlice from "@/slice/toastSlice";
import authModalSlice from "@/slice/authModalSlice";
import { gameApi } from "@/services/gameApi";
import { playerApi } from "@/services/playerApi";
import { providerApi } from "@/services/providerApi";
import { transactionApi } from "@/services/transaction";
import { userApi } from "@/services/userApi";
import { settingApi } from "@/services/settingApi";

export const store = configureStore({
    reducer: {
        auth,
        toastSlice,
        authModalSlice,
        [authApi.reducerPath]: authApi.reducer,
        [gameApi.reducerPath]: gameApi.reducer,
        [providerApi.reducerPath]: providerApi.reducer,
        [playerApi.reducerPath]: playerApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [settingApi.reducerPath]: settingApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(gameApi.middleware)
            .concat(playerApi.middleware)
            .concat(providerApi.middleware)
            .concat(transactionApi.middleware)
            .concat(userApi.middleware)
            .concat(settingApi.middleware)

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;