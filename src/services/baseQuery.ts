import { RootState } from "@/hooks/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).auth.access_token;

        // headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }


        return headers;
    },
});
