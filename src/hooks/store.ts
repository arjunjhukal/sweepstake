import { authApi } from "@/services/authApi";
import { dashboardApi } from "@/services/dashboardApi";
import { downloadApi } from "@/services/downloadApi";
import { gameApi } from "@/services/gameApi";
import { menuApi, userMenuApi } from "@/services/menuApi";
import { notificationApi } from "@/services/notificationApi";
import { pageApi } from "@/services/pageApi";
import { paymentSetupApi } from "@/services/paymentSetupApi";
import { playerApi } from "@/services/playerApi";
import { providerApi } from "@/services/providerApi";
import { settingApi } from "@/services/settingApi";
import { transactionApi } from "@/services/transaction";
import { userApi } from "@/services/userApi";
import authModalSlice from "@/slice/authModalSlice";
import auth from "@/slice/authSlice";
import toastSlice from "@/slice/toastSlice";
import updatePasswordSlice from "@/slice/updatePasswordSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth,
        toastSlice,
        authModalSlice,
        updatePasswordSlice,
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
        [downloadApi.reducerPath]: downloadApi.reducer,
        [paymentSetupApi.reducerPath]: paymentSetupApi.reducer,
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
            .concat(downloadApi.middleware)
            .concat(paymentSetupApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;