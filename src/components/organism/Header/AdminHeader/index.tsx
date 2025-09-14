import { Box, IconButton } from '@mui/material'
import React from 'react'
// import AdminSearchBar from './AdminSearchBar'

import dynamic from "next/dynamic";
import { Add } from '@wandersonalwes/iconsax-react';
import NotificationPage from '../Notification';
import Profile from '../Profile';

const AdminSearchBar = dynamic(() => import("./AdminSearchBar"), { ssr: false });

export default function AdminHeader() {
  return (
    <Box className='flex items-center gap-4 jutify-content-between w-full'>
      {/* <AdminSearchBar /> */}
      <input type="text" />
      <div className="right flex items-center gap-4">
        <IconButton
          color="inherit"
          sx={[
            {
              maxWidth: "fit-content"
            },
          ]}
          className='!bg-light-gray'
        >
          <Add className='!text-primary-light' />
        </IconButton>
        <NotificationPage />
        <Profile />
      </div>
    </Box>
  )
}
