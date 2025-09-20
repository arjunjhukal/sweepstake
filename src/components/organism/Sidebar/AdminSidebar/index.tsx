import { PATH } from '@/routes/PATH';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Game, Setting, Setting2, StatusUp, UserSearch } from '@wandersonalwes/iconsax-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function AdminMenu({ open }: { open: boolean }) {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <List>
            <ListItem>
                <ListItemButton
                    className={[
                        open ? "expanded" : "collapsed",
                        pathname === "/" ? "active" : ""
                    ].join(" ")}

                    onClick={() => { router.push(PATH.DASHBOARD.ROOT) }}

                >
                    <ListItemIcon className={open ? "expanded" : "collapsed"}>
                        <StatusUp />
                    </ListItemIcon>
                    <ListItemText
                        primary="Dashboard"
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
                        <Game />
                    </ListItemIcon>
                    <ListItemText
                        primary="Games"
                        className={open ? "expanded" : "collapsed"}
                    />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton
                    className={[
                        open ? "expanded" : "collapsed",
                        [
                            PATH.ADMIN.PLAYERS.ROOT,
                            PATH.ADMIN.PLAYERS.ADD_PLAYER.ROOT,
                            "/edit-game"
                        ].some(path => pathname.startsWith(path)) ? "active" : ""
                    ].join(" ")}
                    onClick={() => { router.push(PATH.ADMIN.PLAYERS.ROOT) }}

                >
                    <ListItemIcon className={open ? "expanded" : "collapsed"}>
                        <UserSearch />
                    </ListItemIcon>
                    <ListItemText
                        primary="Players"
                        className={open ? "expanded" : "collapsed"}
                    />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton
                    className={[
                        open ? "expanded" : "collapsed",
                        [
                            PATH.ADMIN.SETTINGS.ROOT,
                        ].some(path => pathname.startsWith(path)) ? "active" : ""
                    ].join(" ")}
                    onClick={() => { router.push(PATH.ADMIN.SETTINGS.ROOT) }}

                >
                    <ListItemIcon className={open ? "expanded" : "collapsed"}>
                        <Setting2 />
                    </ListItemIcon>
                    <ListItemText
                        primary="Settings"
                        className={open ? "expanded" : "collapsed"}
                    />
                </ListItemButton>
            </ListItem>
        </List>
    )
}
