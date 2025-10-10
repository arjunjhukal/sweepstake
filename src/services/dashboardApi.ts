import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { AdminTrasactionResponse, AnalyticsResponse } from "@/types/dashboard";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: baseQuery,
    tagTypes: ["Analytics", "Transactions"],
    endpoints: (builder) => ({
        getAnalytics: builder.query<AnalyticsResponse, { type: string }>({
            query: ({ type }) => ({
                url: `/api/admin/dashboard/overview?type=${type}`,
                method: "GET",
            }),
            providesTags: ["Analytics"],
        }),
        getAdminTransactions: builder.query<AdminTrasactionResponse, void>({
            query: () => ({
                url: `/api/admin/dashboard/deposits`,
                method: "GET",
            }),
            providesTags: ["Transactions"],
        })
    })
})

export const { useGetAnalyticsQuery, useGetAdminTransactionsQuery } = dashboardApi;