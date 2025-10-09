import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReceiptEdit } from "@wandersonalwes/iconsax-react";
import { PATH } from "@/routes/PATH";
import { getAllMenus } from "@/serverApi/menu";
import { useGetAllUserMenuQuery } from "@/services/menuApi";

export default function PrimaryMenu() {
    const {data}=useGetAllUserMenuQuery();

    return (
        <List>
            {data ? data?.data?.map((menu: any) => (
                <ListItem key={menu.slug}>
                    <ListItemButton component="a" href={menu.slug ? `/${menu.slug}` : "#"}>
                        <ListItemIcon>
                            <ReceiptEdit size={18} />
                        </ListItemIcon>
                        <ListItemText primary={menu.name} />
                    </ListItemButton>
                </ListItem>
            ))
                : (
                    <p></p>
                )
        }
        </List>
    );
}
