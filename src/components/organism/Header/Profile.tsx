import Avatar from '@/components/atom/Avatar';
import { Transitions } from '@/components/molecules/Transition';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { PATH } from '@/routes/PATH';
import { clearTokens } from '@/slice/authSlice';
import { Box, Button, ButtonBase, ClickAwayListener, Fade, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Stack, Typography } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
const avataur1 = '/assets/images/avatar-6.png';
import { ArrowDown2, ArrowUp2, Coin, Logout, MoneySend, Profile, Wallet2 } from "@wandersonalwes/iconsax-react";


export default function ProfileBlock() {
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

    const menuItems = [
        {
            label: "Profile",
            href: "/account/profile/account",
            icon: <Profile size="20" className="group-hover:text-primary" />,
        },
        {
            label: "Game Credentials",
            href: "/credentials",
            icon: <Wallet2 size="20" className="group-hover:text-primary" />,
        },
        {
            label: "Deposit History",
            href: "/account/deposit-history",
            icon: <Coin size="20" className="group-hover:text-primary" />,
        },
        {
            label: "Withdraw History",
            href: "/account/withdrawl-history",
            icon: <MoneySend size="20" className="group-hover:text-primary" />,
        },
        {
            label: "Logout",
            href: "#",
            icon: <Logout size="20" className="group-hover:text-primary" />,
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                dispatch(clearTokens());
                router.replace("/login");
            },
        },
    ];
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
                    {user?.role && user.role.toLowerCase() !== "user" ? <>
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
                                borderRadius: 2,
                                mt: 1,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                {
                                    user?.role && user.role.toLowerCase() !== "user" ? (
                                        <List>
                                            <ListItem>
                                                <ListItemText>
                                                    <Link href={"#"} className='block py-3 px-4 hover:bg-[#FBF4FB]'>View Profile</Link>
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
                                        <List>
                                            {menuItems.map((item, idx) => (
                                                <ListItem key={idx} disablePadding>
                                                    <Link
                                                        // component={item.href ? Link : "button"}
                                                        href={item.href || ""}
                                                        // onClick={item.onClick}
                                                        className={`flex items-center py-3 px-4 hover:bg-[#FBF4FB] group`}
                                                    >
                                                        <ListItemIcon className="min-w-[30px] mr-1 group-hover:text-primary">{item.icon}</ListItemIcon>
                                                        <ListItemText primary={item.label} className='group-hover:text-primary' />
                                                    </Link>
                                                </ListItem>
                                            ))}
                                        </List>
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
