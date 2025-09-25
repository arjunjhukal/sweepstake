import { PageRequestProps, PageResponseProps } from "@/types/page";
import { cookies } from "next/headers";
import { serverBaseQuery } from "./serverBaseQuery";

export async function getPageDetail(slug: string): Promise<PageResponseProps | undefined> {
    return serverBaseQuery(`/api/general/page/${slug}`);
}
