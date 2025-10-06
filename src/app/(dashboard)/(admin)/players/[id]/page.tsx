import PlayerDetailPage from '@/components/pages/dashboard/adminDashboard/players/playerDetail'
import React from 'react'

export default async function PlayerDetail({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    return (
        <PlayerDetailPage id={id} />
    )
}
