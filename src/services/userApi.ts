import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { SinlgePlayerResponseProps, WalletProps } from "@/types/player";
import { UserBalance, UserBalanceResponse } from "@/types/user";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQuery,
    tagTypes: ['user', 'wallet'],
    endpoints: (builder) => ({
        addUserWallet: builder.mutation<SinlgePlayerResponseProps, WalletProps>({
            query: (body) => ({
                url: "/api/connect-wallet",
                method: "POST",
                body: body
            }),
            invalidatesTags: ['wallet']
        }),
        updateUserProfile: builder.mutation<SinlgePlayerResponseProps, { id: string, body: FormData }>({
            query: ({ id, body }) => ({
                url: `/api/update/user-information/${id}`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ['user', "wallet"]
        }),
        getUserBalance: builder.query<UserBalanceResponse, void>({
            query: () => ({
                url: "/api/get-balance",
                method: "GET"
            })
        })
    })

})

export const { useAddUserWalletMutation, useUpdateUserProfileMutation, useGetUserBalanceQuery } = userApi;