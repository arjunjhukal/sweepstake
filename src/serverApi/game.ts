// lib/serverApi.ts
import { GameResponseProps, SingleGameResponse } from "@/types/game";
import { serverBaseQuery } from "./serverBaseQuery";
import { store } from "@/hooks/store";

export async function getAllGames(): Promise<GameResponseProps> {
    // No token required
    return serverBaseQuery<GameResponseProps>("/api/get-games");
}
console.log(store.getState());

export async function getSingleGame(id: string): Promise<SingleGameResponse> {
    return serverBaseQuery<SingleGameResponse>(`/api/game/${id}`, {
        token: store.getState().auth.access_token,
        withAuth: true,
    });
}