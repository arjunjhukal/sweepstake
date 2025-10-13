"use client";

import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    Popper,
    Paper,
    ClickAwayListener,
    List,
    ListItem,
    Fade,
    Typography,
    ListItemButton,
} from "@mui/material";
import { ArrowDown2, Menu } from "@wandersonalwes/iconsax-react";

type TabLink = { label: string; value: string, icon?: React.ReactNode };

export default function TabController({
    links,
    currentTab,
    onTabChange,
}: {
    links: TabLink[];
    currentTab: string;
    onTabChange: (tab: string) => void;
}) {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen((prev) => !prev);

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current?.contains(event.target as Node)) return;
        setOpen(false);
    };

    const handleTabClick = (tab: string) => {
        onTabChange(tab);
        setOpen(false); // close mobile popper when tab changes
    };

    const currentTabLabel = links.find((link) => link.value === currentTab)?.label || "";
    const currentTabIcon = links.find((link) => link.value === currentTab)?.icon || "";
    return (
        <Box className="mb-4">
            {/* Desktop Tabs */}
            <Box className="hidden md:flex gap-4">
                {links.map((link) => (
                    <a
                        href="#"
                        key={link.value}
                        color="secondary"
                        onClick={(e) => { e.preventDefault(); handleTabClick(link.value) }}
                        className={` tab__link !p-4 !text-[14px] !text-center ${currentTab === link.value ? "active" : ""}`}
                    >
                        {link.label}
                    </a>
                ))}
            </Box>

            {/* Mobile Tabs as Popper */}
            <Box className="flex md:hidden">
                <Button ref={anchorRef} onClick={handleToggle} color="primary" className="!justify-between !p-2 !border !border-solid !border-gray-600 !rounded-lg" endIcon={<ArrowDown2 size={20} />} >
                    <Typography>
                        {currentTabIcon}
                        {currentTabLabel}</Typography>
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    transition
                    style={{ zIndex: 1300 }}
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={300}>
                            <Paper elevation={3}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <List>
                                        {links.map((link) => (
                                            <ListItem
                                                key={link.value}

                                            >
                                                <ListItemButton
                                                    selected={currentTab === link.value}
                                                    onClick={() => handleTabClick(link.value)}>
                                                    <Typography>{link.label}</Typography>
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </ClickAwayListener>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </Box>
        </Box >
    );
}
