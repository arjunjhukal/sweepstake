import DashboardLayout from '@/components/layouts/DashboardLayout'
import Private from '@/routes/Private'
import React from 'react'

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Private>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </Private>
    )
}
