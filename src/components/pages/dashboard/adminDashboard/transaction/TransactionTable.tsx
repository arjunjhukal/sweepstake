"use client";
import TableHeader from '@/components/molecules/TableHeader';
import CustomTable from '@/components/organism/Table';
import { useGetAllTransactionQuery } from '@/services/transaction';
import { SingleDepositProps } from '@/types/transaction';
import { formatDateTime } from '@/utils/formatDateTime';
import { getInitials } from '@/utils/getInitials';
import { Box, Pagination } from '@mui/material';
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

export default function TransactionTable({ user_id, game_id, search }: { user_id?: string; game_id?: number, search: string }) {

    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const queryArgs = useMemo(
        () => ({
            page,
            per_page: pageSize,
            search: search || "",
            game_id,
            user_id,
        }),
        [page, pageSize, search, game_id, user_id]
    );

    const { data, isLoading: loadingTransaction } = useGetAllTransactionQuery(queryArgs);

    console.log("all transaction", data);
    const tableData = useMemo(() => data?.data?.data || [], [data]);

    const columns = useMemo<ColumnDef<SingleDepositProps>[]>(() => [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Player Name",
            cell: ({ row }) => {
                const { first_name, last_name } = row.original;
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
                            <small className="text-[10px] text-para-light font-[500]">
                                {first_name} {last_name}
                            </small>
                        </div>
                    </Box>
                );
            },
        },
        {
            accessorKey: "method",
            header: "Method",
        },
        {
            accessorKey: "game_name",
            header: "Game Name",
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const status = row.original.status.toLowerCase();
                const display = status.charAt(0).toUpperCase() + status.slice(1);

                return (
                    <span
                        className={`px-2 py-1 max-w-[60px] block lg:text-[10px] text-white status rounded-[8px] text-center ${status}`}
                    >
                        {display}
                    </span>
                );
            },
        },
        {
            accessorKey: "amount",
            header: "Amount USD",
        },
        {
            accessorKey: "sweepcoins",
            header: "Sweepcoins",
        },
        {
            accessorKey: "transaction_date",
            header: "Transaction Date",
            cell: ({ row }) => {
                const { date, time } = formatDateTime(row.original.transaction_date as string);
                return (
                    <Box>
                        <span className="text-[12px] font-[500] block">{date}</span>
                        <small className="text-[10px] text-para-light font-[500]">[{time}]</small>
                    </Box>
                );
            },
        },
    ], []);

    const table = useReactTable({
        data: tableData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        // <div className="border-gray border-solid border-[1px] rounded-[8px] lg:rounded-[16px]">
        //     <TableHeader search={search} setSearch={setSearch} onDownloadCSV={() => { }} />

        // </div>
        <>
            <CustomTable
                key={`${page}-${pageSize}-${search}-${game_id}-${user_id}`}
                table={table} loading={loadingTransaction} />

            {tableData.length > 10 ? <div className="flex justify-between items-center mt-4 px-8 py-6">
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
                <Pagination
                    count={data?.data?.pagination?.total_pages || 1}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    variant="outlined"
                    shape="rounded"
                    sx={{ gap: "8px" }}
                />
            </div> : ""}
        </>
    );
}
