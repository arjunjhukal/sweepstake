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
import { pageApi } from "@/services/pageApi";
import { notificationApi } from "@/services/notificationApi";
import { menuApi, userMenuApi } from "@/services/menuApi";
import { dashboardApi } from "@/services/dashboardApi";

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
        [pageApi.reducerPath]: pageApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
        [menuApi.reducerPath]: menuApi.reducer,
        [userMenuApi.reducerPath]: userMenuApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
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
            .concat(pageApi.middleware)
            .concat(notificationApi.middleware)
            .concat(menuApi.middleware)
            .concat(userMenuApi.middleware)
            .concat(dashboardApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;