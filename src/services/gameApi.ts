import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GameProps, GameResponseProps, SingleGameResponse } from "@/types/game";
import { GlobalResponse } from "@/types/config";

export const gameApi = createApi({
    reducerPath: "gameApi",
    baseQuery: baseQuery,
    tagTypes: ["games"],
    endpoints: (builder) => ({
        addGame: builder.mutation<GlobalResponse, FormData>({
            query: (body) => ({
                url: "/api/admin/add-game",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["games"]
        }),
        getAllGames: builder.query<GameResponseProps, void>({
            query: () => ({
                url: '/api/admin/games',
                method: 'GET',
            }),
            providesTags: ['games']
        }),
        getGameById: builder.query<SingleGameResponse, { id: string | number }>({
            query: ({ id }) => ({
                url: `/api/admin/game/${id}`,
                method: 'GET',
            }),
        }),
        updateGameById: builder.mutation<SingleGameResponse, { id: string | number, body: FormData }>({
            query: ({ id, body }) => ({
                url: `/api/admin/game/${id}`,
                method: "POST",
                body: body
            })
        }),
        deleteGameById: builder.mutation<GlobalResponse, { id: string | number }>({
            query: ({ id }) => ({
                url: `/api/admin/game/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const { useAddGameMutation, useGetAllGamesQuery, useGetGameByIdQuery, useUpdateGameByIdMutation, useDeleteGameByIdMutation } = gameApi;