export interface pageRequestProps {
    name: string;
    slug: string;
    description: string;
    content: {
        description: string;
        heading: string;
    }[]
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