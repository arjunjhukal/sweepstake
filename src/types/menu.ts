export interface MenuRequest {
    pages: string[];
}

export interface MenuResponse {

    data: {
        id?: string;
        name: string;
        slug: string;
        description: string;
    }[];
}