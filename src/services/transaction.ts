import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { DepositListProps, DepositProps, DepositResponseProps, DepositUrlProps } from "@/types/transaction";
import { QueryParams } from "@/types/config";
import { TransactionStatusProps } from "@/components/pages/dashboard/adminDashboard/transaction/TransactionTable";

export const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: baseQuery,
    tagTypes: ["Deposit", "Withdrawl"],
    endpoints: (builder) => ({
        deposit: builder.mutation<DepositResponseProps, DepositProps>({
            query: ({ id, amount, type = "crypto" }) => ({
                url: `/api/payment/${id}`,
                method: "POST",
                body: { amount: amount, type: type }
            }),
            invalidatesTags: ["Deposit"]
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
            providesTags: ['Deposit']
        }),
        withdrawl: builder.mutation<DepositResponseProps, any>({
            query: (body) => ({
                url: `/api/user/withdrawl`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Withdrawl"]
        }),
        getAllWithdrawl: builder.query<DepositListProps, QueryParams>({
            query: ({ search, page, per_page }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (page) params.append('page', page.toString());
                if (per_page) params.append('page_size', per_page.toString());
                const queryString = params.toString();
                return {
                    url: `/api/user/withdrawl${queryString ? `?${queryString}` : ''}`,
                    method: "GET"
                }
            },
            providesTags: ["Withdrawl"]
        }),
        getAllTransaction: builder.query<DepositListProps, QueryParams & { status?: TransactionStatusProps; user_id?: string | number; game_id?: string | number }>({
            query: ({ search, page, per_page, user_id, game_id, status }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (page) params.append('page', page.toString());
                if (per_page) params.append('page_size', per_page.toString());
                if (user_id) params.append('user', user_id.toString());
                if (game_id) params.append('game', game_id.toString());
                if (status) params.append('status', status.toString());
                const queryString = params.toString();
                return {
                    url: `/api/admin/transactions${queryString ? `?${queryString}` : ''}`,
                    method: "GET"
                }
            },
            providesTags: ["Withdrawl", "Deposit"]
        }),
    })
})

export const { useDepositMutation, useGetAllDepositQuery, useWithdrawlMutation, useGetAllWithdrawlQuery, useGetAllTransactionQuery } = transactionApi;