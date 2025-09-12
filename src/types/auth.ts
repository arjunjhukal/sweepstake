export type RoleProps = "SUPER_ADMIN" | "ADMIN" | "USER"

export type LoginProps = {
    email: string;
    password: string;
}

export interface User {
    id: number | string,
    name: string,
    email: string,
    first_name: string,
    last_name: string,
    profile_image: string,
    wallet_address: string,
    address: string,
    city: string
    role: RoleProps,
}

export interface LoginResponse {
    success: boolean;
    data: {
        access_token: string,
        // expires_in: 3600,
        user: User,
    }
    message: string
}
export interface RegisterProps extends LoginProps {
    username: string;
    password_confirmation: string;
}