import { PATH } from '@/routes/PATH';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { StatusUp } from '@wandersonalwes/iconsax-react'
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
                        <StatusUp />
                    </ListItemIcon>
                    <ListItemText
                        primary="Games"
                        className={open ? "expanded" : "collapsed"}
                    />
                </ListItemButton>
            </ListItem>
        </List>
    )
}
