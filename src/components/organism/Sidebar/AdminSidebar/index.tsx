"use client";

import { PATH } from "@/routes/PATH";
import Link from "next/link";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    ArrowSwapHorizontal,
    Game,
    Notification,
    Paperclip2,
    Setting2,
    StatusUp,
    UserSearch,
} from "@wandersonalwes/iconsax-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminMenu({ open }: { open: boolean }) {
    const pathname = usePathname();

    const menuItems = [
        {
            label: "Dashboard",
            icon: <StatusUp size={18} />,
            href: PATH.DASHBOARD.ROOT,
            active: pathname === PATH.DASHBOARD.ROOT,
        },
        {
            label: "Transactions",
            icon: <ArrowSwapHorizontal size={18} />,
            href: PATH.ADMIN.TRANSACTIONS.ROOT,
            active: pathname.startsWith(PATH.ADMIN.TRANSACTIONS.ROOT),
        },
        {
            label: "Games",
            icon: <Game size={18} />,
            href: PATH.ADMIN.GAMES.ROOT,
            active: [
                PATH.ADMIN.GAMES.ROOT,
                PATH.ADMIN.GAMES.ADD_GAME.ROOT,
                "/edit-game",
            ].some((p) => pathname.startsWith(p)),
        },
        {
            label: "Players",
            icon: <UserSearch size={18} />,
            href: PATH.ADMIN.PLAYERS.ROOT,
            active: [
                PATH.ADMIN.PLAYERS.ROOT,
                PATH.ADMIN.PLAYERS.ADD_PLAYER.ROOT,
                "/edit-player",
            ].some((p) => pathname.startsWith(p)),
        },
        {
            label: "Menus",
            icon: <Paperclip2 size={18} />,
            href: PATH.ADMIN.MENUS.ROOT,
            active: pathname.startsWith(PATH.ADMIN.MENUS.ROOT),
        },
        {
            label: "Pages",
            icon: <Paperclip2 size={18} />,
            href: PATH.ADMIN.PAGES.ROOT,
            active: pathname.startsWith(PATH.ADMIN.PAGES.ROOT),
        },
        {
            label: "Notifications",
            icon: <Notification size={18} />,
            href: PATH.ADMIN.NOTIFICATIONS.ROOT,
            active: pathname.startsWith(PATH.ADMIN.NOTIFICATIONS.ROOT),
        },
        {
            label: "Settings",
            icon: <Setting2 size={18} />,
            href: PATH.ADMIN.SETTINGS.ROOT,
            active: pathname.startsWith(PATH.ADMIN.SETTINGS.ROOT),
        },
    ];

    return (
        <List>
            {menuItems.map(({ label, icon, href, active }, idx) => (
                <ListItem key={idx}>
                    <Link
                        href={href}
                        className={`flex gap-2 items-center px-4 py-2 ${open ? "expanded" : "collapsed"
                            } ${active ? "active__menu" : ""}`}
                    >
                        <ListItemIcon className={open ? "expanded" : "collapsed"}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={label}
                            className={open ? "expanded" : "collapsed"}
                        />
                    </Link>
                </ListItem>
            ))}
        </List>
    );
}
