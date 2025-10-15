'use client';

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CloseCircle } from "@wandersonalwes/iconsax-react";
import TapIcon from "@/icons/Tap";

interface GameIframeDialogProps {
    gameName: string;
    gameUrl: string;
    triggerButtonText?: string;
    buttonClassName?: string;
    isCredCard?: boolean;
}

export default function GameIframeDialog({
    gameName,
    gameUrl,
    triggerButtonText = "Play Now",
    buttonClassName = "ss-btn bg-primary-grad",
    isCredCard
}: GameIframeDialogProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {isCredCard ? <button className='ss-btn bg-secondary-grad flex justify-center items-center text-[#426A66] gap-2' onClick={handleOpen}>
                <TapIcon />
                Play Game
            </button> : <button className={buttonClassName} onClick={handleOpen}>
                {triggerButtonText}
            </button>}

            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>
                    {gameName}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseCircle />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ height: "80vh", p: 0 }}>
                    <iframe
                        src={gameUrl}
                        title={gameName}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
