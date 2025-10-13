import SupportIcon from '@/app/customIcons/SupportIcon';
import { PATH } from '@/routes/PATH';
import Private from '@/routes/Private';
import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Home, MessageQuestion, ReceiptEdit, RecordCircle, StatusUp, UserEdit } from '@wandersonalwes/iconsax-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import PrimaryMenu from './PrimaryMenu';

export default function UserMenu({ open }: { open: boolean }) {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <Box>
            {open ? <Private>
                <div className="flex justify-between items-center gap-1 mb-6">
                    <Link href="/buy-coins" className="ss-btn bg-primary-grad" >Buy Coins</Link>
                    <Link href="/withdrawl" className="ss-btn bg-secondary-grad" >Withdraw</Link>
                </div>
            </Private> : null}

            <div className="flex flex-col gap-16 lg:gap-28">
                <List>
                    <ListItem>
                        <Link
                            className={`flex gap-2 items-center px-4 py-2 ${[
                                open ? "expanded" : "collapsed",
                                pathname === PATH.DASHBOARD.ROOT ? "active__menu" : ""
                            ].join(" ")}`}
                            href={PATH.DASHBOARD.ROOT}

                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <Home size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Lobby"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link
                            className={`flex gap-2 items-center px-4 py-2 ${[
                                open ? "expanded" : "collapsed",
                                [
                                    PATH.USER.GAMES.ROOT,
                                ].some(path => pathname.startsWith(path)) ? "active__menu" : ""
                            ].join(" ")}`}
                            href={PATH.USER.GAMES.ROOT}
                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <StatusUp size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Exclusive Games"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </Link>
                    </ListItem>
                </List>

                <PrimaryMenu open={open} />
            </div>
            <div className="support mt-4">
                <Link href={"/support"} className="ss-btn support__btn flex items-center gap-2 w-full justify-start">
                    <SupportIcon />
                    {open ? <strong className='text-[14px] font-semibold  opacity-80 !text-white'>Support</strong> : null}
                </Link>
                {open ? <div className='mt-2 text-[11px] lg:text-[12px] text-center'>
                    <div className="w-[8px] h-[8px] bg-green-500 rounded-full inline-block"></div>
                    <span className='opacity-70 !text-white'> 24x7 Support available</span>
                </div> : null}
            </div>
        </Box>
    )
}
