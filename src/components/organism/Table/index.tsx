"use client";

import React from "react";
import { flexRender, Table } from "@tanstack/react-table";

interface CustomTableProps<TData> {
    table: Table<TData>;
}

export default function CustomTable<TData>({ table }: CustomTableProps<TData>) {
    return (
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
                                    header.getContext()
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
                            <td key={cell.id} className="p-2 py-6 px-6">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
