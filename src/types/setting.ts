export interface SiteSettingRequestProps {
    favicon: File | null;
    favicon_url?: string;
    logo: File | null;
    logo_url?: string;
    site_name: string;
    unique_selling_points: UspProps[];
}

export const SiteInitialRequest = {
    favicon: null,
    logo: null,
    site_name: "",
    unique_selling_points: [
        {
            title: "",
            description: "",
            icon: null,
            icon_url: ""
        },
    ],
}
export interface SiteSettingResponseProps {
    success: string;
    message: string;
    data: {
        favicon: string;
        logo: string;
        site_name: string;
        unique_selling_points: {
            title: string;
            description: string;
            icon: string;
            icon_url?: string;
        }[];
    }
}

export interface UspProps {
    title: string;
    description: string;
    icon: File | null;
    icon_url?: string;
}

export interface BannerProps {
    name: string;
    description: string;
    cta_link: string;
    image?: File | null;
    image_url?: string | null;
    type: boolean /** TYPE TRUE REPRESENT SUB BANNER */
}

export interface BannerResponseProps {
    message: string;
    success: boolean;
    data: BannerProps[];
}