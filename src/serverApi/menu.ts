import { MenuResponse } from "@/types/menu";
import { serverBaseQuery } from "./serverBaseQuery";

export async function getAllMenus(): Promise<MenuResponse> {
    return serverBaseQuery("/api/general/menus");
}