"use client";
import { useAppSelector } from "@/hooks/hook";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AgeVerificationModal() {
    const user = useAppSelector((state) => state.auth.user);
    const [open, setOpen] = useState(true);

    const handleConfirmAge = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        window.location.href = "about:blank";
    };

    useEffect(() => {
        if (user) {
            setOpen(false);
        }
    }, [user]);
    return (
        <Dialog
            open={open}
            aria-labelledby="age-verification-dialog"
            disableEscapeKeyDown
            sx={{
                "& .MuiBackdrop-root": {
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                },
            }}
        >
            <DialogContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Age Verification Required
                </Typography>
                <Typography mb={2}>
                    This site is restricted to users who are below 21 years of age.
                    Please confirm your age to proceed.
                </Typography>
                <Typography variant="body2" mb={3}>
                    By clicking "I am over 21", you agree that you meet the minimum age requirement.
                    If you are under 21, you will not be able to access this site.
                </Typography>

                <Box mt={2} display="flex" gap={1} justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                        sx={{ ml: 1 }}
                    >
                        I am under 21
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleConfirmAge}>
                        I am over 21
                    </Button>

                </Box>
            </DialogContent>
        </Dialog>
    );
}
