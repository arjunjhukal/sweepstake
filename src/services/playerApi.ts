import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { PlayerProps, PlayerResponseProps } from "@/types/player";
import { GlobalResponse } from "@/types/config";

export const playerApi = createApi({
    reducerPath: "playerApi",
    baseQuery: baseQuery,
    tagTypes: ["players"],
    endpoints: (builder) => ({
        createPlayer: builder.mutation<PlayerResponseProps, FormData>({
            query: (body) => ({
                url: "/api/admin/add-user",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["players"]
        }),
        getAllPlayer: builder.query<PlayerResponseProps[], null>({
            query: () => ({
                url: "/api/admin/get-users",
                method: "GET"
            }),
            providesTags: ['players']
        }),
        getPlayerById: builder.query<PlayerResponseProps, { id: number }>({
            query: ({ id }) => ({
                url: `/api/admin/get-user/${id}`,
                method: "GET"
            }),
            providesTags: ['players']
        }),
        getPlayerBalanceById: builder.query<PlayerResponseProps, { id: number }>({
            query: ({ id }) => ({
                url: `/api/admin/get-balance/${id}`,
                method: "GET"
            }),
            providesTags: ['players']
        }),
        updatePlayerById: builder.mutation<PlayerResponseProps, { id: number, data: FormData }>({
            query: ({ id, data }) => ({
                url: `/api/admin/update-user/${id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["players"]
        }),
        deletePlayerById: builder.mutation<GlobalResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/api/admin/update-user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["players"]
        }),
    })
})

export const {
    useCreatePlayerMutation,
    useGetAllPlayerQuery,
    useGetPlayerByIdQuery,
    useGetPlayerBalanceByIdQuery, useUpdatePlayerByIdMutation,
    useDeletePlayerByIdMutation
} = playerApi;