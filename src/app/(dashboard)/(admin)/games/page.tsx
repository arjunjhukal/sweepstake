"use client";

import PageHeader from '@/components/molecules/PageHeader'
import AdminGameList from '@/components/pages/dashboard/adminDashboard/games'
import { PATH } from '@/routes/PATH'
import React from 'react'

export default function AdminGames() {
    return (
        <div className="admin__game__root">
            <PageHeader title="Games" cta={{ label: "Add New Game", url: PATH.ADMIN.GAMES.ADD_GAME.ROOT }} />
            <AdminGameList />
        </div>
    )
}
