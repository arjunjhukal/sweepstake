
import EditUserProfile from '@/components/pages/dashboard/userDashboard/account/profile/editProfile';
import React from 'react'

export default async function UserAccountUpdate(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    return (
        <EditUserProfile id={id} />
    )
}
