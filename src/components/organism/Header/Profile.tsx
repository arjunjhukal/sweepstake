import Avatar from '@/components/atom/Avatar';
import { Transitions } from '@/components/molecules/Transition';
import { Box, Button, ButtonBase, ClickAwayListener, List, ListItem, Paper, Popper, Stack, Typography } from '@mui/material'
import Link from 'next/link';
import React, { useRef, useState } from 'react'
const avataur1 = '/assets/images/avatar-6.png';

export default function Profile() {
    const anchorRef = useRef<any>(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleLogout = () => {

    }
    return (
        <Box >
            <Button
                sx={(theme) => ({
                    p: 0.25,
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'secondary.lighter', ...theme.applyStyles('dark', { bgcolor: 'secondary.light' }) },
                    '&:focus-visible': {
                        outline: `2px solid ${theme.palette.secondary.dark}`,
                        outlineOffset: 2
                    }
                })}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {/* <Avatar alt="profile user" src={avataur1} /> */}
                <Stack direction="row" sx={{ gap: 1.25, alignItems: 'center' }}>
                    <Avatar alt="profile user" src={avataur1} />
                    <Stack>
                        <strong className='text-[14px] leading-[120%] font-bold text-text-title block mb-1 text-nowrap'>{"Arjun Jhukal"}</strong>
                        <p className='text-[12px] text-left leading-[120%] font-bold text-primary-light text-nowrap'>
                            UI/UX Designer
                        </p>
                    </Stack>
                </Stack>
            </Button>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8], // spacing from anchor
                        },
                    },
                ]}
            >
                {({ TransitionProps }) => (
                    <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                                borderRadius: 0,
                                width: '100%',        // take full width
                                maxWidth: 'unset',    // remove MUI’s maxWidth restriction
                            }}
                            elevation={0}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <List>
                                    <ListItem>
                                        <Link href="#">Visit Sweepstake Website</Link>
                                    </ListItem>
                                    <ListItem
                                        onClick={handleLogout}
                                        className="text-red-600 cursor-pointer"
                                    >
                                        Logout
                                    </ListItem>
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    )
}
