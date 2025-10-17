"use client";
import TableHeader from '@/components/molecules/TableHeader';
import CustomTable from '@/components/organism/Table';
import { User, Lock, ArrowUp, ArrowDown } from '@wandersonalwes/iconsax-react';
import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, ColumnDef } from '@tanstack/react-table';
import { Pagination, Box } from '@mui/material';

interface Activity {
    id: number;
    type: string;
    user: string;
    userId: string;
    action: string;
    details: string;
    timestamp: string;
    status: string;
    icon: React.ReactNode;
}

export default function Activities() {
    const activityTypes = [
        { value: 'all', label: 'All Activities' },
        { value: 'registration', label: 'Registration' },
        { value: 'login', label: 'Login/Logout' },
        { value: 'deposit', label: 'Deposits' },
        { value: 'withdrawal', label: 'Withdrawals' },
        { value: 'password_update', label: 'Security' },
        { value: 'game_play', label: 'Games' },
        { value: 'profile_update', label: 'Profile Updates' },
        { value: 'bonus', label: 'Bonuses' }
    ];

    const activities: Activity[] = [
        {
            id: 1,
            type: 'registration',
            user: 'john_doe',
            userId: 'USR001',
            action: 'New user registered',
            details: 'Account created successfully',
            timestamp: '2025-10-16 14:30:25',
            status: 'success',
            icon: <User />
        },
        {
            id: 2,
            type: 'deposit',
            user: 'sarah_smith',
            userId: 'USR042',
            action: 'Cash deposit',
            details: 'Amount: $500.00 via Credit Card',
            timestamp: '2025-10-16 14:25:10',
            status: 'success',
            icon: <User />
        },
        {
            id: 3,
            type: 'withdrawal',
            user: 'mike_wilson',
            userId: 'USR078',
            action: 'Withdrawal request',
            details: 'Amount: $250.00 to Bank Account',
            timestamp: '2025-10-16 14:20:45',
            status: 'pending',
            icon: <User />
        },
        {
            id: 4,
            type: 'password_update',
            user: 'emma_brown',
            userId: 'USR023',
            action: 'Password changed',
            details: 'Security credentials updated',
            timestamp: '2025-10-16 14:15:30',
            status: 'success',
            icon: <Lock />
        },
        {
            id: 5,
            type: 'login',
            user: 'david_lee',
            userId: 'USR056',
            action: 'User login',
            details: 'IP: 192.168.1.100, Location: New York, USA',
            timestamp: '2025-10-16 14:10:15',
            status: 'success',
            icon: <User />
        },
        {
            id: 6,
            type: 'game_play',
            user: 'lisa_garcia',
            userId: 'USR089',
            action: 'Game played',
            details: 'Super Stakes Poker - Bet: $50, Won: $125',
            timestamp: '2025-10-16 14:05:00',
            status: 'success',
            icon: <User />
        },
        {
            id: 7,
            type: 'withdrawal',
            user: 'alex_martinez',
            userId: 'USR034',
            action: 'Withdrawal failed',
            details: 'Amount: $1000.00 - Insufficient funds',
            timestamp: '2025-10-16 14:00:45',
            status: 'failed',
            icon: <User />
        },
        {
            id: 8,
            type: 'profile_update',
            user: 'rachel_white',
            userId: 'USR067',
            action: 'Profile updated',
            details: 'Changed email and phone number',
            timestamp: '2025-10-16 13:55:30',
            status: 'success',
            icon: <User />
        },
        {
            id: 9,
            type: 'bonus',
            user: 'chris_taylor',
            userId: 'USR045',
            action: 'Bonus claimed',
            details: 'Welcome Bonus: $100 credited',
            timestamp: '2025-10-16 13:50:15',
            status: 'success',
            icon: <User />
        },
        {
            id: 10,
            type: 'logout',
            user: 'olivia_anderson',
            userId: 'USR091',
            action: 'User logout',
            details: 'Session ended normally',
            timestamp: '2025-10-16 13:45:00',
            status: 'success',
            icon: <User />
        },
        {
            id: 11,
            type: 'deposit',
            user: 'james_thomas',
            userId: 'USR012',
            action: 'Cash deposit',
            details: 'Amount: $1,200.00 via Bank Transfer',
            timestamp: '2025-10-16 13:40:45',
            status: 'success',
            icon: <User />
        },
        {
            id: 12,
            type: 'password_update',
            user: 'sophia_jackson',
            userId: 'USR073',
            action: 'Password reset',
            details: 'Reset via email verification',
            timestamp: '2025-10-16 13:35:30',
            status: 'success',
            icon: <Lock />
        }
    ];

    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [activityType, setActivityType] = React.useState("all");
    const [sorting, setSorting] = React.useState<any>([]);

    // Filter data based on search and activity type
    const filteredData = useMemo(() => {
        return activities.filter(activity => {
            const matchesSearch = search === "" ||
                activity.user.toLowerCase().includes(search.toLowerCase()) ||
                activity.userId.toLowerCase().includes(search.toLowerCase()) ||
                activity.action.toLowerCase().includes(search.toLowerCase()) ||
                activity.details.toLowerCase().includes(search.toLowerCase());

            const matchesType = activityType === "all" || activity.type === activityType;

            return matchesSearch && matchesType;
        });
    }, [search, activityType]);

    const columns = useMemo<ColumnDef<Activity>[]>(() => [
        {
            accessorKey: "id",
            header: ({ column }) => {
                const sortState = column.getIsSorted();
                const arrow =
                    sortState === "asc" ? (
                        <ArrowUp size={14} />
                    ) : sortState === "desc" ? (
                        <ArrowDown size={14} />
                    ) : <ArrowUp size={14} className="opacity-30" />;

                return (
                    <p
                        onClick={() => column.toggleSorting()}
                        className="flex items-center gap-1 cursor-pointer"
                    >
                        #ID {arrow}
                    </p>
                );
            },
        },
        {
            accessorKey: "user",
            header: "User",
            cell: ({ row }) => {
                const { user, userId } = row.original;
                const initials = user.split('_').map(n => n[0]).join('').toUpperCase();

                return (
                    <Box className="flex justify-start items-center gap-2">
                        <small className="text-[10px] w-[24px] h-[24px] flex items-center justify-center uppercase rounded-[4px] bg-[#1EB41B]/10 font-[500] text-[#1EB41B]">
                            {initials}
                        </small>
                        <div className="name-detail">
                            <strong className="text-primary block text-[12px] leading-[120%] font-[500] capitalize">
                                {user.replace('_', ' ')}
                            </strong>
                            <small className="text-[10px] text-para-light font-[500]">
                                {userId}
                            </small>
                        </div>
                    </Box>
                );
            },
        },
        {
            accessorKey: "type",
            header: "Activity Type",
            cell: ({ row }) => {
                const type = row.original.type;
                const display = type.split('_').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');

                return (
                    <span className="capitalize text-[12px] font-[500]">
                        {display}
                    </span>
                );
            },
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <span className="text-[12px] font-[500]">{row.original.action}</span>
            ),
        },
        {
            accessorKey: "details",
            header: "Details",
            cell: ({ row }) => (
                <span className="text-[11px] text-para-light max-w-[250px] block truncate">
                    {row.original.details}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status.toLowerCase();
                const display = status.charAt(0).toUpperCase() + status.slice(1);

                return (
                    <span
                        className={`px-2 py-1 max-w-[80px] block text-[10px] text-white status rounded-[8px] text-center ${status}`}
                    >
                        {display}
                    </span>
                );
            },
        },
        {
            accessorKey: "timestamp",
            header: "Timestamp",
            cell: ({ row }) => {
                const [date, time] = row.original.timestamp.split(' ');
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
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const totalPages = Math.ceil(filteredData.length / pageSize);

    return (
        <div className="border-gray border-solid border-[1px] rounded-[8px] lg:rounded-[16px]">
            <TableHeader

                search={search}
                setSearch={setSearch}
                filterMethod={activityType}
                setFilterMethod={(value) => {
                    setActivityType(value);
                    setPage(1);
                }}
                filterOptions={activityTypes}
                onDownloadCSV={() => { }}
            />

            <CustomTable
                key={`${page}-${pageSize}-${search}-${activityType}`}
                table={table}
                loading={false}
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 px-8 py-6 gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-[12px] font-[500]">Rows per page:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(1);
                        }}
                        className="border border-gray-300 rounded p-1 text-[12px]"
                    >
                        {[5, 10, 15, 20].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    {/* <span className="text-[12px] text-para-light ml-4">
                        Showing {filteredData.length > 0 ? ((page - 1) * pageSize) + 1 : 0} to {Math.min(page * pageSize, filteredData.length)} of {filteredData.length} activities
                    </span> */}
                </div>
                <Pagination
                    count={totalPages || 1}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    variant="outlined"
                    shape="rounded"
                    sx={{ gap: "8px" }}
                />
            </div>
        </div>
    );
}