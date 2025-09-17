"use client";
import { DRAWER_WIDTH } from '@/config';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import React from 'react'
import { HambergerMenu } from '@wandersonalwes/iconsax-react';
import AdminHeader from './AdminHeader';
import UserHeader from './UserHeader';
import { OutlinedInput } from '@mui/material';


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.common.white,
    boxShadow: "none",
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: DRAWER_WIDTH,
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),

            },
        },
    ],
}));
export default function Header({ open, handleDrawerOpen }: {
    open: boolean,
    handleDrawerOpen: () => void;
}) {

    const user = { role: "ADMIN" }
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar sx={{ gap: "16px" }}>

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                        {
                            maxWidth: "fit-content"
                        },
                    ]}
                    className='!bg-light-gray'
                >
                    <HambergerMenu className='!text-para-light' />
                </IconButton>
                {
                    user?.role.toUpperCase() === 'ADMIN' ? (
                        <AdminHeader />
                    ) : (
                        <UserHeader />
                    )
                }
            </Toolbar>
        </AppBar >
    )
}
