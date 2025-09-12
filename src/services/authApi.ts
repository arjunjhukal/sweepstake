import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { LoginProps, LoginResponse, RegisterProps } from "@/types/auth";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        registerUser: builder.mutation<{ success: boolean, data: LoginResponse | null, message: string }, RegisterProps>({
            query: ({ email,
                username,
                password,
                password_confirmation }) => ({
                    url: `/api/auth/register/`,
                    method: "POST",
                    body: {
                        email,
                        username,
                        password,
                        password_confirmation
                    },
                })
        }),
        login: builder.mutation<LoginResponse, LoginProps>({
            query: ({ email, password }) => ({
                url: `/api/auth/login/`,
                method: "POST",
                body: { email, password },
            })
        })
    })
})

export const { useLoginMutation, useRegisterUserMutation } = authApi;