import { PageRequestProps, PageResponseProps } from "@/types/page";
import { cookies } from "next/headers";
import { serverBaseQuery } from "./serverBaseQuery";
import { BannerResponseProps } from "@/types/setting";

export async function getPageDetail(slug: string): Promise<PageResponseProps | undefined> {
    return serverBaseQuery(`/api/general/page/${slug}`);
}

export async function getBanners(): Promise<BannerResponseProps> {
    return serverBaseQuery(`/api/general/home/banner`)
}
export async function getSubBanners(): Promise<BannerResponseProps> {
    return serverBaseQuery(`/api/general/home/banner?type=true`)
}