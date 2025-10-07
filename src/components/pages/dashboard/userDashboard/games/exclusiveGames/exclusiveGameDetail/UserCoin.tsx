"use client"

import SilverCoinIcon from '@/icons/SilverCoinIcon'
import { useGetUserBalanceBySlugQuery } from '@/services/userApi'
import { Box } from '@mui/material'
import React from 'react'

export default function UserCoin({ slug }: { slug: string }) {
    const { data } = useGetUserBalanceBySlugQuery({ slug });
    return (
        <Box sx={{
            background: "linear-gradient(0deg, rgba(234, 47, 231, 0.10) 0%, rgba(234, 47, 231, 0.10) 100%)",
            borderRadius: "16px"
        }} className="flex justify-center items-center gap-2 py-4 px-6 min-w-[30%] ">
            <SilverCoinIcon />
            <div className="coins">
                <strong className="text-[16px] leading-4 font-[600] block mb-1">{data?.balance || 0}</strong>
                <span className="text-[12px]  block">Current Sweep Coins</span>
            </div>
        </Box>
    )
}
