import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GlobalResponse } from "@/types/config";
import { BannerResponseProps, SiteSettingResponseProps } from "@/types/setting";

export const settingApi = createApi({
    reducerPath: "settingApi",
    baseQuery: baseQuery,
    tagTypes: ['settings', 'banners'],
    endpoints: (builder) => ({
        updateSetting: builder.mutation<GlobalResponse, FormData>({
            query: (body) => ({
                url: "/api/admin/settings",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ['settings']
        }),
        getSettings: builder.query<SiteSettingResponseProps, void>({
            query: () => ({
                url: "/api/admin/settings",
                method: "GET",
            }),
            providesTags: ['settings']
        }),
        updateBanner: builder.mutation<GlobalResponse, FormData>({
            query: (body) => ({
                url: "/api/admin/setting/banner",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ['banners']
        }),
        getAllBanner: builder.query<BannerResponseProps, void>({
            query: () => ({
                url: "/api/admin/setting/banner",
                method: "GET",
            }),
            providesTags: ['banners']
        }),

    })
})

export const { useUpdateSettingMutation, useGetSettingsQuery, useUpdateBannerMutation, useGetAllBannerQuery } = settingApi;