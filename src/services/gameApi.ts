import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GameItem, GameProps, GameResponseProps, SingleGameResponse } from "@/types/game";
import { GlobalResponse } from "@/types/config";

export const gameApi = createApi({
    reducerPath: "gameApi",
    baseQuery: baseQuery,
    tagTypes: ["Games"],
    endpoints: (builder) => ({
        // ➕ Add a new game
        addGame: builder.mutation<GlobalResponse, FormData>({
            query: (body) => ({
                url: "/api/admin/add-game",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Games", id: "LIST" }],
        }),

        // 📋 Fetch all games
        getAllGames: builder.query<GameResponseProps, void>({
            query: () => ({
                url: "/api/admin/games",
                method: "GET",
            }),
            providesTags: (result) =>
                result?.data?.data
                    ? [
                        { type: "Games", id: "LIST" },
                        ...result.data.data.map((game: GameItem) => ({
                            type: "Games" as const,
                            id: game.id,
                        })),
                    ]
                    : [{ type: "Games", id: "LIST" }],
        }),

        // 🎮 Get single game by ID
        getGameById: builder.query<SingleGameResponse, { id: string | number }>({
            query: ({ id }) => ({
                url: `/api/admin/game/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, { id }) => [{ type: "Games", id }],
        }),

        // ✏️ Update game by ID
        updateGameById: builder.mutation<
            SingleGameResponse,
            { id: string | number; body: FormData }
        >({
            query: ({ id, body }) => ({
                url: `/api/admin/game/${id}`,
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Games", id },
                { type: "Games", id: "LIST" },
            ],
        }),

        // ❌ Delete game by ID
        deleteGameById: builder.mutation<GlobalResponse, { id: string | number }>({
            query: ({ id }) => ({
                url: `/api/admin/game/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Games", id },
                { type: "Games", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useAddGameMutation,
    useGetAllGamesQuery,
    useGetGameByIdQuery,
    useUpdateGameByIdMutation,
    useDeleteGameByIdMutation,
} = gameApi;
