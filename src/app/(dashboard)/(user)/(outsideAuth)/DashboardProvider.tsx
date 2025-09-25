"use client"
import { useAppSelector } from '@/hooks/hook'
import React from 'react'

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
    const user = useAppSelector(state => state.auth.user);
    if (user?.role && user.role.toUpperCase() === "ADMIN") {
        return <>
            <h1>Admin Dashboard</h1>
        </>
    }
    return (
        <div>{children}</div>
    )
}
