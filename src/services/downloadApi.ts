import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GlobalResponse } from "@/types/config";

export const downloadApi = createApi({
    reducerPath: "downloadApi",
    baseQuery: baseQuery,
    tagTypes: ["Download"],
    endpoints: (builder) => ({
        downloadTransaction: builder.mutation<GlobalResponse, { user?: string; game?: string }>({
            query: ({ user, game }) => {
                const params = new URLSearchParams();
                if (user) params.append('user', user.toString());
                if (game) params.append('game', game.toString());
                const queryString = params.toString();
                return {
                    url: `/api/admin/download/transactions${queryString ? `?${queryString}` : ''}`,
                    method: "GET",
                }
            }
        })
    })
})

export const { useDownloadTransactionMutation } = downloadApi;