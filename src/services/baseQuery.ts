// src/services/baseQuery.ts
import { RootState } from "@/hooks/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
    // Use your Next.js frontend URL + proxy path
    // Example: https://sweepstake.webjuwa.com/api/backend OR localhost:3000/api/backend
    baseUrl:
        (process.env.NEXT_PUBLIC_FRONTEND_URL || "") + "/api/backend",

    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.access_token;

        headers.set("Accept", "application/json");
        // headers.set("Content-Type", "application/json");

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});
