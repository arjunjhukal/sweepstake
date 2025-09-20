import { GameResponseProps, SingleGameResponse } from "@/types/game";
import { serverBaseQuery } from "./serverBaseQuery";
import { cookies } from "next/headers";

export async function getAllGames(): Promise<GameResponseProps> {
    return serverBaseQuery("/api/get-games");
}

export async function getSingleGame(id: string): Promise<SingleGameResponse> {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;

    console.log(access_token);
    return serverBaseQuery(`/api/game/${id}`, {
        token: access_token,
        withAuth: true,
    });
}