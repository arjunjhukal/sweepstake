import Private from '@/routes/Private'
import ServerPrivate from '@/routes/ServerPrivate'
import React from 'react'

export default function PrivateUserLayout({ children }: { children: React.ReactNode }) {
    return (
        // <ServerPrivate>
        <>
            {children}
        </>
        // </ServerPrivate>
    )
}
