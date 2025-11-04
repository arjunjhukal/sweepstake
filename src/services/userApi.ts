import { GlobalResponse } from "@/types/config";
import { CredentialsResponseProps } from "@/types/game";
import { SinlgePlayerResponseProps, WalletProps } from "@/types/player";
import { UserBalanceResponse } from "@/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

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
            }),
            providesTags: ['user']
        }),
        getUserGameCredentials: builder.query<CredentialsResponseProps, void>({
            query: () => ({
                url: `/api/credentials`,
                method: "GET"
            }),
            providesTags: ['user']
        }),
        changeUserGamePassword: builder.mutation<GlobalResponse, { password: string; confirm_password: string, name: string }>({
            query: ({ password, confirm_password, name }) => ({
                url: `/api/change-password?for=${name}`,
                method: "POST",
                body: {
                    password,
                    password_confirmation: confirm_password
                }
            }),
            invalidatesTags: ['user', "wallet"],
        })
    })

})

export const { useAddUserWalletMutation, useUpdateUserProfileMutation, useGetUserBalanceQuery, useGetUserBalanceBySlugQuery, useGetUserGameBalanceQuery, useGetUserGameCredentialsQuery, useChangeUserGamePasswordMutation } = userApi;