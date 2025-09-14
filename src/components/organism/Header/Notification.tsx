"use client";

import React, { useRef, useState } from 'react';
import { Badge, Box, IconButton, Popper, useMediaQuery, Paper, ClickAwayListener, CardContent, Typography, Stack } from '@mui/material';
import { Notification } from '@wandersonalwes/iconsax-react';
import Grow from '@mui/material/Grow';
import { Transitions } from '@/components/molecules/Transition';
import Link from 'next/link';

export default function NotificationPage({ badgeCount = 0, width = 300, children }: { badgeCount?: number, width?: number, children?: React.ReactNode }) {
    const downMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen(prev => !prev);

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as Node)) return;
        setOpen(false);
    };


    

    return (
        <Box>
            <IconButton ref={anchorRef} onClick={handleToggle} className='!bg-light-gray'>
                <Badge badgeContent={badgeCount} color="success" sx={{ '& .MuiBadge-badge': { top: 2, right: 4 } }}>
                    <Notification variant="Bold" className="!text-primary-light" />
                </Badge>
            </IconButton>

            <Popper
                placement={downMD ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [downMD ? -5 : 0, 9] } }] }}
                className='top-[100%]'
            >
                {({ TransitionProps }) => (
                    <Transitions type="grow" position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper sx={(theme) => ({ borderRadius: 1.5, width: { xs: 320, sm: 420 } })}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <CardContent>
                                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography variant="h5">Notifications</Typography>
                                        <Link href="#" color="title">
                                            Mark all read
                                        </Link>
                                    </Stack>

                                    <Stack direction="row" sx={{ justifyContent: 'center', mt: 1.5 }}>
                                        <Link href="#" color="title">
                                            View all
                                        </Link>
                                    </Stack>
                                </CardContent>

                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
}
