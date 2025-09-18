import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { PlayerListResponse, PlayerProps, SinlgePlayerResponseProps, } from "@/types/player";
import { GlobalResponse } from "@/types/config";

export const playerApi = createApi({
    reducerPath: "playerApi",
    baseQuery: baseQuery,
    tagTypes: ["players"],
    endpoints: (builder) => ({
        createPlayer: builder.mutation<PlayerListResponse, FormData>({
            query: (body) => ({
                url: "/api/admin/add-user",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["players"]
        }),
        getAllPlayer: builder.query<PlayerListResponse, void>({
            query: () => ({
                url: "/api/admin/get-users",
                method: "GET"
            }),
            providesTags: ['players']
        }),
        getPlayerById: builder.query<SinlgePlayerResponseProps, { id: number }>({
            query: ({ id }) => ({
                url: `/api/admin/get-user/${id}`,
                method: "GET"
            }),
            providesTags: ['players']
        }),
        getPlayerBalanceById: builder.query<SinlgePlayerResponseProps, { id: number }>({
            query: ({ id }) => ({
                url: `/api/admin/get-balance/${id}`,
                method: "GET"
            }),
            providesTags: ['players']
        }),
        updatePlayerById: builder.mutation<SinlgePlayerResponseProps, { id: number, data: FormData }>({
            query: ({ id, data }) => ({
                url: `/api/admin/update-user/${id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["players"]
        }),
        deletePlayerById: builder.mutation<GlobalResponse, { id: string }>({
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