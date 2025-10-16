"use client";

import React from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import { CloseCircle } from "@wandersonalwes/iconsax-react";

import { closeToast } from "@/slice/toastSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";

export default function Toast() {
    const { variant, message, isActive, autoTimeout, duration } = useAppSelector(
        (state) => state.toastSlice
    );
    const dispatch = useAppDispatch();


    React.useEffect(() => {
        if (isActive && autoTimeout) {
            const timeout = setTimeout(() => {
                dispatch(closeToast());
            }, duration || 3000);
            return () => clearTimeout(timeout);
        }
    }, [isActive, duration, autoTimeout, dispatch]);

    const currentVariant = variant?.toLowerCase() || "info";

    return (
        <Snackbar
            open={isActive}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            onClose={() => dispatch(closeToast())}
            autoHideDuration={autoTimeout ? duration || 3000 : null}
            sx={{ zIndex: 9999 }}
        >
            <Alert
                severity={currentVariant as "success" | "error" | "warning" | "info"}
                variant="filled"
                sx={{ width: "100%" }}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => dispatch(closeToast())}
                    >
                        <CloseCircle size="16" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
