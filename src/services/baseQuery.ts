// src/services/baseQuery.ts
import { RootState } from "@/hooks/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let globalDeviceId: string | undefined = undefined;

export const setGlobalDeviceId = (id?: string) => {
    globalDeviceId = id;
};
export const baseQuery = fetchBaseQuery({
    baseUrl:
        (process.env.NEXT_PUBLIC_FRONTEND_URL || "") + "/api/backend",


    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.access_token;

        headers.set("Accept", "application/json");
        // headers.set("Content-Type", "application/json");

        console.log("deviceId", globalDeviceId)
        if (globalDeviceId) {
            headers.set("Device_id", globalDeviceId);
        }
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});
