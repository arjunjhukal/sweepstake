"use client";

import PageHeader from '@/components/molecules/PageHeader'
import AddPlayerForm from '@/components/pages/dashboard/adminDashboard/players/addPlayerForm';
import { useParams } from 'next/navigation';
import React from 'react'

export default function SinglePlayer() {
    const params = useParams();
    const id = params?.id as string;
    return (
        <>
            <PageHeader />
            <AddPlayerForm id={id} />
        </>
    )
}
