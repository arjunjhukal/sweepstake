import { ImageProps } from "./config";

export interface PlayerProps {
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
    profile_image: File | null;
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

export interface PlayerItem extends PlayerProps {
    id: string | number
}

export interface PlayerResponseProps {
    data: PlayerItem;
    message: string;
    status: string;
}