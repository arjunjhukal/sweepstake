"use client";

import React, { useRef, useState } from "react";
import {
    Box,
    IconButton,
    Popper,
    Paper,
    Fade,
    ClickAwayListener,
    Typography,
    List,
    ListItem,
    Divider,
    Dialog,
    DialogContent,
} from "@mui/material";
import { ArrowDown2 } from "@wandersonalwes/iconsax-react";
import dayjs, { Dayjs } from "dayjs";
import CustomDateRangePicker from '../molecules/DateRangePicker';

interface FilterOption {
    label: string;
    value: number | null;
}

interface FilterProps {
    option?: FilterOption[];
    currentFilter?: number | null;
    setFilterDays?: React.Dispatch<React.SetStateAction<number | null>>;
    customRange?: { startDate: string; endDate: string };
    setCustomRange?: React.Dispatch<
        React.SetStateAction<{ startDate: string; endDate: string }>
    >;
}

export default function Filter({
    option,
    currentFilter,
    setFilterDays,
    customRange,
    setCustomRange,
}: FilterProps) {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    const [showCustomRangeModal, setShowCustomRangeModal] = useState(false);
    const [startDate, setStartDate] = useState<Dayjs | null>(
        customRange?.startDate ? dayjs(customRange.startDate) : null
    );
    const [endDate, setEndDate] = useState<Dayjs | null>(
        customRange?.endDate ? dayjs(customRange.endDate) : null
    );

    const handleToggle = () => setOpen((prev) => !prev);

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current?.contains(event.target as Node)) return;
        setOpen(false);
    };

    const handleSelect = (value: number | null, label: string) => {
        if (label === "Custom range") {
            setOpen(false);
            setShowCustomRangeModal(true);
        } else {
            // Reset custom range when selecting predefined filters
            setStartDate(null);
            setEndDate(null);
            setCustomRange && setCustomRange({ startDate: "", endDate: "" });
            setFilterDays && setFilterDays(value);
            setOpen(false);
        }
    };

    const handleApplyCustomRange = () => {
        if (startDate && endDate) {
            setCustomRange && setCustomRange({
                startDate: startDate.format("YYYY-MM-DD"),
                endDate: endDate.format("YYYY-MM-DD"),
            });
            setFilterDays && setFilterDays(null);
            setShowCustomRangeModal(false);
        }
    };

    const handleResetCustomRange = () => {
        setStartDate(null);
        setEndDate(null);
        setShowCustomRangeModal(false);
    };

    const id = open ? "filter-popper" : undefined;

    // Determine if custom range is active
    const isCustomRangeActive = customRange?.startDate && customRange?.endDate;

    return (
        <Box>
            {/* 🔽 Filter Button */}
            <IconButton
                aria-describedby={id}
                ref={anchorRef}
                onClick={handleToggle}
                className="!bg-[#2B1245] text-white !rounded-[18px] flex items-center gap-1 hover:opacity-80 transition !py-3 !px-4"
            >
                <ArrowDown2 size={16} />
                <Typography variant="body2" className="capitalize">
                    Filter
                </Typography>
            </IconButton>

            {/* Filter Dropdown */}
            <Popper
                id={id}
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition
                style={{ zIndex: 1300 }}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={300}>
                        <Paper
                            elevation={3}
                            sx={{
                                width: 280,
                                borderRadius: 3,
                                mt: 1,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <Box className="p-3">
                                    <List className="!p-0">
                                        {option && option.map((item) => (
                                            <ListItem
                                                key={item.label}
                                                className={`!px-3 !py-1.5 text-sm rounded-md cursor-pointer ${currentFilter === item.value
                                                    ? "bg-[#652CA0] text-white"
                                                    : ""
                                                    }`}
                                                onClick={() =>
                                                    handleSelect(
                                                        item.value,
                                                        item.label
                                                    )
                                                }
                                            >
                                                {item.label}
                                            </ListItem>
                                        ))}
                                        <Divider sx={{ my: 1 }} />
                                        <ListItem
                                            onClick={() =>
                                                handleSelect(null, "Custom range")
                                            }
                                            className={`!px-3 !py-1.5 text-sm rounded-md cursor-pointer ${isCustomRangeActive
                                                ? "bg-[#652CA0] text-white"
                                                : ""
                                                }`}
                                        >
                                            Custom range
                                        </ListItem>
                                    </List>
                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>

            {/* Custom Range Modal */}
            <Dialog
                open={showCustomRangeModal}
                onClose={() => setShowCustomRangeModal(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        padding: "20px",
                    },
                }}
            >
                <DialogContent sx={{ p: 0 }}>
                    <CustomDateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                        onApply={handleApplyCustomRange}
                        onReset={handleResetCustomRange}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
}