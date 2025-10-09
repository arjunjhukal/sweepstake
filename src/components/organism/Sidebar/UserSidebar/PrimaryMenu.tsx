import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReceiptEdit } from "@wandersonalwes/iconsax-react";
import { PATH } from "@/routes/PATH";
import { getAllMenus } from "@/serverApi/menu";
import { useGetAllUserMenuQuery } from "@/services/menuApi";
import Link from "next/link";

export default function PrimaryMenu() {
    const { data } = useGetAllUserMenuQuery();

    return (
        <List>
            {data ? data?.data?.map((menu: any) => (
                <ListItem key={menu.name}>
                    {/* <ListItemButton component="a" href={menu.slug ? `/general/${menu.slug}` : "#"}>
                        <ListItemIcon>
                            <ReceiptEdit size={18} />
                        </ListItemIcon>
                        <ListItemText primary={menu.name} />
                    </ListItemButton> */}
                    <Link href={menu.slug ? `/general/${menu.slug}` : "#"} className="flex gap-2 items-center py-2">
                        <ListItemIcon>
                            <ReceiptEdit size={18} />
                        </ListItemIcon>
                        <ListItemText primary={menu.name} />
                    </Link>
                </ListItem>
            ))
                : (
                    <p></p>
                )
            }
        </List>
    );
}
