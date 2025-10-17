import GoldCoinIcon from '@/icons/GoldCoinIcon'
import SilverCoinIcon from '@/icons/SilverCoinIcon'
import { useGetUserBalanceQuery } from '@/services/userApi'
import { Box } from '@mui/material'
import React from 'react'

export default function UserCoinCard() {
    const { data, isLoading } = useGetUserBalanceQuery();
    return (
        <>
            <Box sx={{
                background: "linear-gradient(to right,#FFA325,#693C00)",
                padding: "1px",
                borderRadius: "40px"
            }}>
                <Box sx={{
                    background: "#2D2D30",
                    borderRadius: "40px"
                }} className="flex justify-start items-center gap-1 py-2 pl-4 pr-8 cursor-pointer">
                    <GoldCoinIcon />
                    <div className="coins">
                        <strong className="text-[12px] leading-4 font-[600] text-[#FBA027] block">{data?.data[1]?.value || 0}</strong>
                        <span className="text-[9px] mt-[-2px] hidden md:block">Gold Coins</span>
                    </div>
                </Box>
            </Box>
            <Box sx={{
                background: "linear-gradient(to right,#69A29D,#93E0D9)",
                padding: "1px",
                borderRadius: "40px"
            }}>
                <Box sx={{
                    background: "#2D2D30",
                    borderRadius: "40px"
                }} className="flex justify-start items-center gap-1 py-2 pl-4 pr-8 cursor-pointer">
                    <SilverCoinIcon />
                    <div className="coins">
                        <strong className="text-[12px] leading-4 font-[600] text-[#93E0D8] block">{data?.data[0]?.value || 0}</strong>
                        <span className="text-[9px] mt-[-2px]  hidden md:block">Sweeps Coins</span>
                    </div>
                </Box>
            </Box >
        </>
    )
}
