"use client";

import PageHeader from '@/components/molecules/PageHeader'
import AddGameForm from '@/components/pages/dashboard/adminDashboard/games/AddGameForm'
import { useParams } from 'next/navigation';
import React from 'react'

export default function EditGame() {

    const params = useParams();
    const id = params?.id as string;
    return (
        <>
            <PageHeader title="Add Game" />
            <AddGameForm id={id} />
        </>
    )
}
