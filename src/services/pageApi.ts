import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GlobalResponse, QueryParams } from "@/types/config";
import { PageListResponse, PageResponseProps } from "@/types/page";

export const pageApi = createApi({
    reducerPath: "pageApi",
    baseQuery: baseQuery,
    tagTypes: ['pages'],
    endpoints: (builder) => ({
        createPage: builder.mutation<GlobalResponse, FormData>({
            query: (body) => ({
                url: "/api/admin/page/store",
                method: "POST",
                body: body
            })
        }),
        getAllPage: builder.query<PageListResponse, QueryParams>({
            query: (body) => ({
                url: "/api/admin/page/list",
                method: "GET",
            })
        }),
        updatePageById: builder.mutation<GlobalResponse, { id: string, body: FormData }>({
            query: ({ id, body }) => ({
                url: `/api/admin/page/update/${id}`,
                method: "POST",
                body: body
            })
        }),
        deletePageById: builder.mutation<GlobalResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/api/admin/page/delete/${id}`,
                method: "POST",
            })
        })
    })
})

export const {
    useCreatePageMutation,
    useGetAllPageQuery,
    useUpdatePageByIdMutation,
    useDeletePageByIdMutation
} = pageApi;