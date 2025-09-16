"use client";
import React, { useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
    getSortedRowModel,
} from "@tanstack/react-table";
import { Button, Pagination } from "@mui/material";
import TableHeader from "@/components/molecules/TableHeader";
import { ArrowDown, ArrowUp } from "@wandersonalwes/iconsax-react";

interface PlayerTransaction {
    id: number;
    playerName: string;
    method: string;
    type: string;
    amount: number;
    sweepcoins: string;
    date: string;
}

const data: PlayerTransaction[] = [
    { id: 244, playerName: "Harry Michael", method: "Paypal", type: "Deposit", amount: 56.68, sweepcoins: "56,598", date: "July 23, 2025 [15:69]" },
    { id: 243, playerName: "Harry Michael", method: "Crypto", type: "Withdraw", amount: 56.68, sweepcoins: "56,598", date: "July 23, 2025 [15:69]" },
    { id: 242, playerName: "Harry Michael", method: "Paypal", type: "Deposit", amount: 56.68, sweepcoins: "56,598", date: "July 23, 2025 [15:69]" },
    { id: 241, playerName: "Harry Michael", method: "Paypal", type: "Deposit", amount: 56.68, sweepcoins: "56,598", date: "July 23, 2025 [15:69]" },
    { id: 240, playerName: "Harry Michael", method: "Crypto", type: "Deposit", amount: 56.68, sweepcoins: "56,598", date: "July 23, 2025 [15:69]" },
    { id: 239, playerName: "Harry Michael", method: "Paypal", type: "Deposit", amount: 56.68, sweepcoins: "56,598", date: "July 23, 2025 [15:69]" },
    { id: 238, playerName: "Harry Michael", method: "Crypto", type: "Deposit", amount: 56.68, sweepcoins: "56,598", date: "July 23, 2025" },
];

export default function GameTransactionTable() {
    const [search, setSearch] = useState("");
    const [filterMethod, setFilterMethod] = useState("all");
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

    const columns = useMemo<ColumnDef<PlayerTransaction>[]>(
        () => [
            {
                accessorKey: "id",
                header: ({ column }) => (
                    <button
                        onClick={() => column.toggleSorting()}
                        className="flex items-center gap-1"
                    >
                        #ID
                        {{
                            asc: <ArrowUp size={14} />,
                            desc: <ArrowDown size={14} />,
                        }[column.getIsSorted() as string] || null}
                    </button>
                ),
            },
            { accessorKey: "playerName", header: "Player Name" },
            { accessorKey: "method", header: "Method" },
            { accessorKey: "type", header: "Type" },
            { accessorKey: "amount", header: "Amount USD" },
            { accessorKey: "sweepcoins", header: "Sweepcoins" },
            { accessorKey: "date", header: "Transaction Date" },
        ],
        []
    );


    const filteredData = useMemo(() => {
        return data.filter((row) => {
            const searchMatch =
                row.playerName.toLowerCase().includes(search.toLowerCase()) ||
                row.type.toLowerCase().includes(search.toLowerCase()) ||
                row.date.toLowerCase().includes(search.toLowerCase());
            const methodMatch = filterMethod === "all" || row.method.toLowerCase() === filterMethod;
            return searchMatch && methodMatch;
        });
    }, [search, filterMethod]);


    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const downloadCSV = () => {

    };

    return (
        <section className="transaction__root">
            <div className="section-title mb-4">
                <h2 className="text-[20px] leading-[140%] font-[600]">
                    Games Under Diner Frenzy Spins
                </h2>
            </div>
            <div className="border-gray border-solid border-[1px] rounded-[8px] lg:rounded-[16px]">
                <TableHeader
                    search={search}
                    setSearch={setSearch}
                    filterMethod={filterMethod}
                    setFilterMethod={setFilterMethod}
                    onDownloadCSV={downloadCSV}
                />

                <table className="min-w-full border-collapse border border-gray-200 text-left">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-[12px] font-[600] text-title p-2 py-6 px-6 bg-light-gray"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className=" p-2 py-6 px-6">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 px-8 py-6">
                    <div>
                        <span>Row per page:</span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => table.setPageSize(Number(e.target.value))}
                            className="ml-2 border border-gray-300 rounded p-1"
                        >
                            {[5, 10, 15, 20].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Pagination count={10} variant="outlined" shape="rounded" sx={{ gap: "8px" }} />
                </div>
            </div>
        </section>
    );
}
