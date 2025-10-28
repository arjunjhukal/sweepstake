// export interface UserBalance {
//     type?: string;
//     value?: string;
//     providers: {
//         id: number;
//         name: string,
//         provider: string,
//         balance: 0
//     }[]
// }

// export interface UserBalanceResponse {
//     status?: string;
//     message?: string;
//     data: UserBalance[];
// }
export interface ProviderInfo {
    id: number;
    name: string;
    provider: string;
    icon: string; // ✅ added since you’re using coin.icon
    balance: number | string; // ✅ fix type
}

export interface UserBalance {
    type?: string;
    value?: string | number;
    providers: ProviderInfo[]; // ✅ reference the provider type
}

export interface UserBalanceResponse {
    status?: string;
    message?: string;
    data: UserBalance[];
}
