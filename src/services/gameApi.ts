import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GameProps, GameResponseProps } from "@/types/game";
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
        getGameById: builder.query<GameProps[], { id: number | string }>({
            query: ({ id }) => ({
                url: `/api/admin/games/${id}`,
                method: 'GET',
            }),
        }),
        updateGameById: builder.mutation<GameProps[], { id: number }>({
            query: ({ id }) => ({
                url: `/api/admin/games/${id}`,
                method: "POST"
            })
        }),
        deleteGameById: builder.mutation<GlobalResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/api/admin/games/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const { useAddGameMutation, useGetAllGamesQuery, useLazyGetGameByIdQuery, useUpdateGameByIdMutation, useDeleteGameByIdMutation } = gameApi;