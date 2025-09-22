import PageHeader from '@/components/molecules/PageHeader'
import AddPlayerPage from '@/components/pages/dashboard/adminDashboard/players/addPlayerForm'
import React from 'react'

export default function AddPlayer() {
    return (
        <>
            <PageHeader
                title='Add Player'
            />
            <AddPlayerPage />
        </>
    )
}
