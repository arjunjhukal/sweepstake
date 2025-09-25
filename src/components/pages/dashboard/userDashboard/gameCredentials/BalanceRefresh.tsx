"use client"

import { Refresh } from '@wandersonalwes/iconsax-react'
import React from 'react'

export default function BalanceRefresh({ label, icon, onClick }: { label: string; icon: boolean; onClick?: () => void }) {
    return (
        <p className='text-[10px] lg:text-[12px] leading-[120%] font-[500] bg-primary-grad py-1 px-2 rounded-[12px] flex items-center gap-1 max-w-fit cursor-pointer' onClick={() => window.location.reload()} >
            {icon ? <Refresh size={12} /> : ""}
            {label || ""}
        </p>
    )
}
