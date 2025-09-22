import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GlobalResponse } from "@/types/config";
import { SiteSettingResponseProps } from "@/types/setting";

export const settingApi = createApi({
    reducerPath: "settingApi",
    baseQuery: baseQuery,
    tagTypes: ['settings'],
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
        })
    })
})

export const { useUpdateSettingMutation, useGetSettingsQuery } = settingApi;