import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { DepositListProps, DepositProps, DepositResponseProps, DepositUrlProps } from "@/types/transaction";
import { QueryParams } from "@/types/config";

export const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: baseQuery,
    tagTypes: ["deposit", "withdrawl"],
    endpoints: (builder) => ({
        deposit: builder.mutation<DepositResponseProps, DepositProps>({
            query: ({ id, amount, type = "crypto" }) => ({
                url: `/api/payment/${id}`,
                method: "POST",
                body: { amount: amount, type: type }
            }),
            invalidatesTags: ["deposit"]
        }),
        getAllDeposit: builder.query<DepositListProps, QueryParams>({
            query: ({ search, page, per_page }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (page) params.append('page', page.toString());
                if (per_page) params.append('page_size', per_page.toString());
                const queryString = params.toString();
                return {
                    url: `/api/deposits${queryString ? `?${queryString}` : ''}`,
                    method: "GET"
                }
            },
            providesTags: ['deposit']
        }),
        withdrawl: builder.mutation<DepositResponseProps, any>({
            query: (body) => ({
                url: `/api/user/withdrawl`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ["withdrawl"]
        }),
        getAllWithdrawl: builder.query<DepositListProps, QueryParams>({
            query: ({ search, page, per_page }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (page) params.append('page', page.toString());
                if (per_page) params.append('page_size', per_page.toString());
                const queryString = params.toString();
                return {
                    url: `/api//user/withdrawl${queryString ? `?${queryString}` : ''}`,
                    method: "GET"
                }
            },
            providesTags: ["withdrawl"]
        }),
    })
})

export const { useDepositMutation, useGetAllDepositQuery, useWithdrawlMutation, useGetAllWithdrawlQuery } = transactionApi;