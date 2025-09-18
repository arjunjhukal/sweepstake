import PageHeader from '@/components/molecules/PageHeader'
import PlayerListing from '@/components/pages/dashboard/adminDashboard/players'
import { PATH } from '@/routes/PATH'
import React from 'react'

export default function Players() {
    return (
        <>
            <PageHeader
                title='Players'
                cta={{ url: PATH.ADMIN.PLAYERS.ADD_PLAYER.ROOT, label: "Add New Player" }}
            />
            <PlayerListing />
        </>
    )
}
