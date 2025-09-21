import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { DepositListProps, DepositProps, DepositUrlProps } from "@/types/transaction";
import { QueryParams } from "@/types/config";

export const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: baseQuery,
    tagTypes: ["transaction"],
    endpoints: (builder) => ({
        deposit: builder.mutation<DepositUrlProps, DepositProps>({
            query: ({ gameId, amount }) => ({
                url: `/api/payment/${gameId}`,
                method: "POST",
                body: amount
            }),
            invalidatesTags: ["transaction"]
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
            providesTags: ['transaction']
        })
    })

})

export const { useDepositMutation, useGetAllDepositQuery } = transactionApi;