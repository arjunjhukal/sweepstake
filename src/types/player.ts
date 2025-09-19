import { ImageProps } from "./config";
import { Pagination } from "./game";


export interface CommonPlayerProps {
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    wallet_address?: string;
    address?: string;
    city?: string;
    phone?: string;
    password: string;
    password_confirmation: string;
}
export interface PlayerProps extends CommonPlayerProps {
    profile_image: File | null;
    profile_image_file?: string;
}

export const initialPlayerValues: PlayerProps = {
    name: "",
    email: "",
    first_name: "",
    last_name: "",
    wallet_address: "",
    address: "",
    city: "",
    phone: "",
    password: "",
    password_confirmation: "",
    profile_image: null,
};

export interface PlayerItem extends CommonPlayerProps {
    id: string;
    registered_date: string | Date;
    current_credit?: string,
    total_withdrawl?: string,
    total_deposited?: string
    profile_image_file?: string;
}

export interface PlayerListResponse {
    data: {
        data: PlayerItem[];
        pagination: Pagination;
    }
    message: string;
    status: string;
}
export interface SinlgePlayerResponseProps {
    data: PlayerItem;
    message: string;
    status: string;
}