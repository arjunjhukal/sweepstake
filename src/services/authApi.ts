import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { LoginProps, LoginResponse, RegisterProps } from "@/types/auth";
import { GlobalResponse } from "@/types/config";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        registerUser: builder.mutation<{ success: boolean, data: LoginResponse | null, message: string }, RegisterProps>({
            query: ({ email,
                username,
                password,
                password_confirmation, first_name, middle_name, last_name, phone, photoid_number, dob, city, pob }) => ({
                    url: `/api/auth/register`,
                    method: "POST",
                    body: {
                        email,
                        username,
                        password,
                        password_confirmation, first_name, middle_name, last_name, phone, photoid_number, dob, city, pob
                    },
                }),

        }),
        login: builder.mutation<LoginResponse, LoginProps>({
            query: ({ email, password }) => ({
                url: `/api/auth/login`,
                method: "POST",
                body: { email, password },
            })
        }),
        sendVerificationLinkAgain: builder.mutation<LoginResponse, { email: string }>({
            query: ({ email }) => ({
                url: `/api/email/resend`,
                method: "POST",
                body: { email },
            })
        }),
        verifyEmail: builder.mutation<GlobalResponse, { id: string; hash: string }>({
            query: ({ id, hash }) => ({
                url: "/api/auth/verify-email",
                method: "POST",
                body: { id, hash },
            })
        }),
        forgotPassword: builder.mutation<GlobalResponse, { email: string }>({
            query: ({ email }) => ({
                url: "/api/forgot-password/send",
                method: "POST",
                body: { email },
            })
        }),
        verifyOTP: builder.mutation<GlobalResponse, { email: string; otp: string }>({
            query: ({ email, otp }) => ({
                url: "/api/forgot-password/send",
                method: "POST",
                body: { email, otp },
            })
        }),
        resetPassword: builder.mutation<GlobalResponse, { email: string, password: string, password_confirmation: string }>({
            query: ({ email,
                password,
                password_confirmation }) => ({
                    url: `/api/forgot-password/reset`,
                    method: "POST",
                    body: {
                        email,
                        password,
                        password_confirmation
                    },
                })
        }),
    })
})

export const { useLoginMutation, useRegisterUserMutation, useSendVerificationLinkAgainMutation, useForgotPasswordMutation, useVerifyOTPMutation, useResetPasswordMutation, useVerifyEmailMutation } = authApi;