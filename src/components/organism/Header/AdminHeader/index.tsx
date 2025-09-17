"use client";

import { Box, IconButton, Input } from '@mui/material'
import React from 'react'
import { Add } from '@wandersonalwes/iconsax-react';
import NotificationPage from '../Notification';
import Profile from '../Profile';
import AdminSearchBar from './AdminSearchBar';


export default function AdminHeader() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Box className='flex items-center gap-4 justify-between w-full'>
      <AdminSearchBar />
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
          <Add className='!text-para-light' />
        </IconButton>
        <NotificationPage />
        <Profile />
      </div>
    </Box>
  )
}
