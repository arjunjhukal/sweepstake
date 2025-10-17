import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { ActivityResponse, NotificationResponse } from "@/types/notification";
import { GlobalResponse, QueryParams } from "@/types/config";

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: baseQuery,
    tagTypes: ['Notification', "Activity"],
    endpoints: (builder) => ({
        getAllNotification: builder.query<NotificationResponse, QueryParams>({
            query: ({ search, page, per_page }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (page) params.append('page', page.toString());
                if (per_page) params.append('page_size', per_page.toString());
                const queryString = params.toString();
                return {
                    url: `/api/admin/notifications${queryString ? `?${queryString}` : ''}`,
                    method: "GET"
                }
            },
            providesTags: ["Notification"]
        }),
        readNotification: builder.mutation<GlobalResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/api/admin/notification/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Notification"]
        }),
        readAllNotification: builder.mutation<GlobalResponse, void>({
            query: () => ({
                url: `/api/admin/notification/all`,
                method: "POST",
            }),
            invalidatesTags: ["Notification"]
        }),
        getAllActivity: builder.query<ActivityResponse, { activity_type: string, status?: string } & QueryParams>({
            query: ({ search, page, per_page, activity_type, status }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (page) params.append('page', page.toString());
                if (per_page) params.append('page_size', per_page.toString());
                if (activity_type) params.append('activity_type', activity_type.toString());
                if (status) params.append('status', status.toString());
                const queryString = params.toString();
                return {
                    url: `/api/admin/activity${queryString ? `?${queryString}` : ''}`,
                    method: "GET"
                }
            },
            providesTags: ["Activity"]
        }),
    })
})

export const { useGetAllNotificationQuery, useReadNotificationMutation, useReadAllNotificationMutation, useGetAllActivityQuery } = notificationApi