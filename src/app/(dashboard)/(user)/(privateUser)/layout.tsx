import Private from '@/routes/Private'
import React from 'react'

export default function PrivateUserLayout({ children }: { children: React.ReactNode }) {
    return (
        <Private>
            {children}
        </Private>
    )
}
