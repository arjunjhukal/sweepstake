import { Box } from '@mui/material'
import React from 'react'
import Profile from '../Profile'
import AdminSearchBar from '../AdminHeader/AdminSearchBar'
import CoinCard from '@/components/molecules/CoinCard'
import GoldCoinIcon from '@/icons/GoldCoinIcon'
import SilverCoinIcon from '@/icons/SilverCoinIcon'
import UserCoinCard from './UserCoinCard'
import Private from '@/routes/Private'
import { CheckAuth } from '@/utils/checkAuth'
import Link from 'next/link'
import { PATH } from '@/routes/PATH'

export default function UserHeader() {
  const isAuth = CheckAuth();
  return (
    <Box className='flex items-center gap-4 justify-between w-full'>
      <AdminSearchBar />


      {isAuth ?
        <div className="right flex items-center gap-4">
          <UserCoinCard />
          <Profile />
        </div> :
        <div className="flex gap-3 items-center">
          <Link href={PATH.AUTH.REGISTER.ROOT} className='ss-btn bg-primary-grad text-nowrap'>Setup an account</Link>
          <Link href={PATH.AUTH.LOGIN.ROOT} className='ss-btn bg-primary-grad'>Login</Link>
        </div>
      }
    </Box>
  )
}
