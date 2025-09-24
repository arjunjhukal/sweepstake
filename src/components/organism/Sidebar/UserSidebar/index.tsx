import SupportIcon from '@/app/customIcons/SupportIcon';
import { PATH } from '@/routes/PATH';
import Private from '@/routes/Private';
import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Home, MessageQuestion, ReceiptEdit, RecordCircle, StatusUp, UserEdit } from '@wandersonalwes/iconsax-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

export default function UserMenu({ open }: { open: boolean }) {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <Box>
            {open ? <Private>
                <div className="flex justify-between items-center gap-1 mb-6">
                    <Link href="/buy-coin" className="ss-btn bg-primary-grad" >Buy Coins</Link>
                    <Link href="/withdrawl" className="ss-btn bg-secondary-grad" >Withdraw</Link>
                </div>
            </Private> : null}

            <div className="flex flex-col gap-16 lg:gap-28">
                <List>
                    <ListItem>
                        <ListItemButton
                            className={[
                                open ? "expanded" : "collapsed",
                                pathname === PATH.DASHBOARD.ROOT ? "active" : ""
                            ].join(" ")}

                            onClick={() => { router.push(PATH.DASHBOARD.ROOT) }}

                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <Home size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Lobby"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            className={[
                                open ? "expanded" : "collapsed",
                                [
                                    PATH.USER.GAMES.ROOT,
                                ].some(path => pathname.startsWith(path)) ? "active" : ""
                            ].join(" ")}
                            onClick={() => { router.push(PATH.USER.GAMES.ROOT) }}

                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <StatusUp size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Exclusive Games"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            className={[
                                open ? "expanded" : "collapsed",
                                [
                                    PATH.ADMIN.GAMES.ROOT,
                                    PATH.ADMIN.GAMES.ADD_GAME.ROOT,
                                    "/edit-game"
                                ].some(path => pathname.startsWith(path)) ? "active" : ""
                            ].join(" ")}
                            onClick={() => { router.push(PATH.ADMIN.GAMES.ROOT) }}

                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <StatusUp size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Bonus Games"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List>
                    <ListItem>
                        <ListItemButton
                            className={[
                                open ? "expanded" : "collapsed",
                                [
                                    PATH.ADMIN.GAMES.ROOT,
                                    PATH.ADMIN.GAMES.ADD_GAME.ROOT,
                                    "/edit-game"
                                ].some(path => pathname.startsWith(path)) ? "active" : ""
                            ].join(" ")}

                            onClick={() => { router.push(PATH.DASHBOARD.ROOT) }}

                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <ReceiptEdit size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Refund Policy"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            className={[
                                open ? "expanded" : "collapsed",
                                [
                                    PATH.ADMIN.GAMES.ROOT,
                                    PATH.ADMIN.GAMES.ADD_GAME.ROOT,
                                    "/edit-game"
                                ].some(path => pathname.startsWith(path)) ? "active" : ""
                            ].join(" ")}
                            onClick={() => { router.push(PATH.ADMIN.GAMES.ROOT) }}

                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <ReceiptEdit size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Accessibility"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            className={[
                                open ? "expanded" : "collapsed",
                                [
                                    PATH.ADMIN.GAMES.ROOT,
                                    PATH.ADMIN.GAMES.ADD_GAME.ROOT,
                                    "/edit-game"
                                ].some(path => pathname.startsWith(path)) ? "active" : ""
                            ].join(" ")}
                            onClick={() => { router.push(PATH.ADMIN.GAMES.ROOT) }}

                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <ReceiptEdit size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Sweepstake Policy"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            className={[
                                open ? "expanded" : "collapsed",
                                [
                                    PATH.ADMIN.GAMES.ROOT,
                                    PATH.ADMIN.GAMES.ADD_GAME.ROOT,
                                    "/edit-game"
                                ].some(path => pathname.startsWith(path)) ? "active" : ""
                            ].join(" ")}
                            onClick={() => { router.push(PATH.ADMIN.GAMES.ROOT) }}

                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <ReceiptEdit size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Terms & Condition"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            className={[
                                open ? "expanded" : "collapsed",
                                [
                                    PATH.ADMIN.GAMES.ROOT,
                                    PATH.ADMIN.GAMES.ADD_GAME.ROOT,
                                    "/edit-game"
                                ].some(path => pathname.startsWith(path)) ? "active" : ""
                            ].join(" ")}
                            onClick={() => { router.push(PATH.ADMIN.GAMES.ROOT) }}

                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <UserEdit size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Privacy Policy"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            className={[
                                open ? "expanded" : "collapsed",
                                [
                                    PATH.ADMIN.GAMES.ROOT,
                                    PATH.ADMIN.GAMES.ADD_GAME.ROOT,
                                    "/edit-game"
                                ].some(path => pathname.startsWith(path)) ? "active" : ""
                            ].join(" ")}
                            onClick={() => { router.push(PATH.ADMIN.GAMES.ROOT) }}

                        >
                            <ListItemIcon className={open ? "expanded" : "collapsed"}>
                                <MessageQuestion size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary="FAQs"
                                className={open ? "expanded" : "collapsed"}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
            <div className="support">
                <button type="button" className="ss-btn support__btn flex items-center gap-2 w-full justify-start">
                    <SupportIcon />
                    {open ? <strong className='text-[14px] font-semibold  opacity-80 !text-white'>Support</strong> : null}
                </button>
                {open ? <p className='mt-2 text-[11px] lg:text-[12px] text-center'>
                    <div className="w-[8px] h-[8px] bg-green-500 rounded-full inline-block"></div>
                    <span className='opacity-70 !text-white'> 24x7 Support available</span>
                </p> : null}
            </div>
        </Box>
    )
}
