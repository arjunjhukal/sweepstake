import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReceiptEdit } from "@wandersonalwes/iconsax-react";
import { PATH } from "@/routes/PATH";
import { getAllMenus } from "@/serverApi/menu";
import { useGetAllUserMenuQuery } from "@/services/menuApi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrimaryMenu({ open }: { open: boolean }) {
    const { data, isLoading } = useGetAllUserMenuQuery();
    const pathname = usePathname();

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2 animate-pulse">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-xl bg-gray-200 w-full h-[40px]"
                    />
                ))}
            </div>
        );
    }
    return (
        <List>
            {data ? data?.data?.map((menu: any) => {
                const href = menu.slug ? `/general/${menu.slug}` : "#";
                const isActive = pathname.startsWith(href);
                return (
                    <ListItem key={menu?.name}>
                        {/* <ListItemButton component="a" href={menu.slug ? `/general/${menu.slug}` : "#"}>
                        <ListItemIcon>
                            <ReceiptEdit size={18} />
                        </ListItemIcon>
                        <ListItemText primary={menu.name} />
                    </ListItemButton> */}
                        <Link href={menu.slug ? `/general/${menu.slug}` : "#"} className={`flex gap-2 items-center px-4 py-2 rounded-md transition-all ${[
                            open ? "expanded" : "collapsed",
                            isActive ? "active__menu  " : ""
                        ].join(" ")
                            }`}>
                            <ListItemIcon>
                                <ReceiptEdit size={18} />
                            </ListItemIcon>
                            <ListItemText
                                primary={menu?.name}
                                className={open ? "expanded" : "collapsed"}
                            />
                        </Link>
                    </ListItem>
                )
            })
                : (
                    <p></p>
                )
            }
        </List>
    );
}
