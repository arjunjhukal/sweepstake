import { Pagination } from "./game";

type TransactionStatus = "SUCCESS" | "UNSUCCESSFUL" | "PENDING";

export interface DepositProps {
    gameId: string;
    amount: number;
}

export interface DepositUrlProps {
    payment_id: string;
    status: string;
    amount: number;
    currency: string;
    payment_url: string;
}

export interface SingleDepositProps {
    id: number;
    transaction_id: string;
    username: string;
    first_name: string;
    last_name: string;
    method: string;
    game_name: string;
    type: string;
    amount: number;
    sweepcoins: number;
    transaction_date: string;
    available_balance?: string;
    status: TransactionStatus;
}

export interface DepositListProps {
    data: {
        data: SingleDepositProps[];
        pagination: Pagination;
    }
    success: boolean;
    message: string;
}