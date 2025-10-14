"use client"

import PageHeader from '@/components/molecules/PageHeader'
import React from 'react'
import TransactionTable from './TransactionTable'

export default function AllTransactionsPage() {
    const [search, setSearch] = React.useState("");
    return (
        <>
            <PageHeader title='Tranactions' />

            <TransactionTable search={search} setSearch={setSearch} />
        </>
    )
}
