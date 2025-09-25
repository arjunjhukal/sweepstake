export interface PageRequestProps {
    id?: string;
    name: string;
    slug: string;
    description: string;
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

export const pageInitialData = {
    name: "",
    slug: "",
    description: "",
    content: [{
        description: "",
        heading: "",
    }]
}