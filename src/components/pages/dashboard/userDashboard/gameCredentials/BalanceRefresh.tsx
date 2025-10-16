// "use client"

// import { Refresh } from '@wandersonalwes/iconsax-react'
// import React from 'react'

// export default function BalanceRefresh({ label, icon, onClick }: { label: string; icon: boolean; onClick?: () => void }) {
//     return (
//         <p className='text-[10px] lg:text-[12px] leading-[120%] font-[500] bg-primary-grad py-1 px-2 rounded-[12px] flex items-center gap-1 max-w-fit cursor-pointer' onClick={onClick} >
//             {icon ? <Refresh size={12} /> : ""}
//             {label || ""}
//         </p>
//     )
// }

"use client";

import { Refresh } from "@wandersonalwes/iconsax-react";
import React from "react";
import { CircularProgress } from "@mui/material";

export default function BalanceRefresh({
    label,
    icon,
    onClick,
    loading = false,
}: {
    label: string;
    icon: boolean;
    onClick?: () => void;
    loading?: boolean;
}) {
    return (
        <p
            className={`text-[10px] lg:text-[12px] leading-[120%] font-[500] py-1 px-2 rounded-[12px] flex items-center gap-1 max-w-fit cursor-pointer transition-all duration-200 ${loading
                ? "bg-gray-500/50 text-gray-200 cursor-not-allowed"
                : "bg-primary-grad text-white"
                }`}
            onClick={!loading ? onClick : undefined}
        >
            {loading ? (
                <>
                    <CircularProgress size={10} thickness={5} color="inherit" />
                    Refreshing...
                </>
            ) : (
                <>
                    {icon && <Refresh size={12} />}
                    {label}
                </>
            )}
        </p>
    );
}
