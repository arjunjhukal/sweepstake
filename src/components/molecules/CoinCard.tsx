import GoldCoinIcon from '@/icons/GoldCoinIcon'
import { Box } from '@mui/material'
import React from 'react'

export default function CoinCard() {
    return (
        <Box sx={{
            background: "linear-gradient(to right,#FFA325,#693C00)",
            padding: "1px",
            borderRadius: "40px"
        }}>
            <Box sx={{
                background: "#2D2D30",
                borderRadius: "40px"
            }} className="flex justify-start items-center gap-1 py-2 pl-4 pr-8">
                <GoldCoinIcon />
                <div className="coins">
                    <strong className="text-[12px] leading-4 font-[600] text-[#FBA027] block">20,000</strong>
                    <span className="text-[9px] mt-[-2px] block">Gold Coins</span>
                </div>
            </Box>
        </Box >
    )
}
