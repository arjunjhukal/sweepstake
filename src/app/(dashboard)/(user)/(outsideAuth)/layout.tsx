import DashboardLayout from '@/components/layouts/DashboardLayout'
import AgeVerificationModal from '@/components/organism/dialog'
import React from 'react'

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            {children}
            <AgeVerificationModal />
        </DashboardLayout>
    )
}
