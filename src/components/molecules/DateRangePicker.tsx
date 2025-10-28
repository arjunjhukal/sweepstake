"use client";

import React, { useState } from "react";
import { Box, Button, Select, MenuItem, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface DateRangePickerProps {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    onStartDateChange: (date: Dayjs | null) => void;
    onEndDateChange: (date: Dayjs | null) => void;
    onApply: () => void;
    onReset: () => void;
}

export default function DateRangePicker({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onApply,
    onReset,
}: DateRangePickerProps) {
    const [currentMonth, setCurrentMonth] = useState(dayjs().month());
    const [currentYear, setCurrentYear] = useState(dayjs().year());

    const handleDateClick = (date: Dayjs) => {
        if (!startDate || (startDate && endDate)) {
            // Start new selection
            onStartDateChange(date);
            onEndDateChange(null);
        } else if (startDate && !endDate) {
            // Complete the range
            if (date.isBefore(startDate)) {
                onStartDateChange(date);
                onEndDateChange(startDate);
            } else {
                onEndDateChange(date);
            }
        }
    };

    const isInRange = (date: Dayjs) => {
        if (!startDate || !endDate) return false;
        return date.isAfter(startDate) && date.isBefore(endDate);
    };

    const isSelected = (date: Dayjs) => {
        if (!startDate && !endDate) return false;
        return (
            date.isSame(startDate, "day") ||
            date.isSame(endDate, "day")
        );
    };

    const isToday = (date: Dayjs) => {
        return date.isSame(dayjs(), "day");
    };

    const generateCalendarDays = () => {
        const startOfMonth = dayjs()
            .year(currentYear)
            .month(currentMonth)
            .startOf("month");
        const endOfMonth = startOfMonth.endOf("month");
        const startDate = startOfMonth.startOf("week");
        const endDate = endOfMonth.endOf("week");

        const days = [];
        let day = startDate;

        while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
            days.push(day);
            day = day.add(1, "day");
        }

        return days;
    };

    const days = generateCalendarDays();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

    return (
        <Box >
            {/* Month and Year Selectors */}
            <Box className="flex gap-2 mb-4">
                <Select
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(e.target.value as number)}
                    size="small"
                    sx={{
                        flex: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        "& .MuiSvgIcon-root": { color: "white" },
                    }}
                >
                    {months.map((month, idx) => (
                        <MenuItem key={month} value={idx}>
                            {month}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value as number)}
                    size="small"
                    sx={{
                        flex: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        "& .MuiSvgIcon-root": { color: "white" },
                    }}
                >
                    {years.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Weekday Headers */}
            <Box className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <Typography
                        key={day}
                        className="text-center !text-[10px] text-white/70 py-1"
                    >
                        {day}
                    </Typography>
                ))}
            </Box>

            {/* Calendar Days */}
            <Box className="grid grid-cols-7 gap-1 mb-4">
                {days.map((day, idx) => {
                    const isCurrentMonth = day.month() === currentMonth;
                    const selected = isSelected(day);
                    const inRange = isInRange(day);
                    const today = isToday(day);

                    return (
                        <Box
                            key={idx}
                            onClick={() => handleDateClick(day)}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 36,
                                aspectRatio: 1 / 1,
                                cursor: "pointer",
                                // borderRadius: 1,
                                fontSize: "14px",
                                borderRadius: "50%",
                                fontWeight: today || selected ? 600 : 400,
                                color: isCurrentMonth ? "white" : "rgba(255, 255, 255, 0.4)",
                                backgroundColor: selected || inRange
                                    ? "#b801c0"
                                    : today
                                        ? "white"
                                        : "rgba(255, 255, 255, 0.1)",
                                border: today && !selected ? "1px solid #E91E63" : "none",
                                "&:hover": {
                                    backgroundColor: selected || inRange
                                        ? "#b801c0"
                                        : "rgba(255, 255, 255, 0.1)",
                                },
                                ...(today && !selected && { color: "#652CA0" }),
                            }}
                        >
                            {day.date()}
                        </Box>
                    );
                })}
            </Box>

            {/* Action Buttons */}
            <Box className="flex justify-end gap-2">
                <Button
                    size="small"
                    onClick={onReset}
                    variant="contained"
                    color="secondary"
                >
                    Reset
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={onApply}
                >
                    Apply
                </Button>
            </Box>
        </Box >
    );
}