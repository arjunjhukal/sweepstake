import PageHeader from '@/components/molecules/PageHeader'
import React from 'react'
import AddNotificationForm from './AddNotificationForm'

export default function NotificationFormRoot({ id }: { id?: string }) {
    return (
        <>
            <PageHeader
                title='Notifications'
            />
            <AddNotificationForm />
        </>
    )
}
