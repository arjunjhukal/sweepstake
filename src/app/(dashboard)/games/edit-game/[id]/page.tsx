
import PageHeader from '@/components/molecules/PageHeader'
import AddGameForm from '@/components/pages/dashboard/adminDashboard/games/AddGameForm'
import React from 'react'

export default function EditGame() {

    return (
        <>
            <PageHeader title="Add Game" />
            <AddGameForm />
        </>
    )
}
