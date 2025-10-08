import AddNotificationForm from '@/components/pages/dashboard/adminDashboard/notifications/addNotification'
import React from 'react'

export default async function EditNotification(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    return (
        <AddNotificationForm id={id} />
    )
}
