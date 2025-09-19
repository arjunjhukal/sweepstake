import { Box } from '@mui/material'
import React from 'react'
import Profile from '../Profile'
import AdminSearchBar from '../AdminHeader/AdminSearchBar'
import CoinCard from '@/components/molecules/CoinCard'
import GoldCoinIcon from '@/icons/GoldCoinIcon'
import SilverCoinIcon from '@/icons/SilverCoinIcon'

export default function UserHeader() {
  return (
    <Box className='flex items-center gap-4 justify-between w-full'>
      <AdminSearchBar />
      <div className="right flex items-center gap-4">
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
        </Box>
        <Box sx={{
          background: "linear-gradient(to right,#69A29D,#93E0D9)",
          padding: "1px",
          borderRadius: "40px"
        }}>
          <Box sx={{
            background: "#2D2D30",
            borderRadius: "40px"
          }} className="flex justify-start items-center gap-1 py-2 pl-4 pr-8">
            <SilverCoinIcon />
            <div className="coins">
              <strong className="text-[12px] leading-4 font-[600] text-[#93E0D8] block">20,000</strong>
              <span className="text-[9px] mt-[-2px] block">Gold Coins</span>
            </div>
          </Box>
        </Box >
        <Profile />
      </div>
    </Box>
  )
}
