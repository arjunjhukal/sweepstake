import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GlobalResponse } from "@/types/config";
import { MenuResponse } from "@/types/menu";

export const menuApi = createApi({
    reducerPath: "menuApi",
    baseQuery: baseQuery,
    tagTypes: ['Menus'],
    endpoints: (builder) => ({
        createMenu: builder.mutation<GlobalResponse, { pages: string[] }>({
            query: (body) => ({
                url: "/api/admin/menu",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Menus"]
        }),
        getAllMenu: builder.query<MenuResponse, void>({
            query: () => ({
                url: "/api/admin/menu",
                method: "GET"
            })
            , providesTags: ["Menus"]
        }),
    })
})

export const { useCreateMenuMutation, useGetAllMenuQuery } = menuApi;

const basePublicQuery = fetchBaseQuery({
    baseUrl:
        (process.env.NEXT_PUBLIC_FRONTEND_URL || "") + "/api/backend",
    credentials: "include",
    prepareHeaders: (headers) => {
        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");

        return headers;
    },
});

export const userMenuApi = createApi({
    reducerPath: "userMenuApi",
    baseQuery: basePublicQuery,
    tagTypes: ['Menus'],
    endpoints: (builder) => ({
        getAllUserMenu: builder.query<MenuResponse, void>({
            query: () => ({
                url: "api/general/menus",
                method: "GET"
            })
        }),
        getSeoData: builder.query<any, void>({
            query: () => ({
                url: "/api/general/home/seo",
                method: "GET"
            })
        })
    })
})

export const { useGetAllUserMenuQuery, useGetSeoDataQuery } = userMenuApi;