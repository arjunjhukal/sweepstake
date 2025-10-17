"use client";

import { useAppDispatch } from '@/hooks/hook';
import { PATH } from '@/routes/PATH';
import { useSendVerificationLinkAgainMutation } from '@/services/authApi';
import { showToast, ToastVariant } from '@/slice/toastSlice';
import { Box, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [sendEmailVerificationAgain, { isLoading: sendingLink }] = useSendVerificationLinkAgainMutation();
    const dispatch = useAppDispatch();

    const handleLinkResend = async () => {
        try {
            const response = await sendEmailVerificationAgain({ email: email || "" }).unwrap();
            dispatch(
                showToast({
                    message: response?.message || "Link sent successfully",
                    variant: ToastVariant.SUCCESS,
                    autoTime: true,
                }),
            );
        } catch (e: any) {
            dispatch(
                showToast({
                    message: e?.data?.message || "Unable to send link. Try again later",
                    variant: ToastVariant.ERROR,
                    autoTime: true,
                }),
            );
        }
    };

    return (
        <Box className="max-w-[520px] mx-auto flex flex-col gap-3 items-center text-center">
            <Image src="/assets/images/verify-email.png" alt="" width={180} height={140} />
            <h1 className="text-[24px] lg:text-[32px] leading-[120%] font-bold mb-4">
                Verify your email to get the fun started
            </h1>
            <p className="text-[14px] leading-[120%] font-normal lg:text-[16px] mb-4">
                Check the link sent to <strong className="underline text-secondary">{email}</strong> to activate your account.
            </p>
            <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                className="!mb-6"
                onClick={() => router.replace(PATH.AUTH.LOGIN.ROOT)}
            >
                Verify now
            </Button>
            <h2 className="text-[20px] lg:text-[28px] leading-[120%] font-bold">Don’t see the email?</h2>
            <p className="text-[11px] lg:text-[14px] leading-[150%] font-normal">
                Please check <strong>your spam or junk folder,</strong> as the email may have been filtered there. Also, ensure that
                the email address you entered is correct. Still not found?
            </p>
            <Button fullWidth variant="contained" color="secondary" onClick={handleLinkResend}>
                {sendingLink ? "Sending Again..." : "Send Again"}
            </Button>
        </Box>
    );
}

export default function VerifyEmail() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
