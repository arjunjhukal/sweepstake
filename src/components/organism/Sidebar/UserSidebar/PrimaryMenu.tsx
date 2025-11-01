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
    const [glassStyle, setGlassStyle] = React.useState({ top: 0, height: 0, opacity: 0 });
    const menuListRef = React.useRef<HTMLUListElement>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
        const item = e.currentTarget;
        const list = menuListRef.current;

        if (item && list) {
            const itemRect = item.getBoundingClientRect();
            const listRect = list.getBoundingClientRect();
            const topPosition = itemRect.top - listRect.top;

            setGlassStyle({
                top: topPosition,
                height: itemRect.height,
                opacity: 1,
            });
        }
    };

    const handleMouseLeave = () => {
        setGlassStyle((prev) => ({ ...prev, opacity: 0 }));
    };

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
        <List
            ref={menuListRef}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                maxHeight: "280px",
                overflowY: "auto"
            }}>
            <div
                style={{
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    top: `${glassStyle.top}px`,
                    height: `${glassStyle.height}px`,
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '8px',
                    boxShadow: `
                        0 8px 32px 0 rgba(0, 0, 0, 0.37),
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                        0 0 20px rgba(255, 255, 255, 0.1)
                    `,
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    opacity: glassStyle.opacity,
                    transform: glassStyle.opacity === 1 ? 'translateY(0) scale(1)' : 'translateY(0) scale(0.95)',
                }}
            />
            {data ? data?.data?.map((menu: any) => {
                const href = menu.slug ? `/general/${menu.slug}` : "#";
                const isActive = pathname.startsWith(href);
                return (
                    <ListItem key={menu?.name}
                        onMouseEnter={handleMouseEnter}
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            padding: 0,
                        }}>
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
                                className={open ? "expanded !text-wrap" : "collapsed !text-nowrap"}
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
