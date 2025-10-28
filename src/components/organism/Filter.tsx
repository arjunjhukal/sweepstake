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
} from "@mui/material";
import { ArrowDown2 } from "@wandersonalwes/iconsax-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import CustomDateRangePicker from "../molecules/DateRangePicker";

interface FilterOption {
    label: string;
    value: number | null;
}

interface FilterProps {
    option: FilterOption[];
    currentFilter: number | null;
    setFilterDays: React.Dispatch<React.SetStateAction<number | null>>;
    customRange: { startDate: string; endDate: string };
    setCustomRange: React.Dispatch<
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
    const [customRangeOpen, setCustomRangeOpen] = useState(false);
    const [startDate, setStartDate] = useState<Dayjs | null>(
        customRange.startDate ? dayjs(customRange.startDate) : null
    );
    const [endDate, setEndDate] = useState<Dayjs | null>(
        customRange.endDate ? dayjs(customRange.endDate) : null
    );

    const handleToggle = () => setOpen((prev) => !prev);

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current?.contains(event.target as Node)) return;
        setOpen(false);
    };

    const handleSelect = (value: number | null, label: string) => {


        setCustomRange({ startDate: "", endDate: "" });
        setStartDate(null);
        setEndDate(null);

        setFilterDays(value);
        setOpen(false);
    };

    const handleApplyCustomRange = () => {
        if (startDate && endDate) {
            setCustomRange({
                startDate: startDate.format("YYYY-MM-DD"),
                endDate: endDate.format("YYYY-MM-DD"),
            });
            setFilterDays(null);
            setCustomRangeOpen(false);
        }
    };

    const id = open ? "filter-popper" : undefined;

    return (
        <Box>
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
                                    <List className="!p-0 mb-3">
                                        {option.map((item) => (
                                            <ListItem
                                                key={item.label}
                                                className={`!px-3 !py-1.5 text-sm rounded-md cursor-pointer ${currentFilter === item.value
                                                    ? "bg-[#652CA0] text-white"
                                                    : ""
                                                    }`}
                                                onClick={() => handleSelect(item.value, item.label)}
                                            >
                                                {item.label}
                                            </ListItem>
                                        ))}
                                        <Divider sx={{ my: 1 }} />
                                        <ListItem
                                            onClick={() => {
                                                setOpen(false);
                                                setCustomRangeOpen(true);
                                            }}
                                            className="!px-3 !py-1.5 text-sm rounded-md cursor-pointer"
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

            <Popper
                open={customRangeOpen}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition

            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={300}>
                        <Paper elevation={3} sx={{ borderRadius: 3, mt: 1 }}>
                            <ClickAwayListener onClickAway={(event) => {
                                // Ignore clicks on MUI Select menus (rendered in Portal)
                                if ((event.target as HTMLElement).closest('.MuiPopover-root, .MuiBox-root,.MuiInputBase-root')) {
                                    return;
                                }
                                setCustomRangeOpen(false);
                            }}>
                                <Box className="p-3 w-[300px]">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <CustomDateRangePicker
                                            startDate={startDate}
                                            endDate={endDate}
                                            onStartDateChange={setStartDate}
                                            onEndDateChange={setEndDate}
                                            onApply={handleApplyCustomRange}
                                            onReset={() => {
                                                setStartDate(null);
                                                setEndDate(null);
                                                setCustomRangeOpen(false);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Box>
    );
}
