"use client"
import TransactionTable from '@/components/pages/dashboard/adminDashboard/transaction/TransactionTable';
import { useAppSelector } from '@/hooks/hook'
import React from 'react'

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = React.useState("");
    const user = useAppSelector(state => state.auth.user);
    if (user?.role && user.role.toUpperCase() === "ADMIN") {
        return <>
            <h1 className="text-[24px] leading-[120%] mb-6">Dashboard</h1>
            <TransactionTable search={search} />
        </>
    }
    return (
        <div>{children}</div>
    )
}
