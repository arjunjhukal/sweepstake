"use client";

import { PATH } from '@/routes/PATH';
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function VerifyEmail() {
    const router = useRouter();
    return (
        <Box className="max-w-[520px] mx-auto flex flex-col gap-3 items-center text-center">
            <Image src={"/assets/images/verify-email.png"} alt='' width={180} height={140} />
            <h1 className='text-[24px] lg:text-[32px] leading-[120%] font-bold mb-4'>Verify your email to
                get the fun started</h1>
            {/* <Typography variant="h1" className='font-[700]'></Typography> */}
            <p className='text-[14px] leading-[120%] font-normal lg:text-[16px] mb-4'>Check the link sent to <strong className='underline text-secondary'>abc@gmail.com</strong> to activate your account.</p>
            <Button fullWidth size="large" type="submit" variant="contained" color="primary" className='!mb-6' onClick={() => {
                router.replace(PATH.DASHBOARD.ROOT)
            }}>
                Verify now
            </Button>
            <h2 className='text-[20px] lg:text-[28px] leading-[120%] font-bold'>Don’t see the email?</h2>
            <p className='text-[11px] lg:text-[14px] leading-[150%] font-normal'>Please check <strong>your spam or junk folder,</strong> as the email may have been filtered there. Also, ensure that the email address you entered is correct. Still not found?</p>
            <Button fullWidth variant="contained" color="secondary">
                Send Again
            </Button>
        </Box>
    )
}
