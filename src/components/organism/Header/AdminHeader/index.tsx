"use client";

import { Box, IconButton, Input } from '@mui/material'
import React from 'react'
import { Add } from '@wandersonalwes/iconsax-react';
import NotificationPage from '../Notification';
import Profile from '../Profile';
import AdminSearchBar from './AdminSearchBar';
import CreatNewRecord from '../CreatNewRecord';
import { useGetAllNotificationQuery } from '@/services/notificationApi';


export default function AdminHeader() {
  // const [mounted, setMounted] = React.useState(false);

  // React.useEffect(() => {
  //   setMounted(true);
  // }, []);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const { data } = useGetAllNotificationQuery({ page: page, per_page: pageSize });
  console.log(data);
  return (
    <Box className='flex items-center gap-4 justify-between w-full'>
      <AdminSearchBar />
      <div className="right flex items-center gap-4">
        <CreatNewRecord />
        <NotificationPage notifications={data?.data?.data || []}  pagination={data?.data?.pagination}/>
        <Profile />
      </div>
    </Box>
  )
}
