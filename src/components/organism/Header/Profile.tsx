import Avatar from '@/components/atom/Avatar';
import { Transitions } from '@/components/molecules/Transition';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { PATH } from '@/routes/PATH';
import { clearTokens } from '@/slice/authSlice';
import { Box, Button, ButtonBase, ClickAwayListener, Fade, List, ListItem, ListItemText, Paper, Popper, Stack, Typography } from '@mui/material'
import { ArrowDown2 } from '@wandersonalwes/iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import UserProfileMenu from './UserProfileMenu';
const avataur1 = '/assets/images/avatar-6.png';

export default function Profile() {
    const anchorRef = useRef<any>(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const id = open ? 'profile-dropdown' : ""
    return (
        <Box >
            <Button
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className='!hover:bg-transparent'
                sx={{
                    padding: 0,
                    '&:hover': {
                        backgroundColor: 'transparent', // disables hover bg
                    },
                    '&:active': {
                        backgroundColor: 'transparent', // disables click bg
                        boxShadow: 'none',              // disables ripple/box-shadow
                    },
                    '&:focus': {
                        backgroundColor: 'transparent', // disables focus bg
                        boxShadow: 'none',              // disables focus shadow
                    },

                }}
            >
                <div className='hidden lg:flex items-center gap-1'>
                    <Avatar alt="profile user" src={avataur1} />
                    {user?.role.toLowerCase() !== "user" ? <>
                        <div>
                            <strong className='text-[14px] leading-[120%] font-bold text-text-title block mb-1 text-nowrap'>{user?.name}</strong>
                            <p className='text-[12px] text-left leading-[120%] font-[500] text-para-light text-nowrap'>
                                {user?.role || "User"}
                            </p>
                        </div>
                        <ArrowDown2 size={14} />
                    </> : ""}
                </div>
            </Button>
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
                                width: 215,
                                // p: 2,
                                borderRadius: 2,
                                mt: 1,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                {
                                    user?.role.toLowerCase() !== "user" ? (
                                        <List>
                                            <ListItem>
                                                <ListItemText>
                                                    <Link href={PATH.ADMIN.GAMES.ADD_GAME.ROOT} className='block py-3 px-4 hover:bg-[#FBF4FB]'>Visit Sweepstake</Link>
                                                </ListItemText>
                                                <ListItemText>
                                                    <Link href={""} className='block py-3 px-4 hover:bg-[#FBF4FB] text-red-500' onClick={(e) => {
                                                        e.preventDefault();
                                                        dispatch(clearTokens());
                                                        router.replace(PATH.AUTH.LOGIN.ROOT)
                                                    }}>Logout</Link>
                                                </ListItemText>

                                            </ListItem>
                                        </List>
                                    ) : (
                                        <UserProfileMenu />
                                    )
                                }

                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Box>
    )
}
