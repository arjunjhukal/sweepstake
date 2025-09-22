export interface SiteSettingRequestProps {
    favicon: File | null;
    favicon_url?: string;
    logo: File | null;
    logo_url?: string;
    site_name: string;
    unique_selling_points: UspProps[];
}
export interface SiteSettingResponseProps {
    success: string;
    message: string;
    data: {
        favIcon: string;
        logo: string;
        site_name: string;
        unique_selling_points: {
            title: string;
            description: string;
            icon: string;
        }[]
    }
}

export interface UspProps {
    title: string;
    description: string;
    icon: File | null;
    icon_url?: string;
}

