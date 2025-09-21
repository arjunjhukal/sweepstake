"use client";
import CustomTable from '@/components/organism/Table';
import { useGetAllDepositQuery } from '@/services/transaction';
import { SingleDepositProps } from '@/types/transaction';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react'

export default function WithdrawnHistoryPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading } = useGetAllDepositQuery({
        page,
        per_page: pageSize
    });
    const columns: ColumnDef<SingleDepositProps>[] = [
        {
            accessorKey: 'id',
            header: "ID",
            cell: ({ row }) => row.original.transaction_id
        },
        {
            accessorKey: 'transaction_date',
            header: "Date",
        },
        {
            accessorKey: 'amount',
            header: "Amount",
        },
        {
            accessorKey: 'game_name',
            header: "Game",
        },
        {
            accessorKey: 'available_balance',
            header: "Available Balance",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status.toLowerCase();
                const display = status.charAt(0).toUpperCase() + status.slice(1);

                return (
                    <span className={`px-2 py-1 inline-block lg:text-[10px] text-white status rounded-[8px] ${status}`} >
                        {display}
                    </span>
                );
            },
        }
    ]

    const table = useReactTable({
        data: data?.data?.data || [],
        // data: dummyDeposits,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

    })
    return (
        <CustomTable table={table} loading={isLoading} emptyMessage="You haven't deposite yet!" />
    )
}
