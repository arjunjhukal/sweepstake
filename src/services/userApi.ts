import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { SinlgePlayerResponseProps, WalletProps } from "@/types/player";
import { UserBalance, UserBalanceResponse } from "@/types/user";
import { getUserGameBalance } from "@/serverApi/game";
import { CredentialsResponseProps } from "@/types/game";

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
            }),
            providesTags: ['user']
        }),
        getUserBalanceBySlug: builder.query<{ data: { provider: string; balance: number, flag: string } }, { slug: string }>({
            query: ({ slug }) => ({
                url: `/api/balance/${slug}`,
                method: "GET"
            }),
            providesTags: ['user']
        }),
        getUserGameBalance: builder.query<SinlgePlayerResponseProps, void>({
            query: () => ({
                url: "/api/detail/get-balance",
                method: "GET"
            })
        }),
        getUserGameCredentials: builder.query<CredentialsResponseProps, void>({
            query: () => ({
                url: `/api/credentials`,
                method: "GET"
            })
        }),
    })

})

export const { useAddUserWalletMutation, useUpdateUserProfileMutation, useGetUserBalanceQuery, useGetUserBalanceBySlugQuery, useGetUserGameBalanceQuery, useGetUserGameCredentialsQuery } = userApi;