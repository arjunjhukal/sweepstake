import { CredentialsResponseProps, GameResponseProps, SingleGameResponse } from "@/types/game";
import { cookies } from "next/headers";
import { serverBaseQuery } from "./serverBaseQuery";

export async function getAllGames(): Promise<GameResponseProps> {
    return serverBaseQuery("/api/get-games");
}
export async function getSubGames(): Promise<any> {
    return serverBaseQuery("/api/general/home/sub-games");
}
export async function pageSEO(): Promise<any> {
    return serverBaseQuery("/api/general/home/seo");
}
export async function getSupportEmail(): Promise<any> {
    return serverBaseQuery("/api/general/supports");
}
export async function getUsp(): Promise<any> {
    return serverBaseQuery("/api/general/home/usp");
}

export async function getSingleGame(id: string): Promise<SingleGameResponse> {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;

    return serverBaseQuery(`/api/game/${id}`, {
        token: access_token,
        withAuth: true,
    });
}

export async function getUserGameCredentials(): Promise<CredentialsResponseProps> {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;

    return serverBaseQuery<CredentialsResponseProps>(`/api/credentials`, {
        token: access_token,
        withAuth: true,
    });
}

export async function getUserGameBalance(): Promise<CredentialsResponseProps> {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;

    return serverBaseQuery<CredentialsResponseProps>(`/api/detail/get-balance`, {
        token: access_token,
        withAuth: true,
    });
}