import AddPlayerPage from '@/components/pages/dashboard/adminDashboard/players/addPlayerForm';
import AddPlayerForm from '@/components/pages/dashboard/adminDashboard/players/addPlayerForm/AddPlayerForm';
import EditUserProfile from '@/components/pages/dashboard/userDashboard/account/profile/editProfile';
import React from 'react'

export default async function UserAccountUpdate(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    return (
        <EditUserProfile id={id} />
    )
}
