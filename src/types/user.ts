export interface UserBalance {
    type?: string;
    value?: string;
    providers: {
        id: number;
        name: string,
        provider: string,
        balance: 0
    }[]
}

export interface UserBalanceResponse {
    status?: string;
    message?: string;
    data: UserBalance[];
}