"use client";

import { Box } from '@mui/material'
import React from 'react'
import Sidebar from '../organism/Sidebar'
import Header from '../organism/Header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} />
            <div className="root_container">
                <div className="content_box p-4 lg:pl-11 lg:pr-12 lg:py-8">{children}</div>
            </div>
        </Box>
    )
}
