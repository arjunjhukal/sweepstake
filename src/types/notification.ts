import { Pagination } from "./game";

export interface NotificationProps {
    id: string;
    message: string,
    has_read: boolean
    created_at?: string;
}

export interface NotificationResponse {
    success: boolean;
    message: string;
    data: {
        data: NotificationProps[]
        pagination: Pagination
    }
}

export interface ActivityResponse {
    success: boolean;
    message: string;
    data: {
        data: {}[];
        pagination: Pagination;
    }
}