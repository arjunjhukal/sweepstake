export interface GameProps {
    name: string;
    category?: string;
    description: string;
    thumbnail?: File | null;
    screenshots?: File | File[] | null;
    subgames?: File | File[] | null;
    api: string;
    provider: string;
    profit?: string;
}

export interface GameItem extends GameProps {
    id: number;
    activePlayers?: string | number
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
}

export interface GameResponseProps {
    data: {
        data: GameItem[];
        pagination: Pagination;
    }
    message: string;
    success: boolean;
}

// ✅ Initial Values for Formik
export const gameInitialValues: GameProps = {
    name: "",
    category: "",
    description: "",
    thumbnail: null,
    screenshots: [],
    subgames: [],
    api: "",
    provider: "",
    profit: "",
};
