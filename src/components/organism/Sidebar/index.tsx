"use client";

import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { DRAWER_WIDTH } from '@/config';
import Image from 'next/image';
import AdminMenu from './AdminSidebar';
import UserMenu from './UserSidebar';
import { useAppSelector } from '@/hooks/hook';

const drawerWidth = DRAWER_WIDTH;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.text.primary,
        },
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function Sidebar({ open, handleDrawerOpen }: {
    open: boolean,
    handleDrawerOpen: () => void;
}) {

    const user = useAppSelector((state) => state.auth.user);
    // const user = { role: "USER" }
    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader sx={{ justifyContent: "center" }}>
                {/* <HambergerMenu /> */}
                <Image src="/assets/images/logo.png" alt="Logo" width={102} height={56} />
            </DrawerHeader>

            <Box className={`mt-8 menu__wrapper ${open ? "px-3" : ""}`} >
                {
                    user?.role.toUpperCase() === 'ADMIN' ? (
                        <AdminMenu open={open} />
                    ) : (
                        <UserMenu open={open} />
                    )
                }
            </Box>
        </Drawer>
    );
}
