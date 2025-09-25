"use client";

import ActionGroup from '@/components/molecules/Action';
import TableHeader from '@/components/molecules/TableHeader'
import CustomTable from '@/components/organism/Table';
import { useAppDispatch } from '@/hooks/hook';
import { PATH } from '@/routes/PATH';
import { useDeletePlayerByIdMutation, useGetAllPlayerQuery } from '@/services/playerApi';
import { showToast, ToastVariant } from '@/slice/toastSlice';
import { PlayerItem, PlayerProps } from '@/types/player';
import { formatDateTime } from '@/utils/formatDateTime';
import { getInitials } from '@/utils/getInitials';
import { Box, Checkbox, Pagination } from '@mui/material';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react'

export default function PlayerListing() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, isLoading: loadingPlayer } = useGetAllPlayerQuery({
        page,
        per_page: pageSize,
        search: search || ""
    });

    const filteredData = useMemo(() => data?.data?.data || [], [data]);

    const [deletePlayer, { isLoading: deletingPlayer }] = useDeletePlayerByIdMutation();
    const columns = useMemo<ColumnDef<PlayerItem>[]>(() => [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    indeterminate={
                        table.getIsSomePageRowsSelected() &&
                        !table.getIsAllPageRowsSelected()
                    }
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
            size: 50
        },
        {
            accessorKey: 'id',
            header: '#ID',
            cell: ({ row }) => row.original.id
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const { first_name, last_name, name } = row.original;
                const initials = getInitials(first_name, last_name);

                return (
                    <Box className="flex justify-start items-center gap-2">
                        <small className="text-[10px] w-[24px] h-[24px] flex items-center justify-center uppercase rounded-[4px] bg-[#1EB41B]/10 font-[500] text-[#1EB41B]">
                            {initials}
                        </small>
                        <div className="name-detail">
                            <strong className="text-primary block text-[12px] leading-[120%] font-[500] capitalize">
                                {first_name} {last_name}
                            </strong>
                            <small className="text-[10px] text-para-light font-[500]">{name}</small>
                        </div>
                    </Box>
                );
            },
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: ({ row }) => (
                <span className="text-[12px] font-[500]">{row.original.email}</span>
            )
        },
        {
            accessorKey: 'registeredDate',
            header: 'Registered Date',
            cell: ({ row }) => {
                const { date, time } = formatDateTime(row.original.registered_date as string);
                return (
                    <Box>
                        <span className="text-[12px] font-[500] block">{date}</span>
                        <small className="text-[10px] text-para-light font-[500]">[{time}]</small>
                    </Box>

                )
            }
        },
        {
            accessorKey: 'currentCredit',
            header: 'Current Credit',
            cell: ({ row }) => (
                <span className="text-[12px] font-[500]">{row.original.current_credit || "$0"}</span>
            )
        },
        {
            accessorKey: 'totalWithdrawn',
            header: 'Total Withdrawn',
            cell: ({ row }) => (
                <span className="text-[12px] font-[500]">{row.original.total_withdrawl || "$0"}</span>
            )
        },
        {
            id: 'action',
            header: 'Action',
            cell: ({ row }) => (
                <ActionGroup
                    onView={`${PATH.ADMIN.PLAYERS.ROOT}/${row.original.id}`}
                    onEdit={`${PATH.ADMIN.PLAYERS.EDIT_PLAYER.ROOT}/${row.original.id}`}
                    onDelete={async () => {
                        const response = await deletePlayer({ id: row.original.id }).unwrap();
                        dispatch(
                            showToast({
                                message: response.message,
                                variant: ToastVariant.SUCCESS
                            })
                        )
                    }}
                />
            ),
        },
    ], []);
    const table = useReactTable({
        data: filteredData || [],
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <section className="player__listing_root">
            <div className="border-gray border-solid border-[1px] rounded-[8px] lg:rounded-[16px]">

                <TableHeader
                    search={search}
                    setSearch={setSearch}
                    onDownloadCSV={() => { }}
                />
                <CustomTable
                    table={table}
                    loading={loadingPlayer}
                />
                <div className="flex justify-between items-center mt-4 px-8 py-6">
                    <div>
                        <span>Row per page:</span>
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="ml-2 border border-gray-300 rounded p-1"
                        >
                            {[5, 10, 15, 20].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Pagination count={data?.data?.pagination?.total_pages || 1}
                        page={page}
                        onChange={(_, value) => setPage(value)} variant="outlined" shape="rounded" sx={{ gap: "8px" }} />
                </div>
            </div>
        </section>
    )
}
