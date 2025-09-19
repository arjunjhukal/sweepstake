import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { PlayerListResponse, PlayerProps, SinlgePlayerResponseProps, } from "@/types/player";
import { GlobalResponse, QueryParams } from "@/types/config";

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
        getAllPlayer: builder.query<PlayerListResponse, QueryParams>({

            query: ({ search, page, per_page }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (page) params.append('page', page.toString());
                if (per_page) params.append('page_size', per_page.toString());
                const queryString = params.toString();
                return {
                    url: `/api/admin/get-users${queryString ? `?${queryString}` : ''}`,
                    method: "GET"
                }
            },
            providesTags: ['players']
        }),
        getPlayerById: builder.query<SinlgePlayerResponseProps, { id: number }>({
            query: ({ id }) => ({
                url: `/api/admin/get-user/${id}`,
                method: "GET"
            }),
            providesTags: ['players']
        }),
        getPlayerBalanceById: builder.query<SinlgePlayerResponseProps, { id: string }>({
            query: ({ id }) => ({
                url: `/api/admin/get-balance/${id}`,
                method: "GET"
            }),
            providesTags: ['players']
        }),
        updatePlayerById: builder.mutation<SinlgePlayerResponseProps, { id: string, body: FormData }>({
            query: ({ id, body }) => ({
                url: `/api/admin/update-user/${id}`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ["players"]
        }),
        deletePlayerById: builder.mutation<GlobalResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/api/admin/user/${id}`,
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