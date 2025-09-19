"use client";

import React from "react";
import { flexRender, Table } from "@tanstack/react-table";

interface CustomTableProps<TData> {
    table: Table<TData>;
    loading?: boolean;
    emptyMessage?: string;
    skeletonRows?: number;
}

export default function CustomTable<TData>({ table, loading = false,
    emptyMessage = "No records found", skeletonRows = 5, }: CustomTableProps<TData>) {
    const rowCount = table.getRowModel().rows.length;
    const columnCount = table.getAllLeafColumns().length;
    return (
        <table className="min-w-full border-collapse border border-gray-200 text-left">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className="text-[12px] font-[600] text-title p-2 py-4 px-4 bg-light-gray"
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {loading ? (
                    Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                        <tr key={`skeleton-${rowIndex}`} className="animate-pulse">
                            {Array.from({ length: columnCount }).map((_, colIndex) => (
                                <td key={`skeleton-cell-${rowIndex}-${colIndex}`} className="p-2 py-4 px-4">
                                    <div className="h-4 w-full rounded bg-gray-200" />
                                </td>
                            ))}
                        </tr>
                    ))
                ) : rowCount === 0 ? (
                    <tr>
                        <td
                            colSpan={columnCount}
                            className="text-center px-4 py-4 text-gray-500"
                        >
                            {emptyMessage}
                        </td>
                    </tr>
                ) : (
                    table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-4 ">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>

        </table>
    );
}
