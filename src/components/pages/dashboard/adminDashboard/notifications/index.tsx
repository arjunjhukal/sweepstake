import PageHeader from '@/components/molecules/PageHeader'
import { PATH } from '@/routes/PATH'
import React from 'react'

export default function NotificationPageRoot() {
    return (
        <>
            <PageHeader
                title='Notifications'
                cta={{
                    label: "Add New Notifications",
                    url: PATH.ADMIN.NOTIFICATIONS.ADD_NOTIFICATIONS.ROOT
                }}
            />
        </>
    )
}
