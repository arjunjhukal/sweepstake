import { Box } from '@mui/material'
import React from 'react'
import Profile from '../Profile'
import AdminSearchBar from '../AdminHeader/AdminSearchBar'
import CoinCard from '@/components/molecules/CoinCard'
import GoldCoinIcon from '@/icons/GoldCoinIcon'
import SilverCoinIcon from '@/icons/SilverCoinIcon'
import UserCoinCard from './UserCoinCard'

export default function UserHeader() {
  return (
    <Box className='flex items-center gap-4 justify-between w-full'>
      <AdminSearchBar />
      <div className="right flex items-center gap-4">
        <UserCoinCard />
        <Profile />
      </div>
    </Box>
  )
}
