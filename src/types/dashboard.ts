export type AnalyticsProps = {
    name: string,
    start_date: string,
    end_date: string,
    current: number,
    previous: number,
    percent: number,
    profit: boolean,
    message: string,
    breakdown: number[]
}
export interface AnalyticsResponse {
    data: {
        total_deposits: AnalyticsProps,
        total_transactions: AnalyticsProps,
        total_users: AnalyticsProps,
        total_withdraw: AnalyticsProps,
    }
}

export interface AdminTrasactionResponse {
    data: {
        label: string,
        data: number
    }[],
}