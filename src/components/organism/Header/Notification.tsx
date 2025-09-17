"use client";

import React, { useRef, useState } from 'react';
import {
    Badge,
    Box,
    IconButton,
    Popper,
    Paper,
    ClickAwayListener,
    Typography,
    List,
    ListItem,
} from '@mui/material';
import Fade from '@mui/material/Fade'; // ✅ Import Fade
import { Notification } from '@wandersonalwes/iconsax-react';
import Link from 'next/link';

type Notification = {
    label: string;
    description: string;
    link?: string;
}
export default function NotificationPage({
    notifications
}: {
    notifications: Notification[]
}) {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen((prev) => !prev);

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current?.contains(event.target as Node)) return;
        setOpen(false);
    };

    const id = open ? 'popper' : undefined;

    return (
        <Box>
            <IconButton
                aria-describedby={id}
                ref={anchorRef}
                onClick={handleToggle}
                className="!bg-light-gray"
            >
                <Badge
                    badgeContent={notifications.length}
                    color="success"
                    sx={{ '& .MuiBadge-badge': { top: 2, right: 4 } }}
                >
                    <Notification variant="Bold" className="!text-para-light" />
                </Badge>
            </IconButton>

            <Popper
                id={id}
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition
                style={{ zIndex: 1300 }}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={300}>
                        <Paper
                            elevation={3}
                            sx={{
                                width: 300,
                                borderRadius: 2,
                                mt: 1,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <Box>
                                    <div className="flex items-center justify-between mb-4 px-1">
                                        <Typography variant="h3" >
                                            Notifications
                                        </Typography>
                                        <Link href={"#"} className='text-[12px] leading-[120%] hover:text-primary-dark font-medium'>View All</Link>
                                    </div>
                                    {
                                        notifications.length ? (
                                            <List className='max-h-[320px] overflow-auto px-1'>
                                                {
                                                    notifications.map((notification) => (
                                                        <ListItem className='border-b-solid border-b-gray border-b-[1px] !pb-2 mb-2' key={notification.label}>
                                                            <Link href={""}>
                                                                <strong className="text-[12px] leading-[120%] font-[500] block mb-1">New User admin404 registerd</strong>
                                                                <p className='text-[10px] leading-[120%] text-para-light'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, porro!</p>
                                                            </Link>
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        ) : (
                                            <Typography variant="body2" color="text.title" sx={{ pt: 1, px: 1 }}>
                                                No new notifications
                                            </Typography>
                                        )
                                    }

                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Box>
    );
}
