import { Pagination } from "./game";

export interface PageRequestProps {
    id?: string;
    name: string;
    slug: string;
    description: string;
    date?: string;
    content: {
        description: string;
        heading: string;
    }[]
}

export interface PageResponseProps {
    success: boolean,
    data: PageRequestProps;
    message: string;
}


export interface PageListResponse {
    success: boolean,
    data: {
        data: PageRequestProps[];
        pagination: Pagination;
    };
    message: string;
}
export const pageInitialData = {
    name: "",
    slug: "",
    description: "",
    content: [{
        description: "",
        heading: "",
    }]
}