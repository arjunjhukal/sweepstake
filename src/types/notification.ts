import { Pagination } from "./game";

export interface NotificationProps {
    id: string;
    message: string,
    has_read: boolean
}

export interface NotificationResponse {
    success: boolean;
    message: string;
    data: {
        data: NotificationProps[]
        pagination: Pagination
    }
}