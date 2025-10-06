"use client";

import React from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { useAppSelector } from "@/hooks/hook";

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
    const user = useAppSelector((state) => state.auth.user)
    if (user?.role && user?.role.toUpperCase() !== "USER") {

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
                                    <td key={cell.id} className="px-4 py-4 text-[12px] text-title">
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

    return (
        <table className="min-w-full text-left border-separate border-spacing-y-1 user_table">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className="text-[12px] font-[600] text-white p-2 lg:p-4"
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
                                <td key={`skeleton-cell-${rowIndex}-${colIndex}`} className="text-[14px] p-2 lg:p-4 " >
                                    <div className="h-4 w-full rounded-xl bg-[rgba(255, 255, 255, 0.10)]" style={{ background: "rgba(255, 255, 255, 0.10)" }} />
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
                        <tr key={row.id} className="rounded-[24px] mb-1" >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}
                                    className="text-[14px] px-4 py-4"
                                    style={{ background: "rgba(255, 255, 255, 0.10)" }}>
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
    )
}
