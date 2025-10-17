"use client";

import React from 'react'
import AuthMessageBlock from '../authMessageBlock'
import ResetPasswordForm from './ResetPasswordForm';
import { Box } from '@mui/material';
import Link from 'next/link';
import { ArrowLeft } from '@wandersonalwes/iconsax-react';
import { PATH } from '@/routes/PATH';


export default function ResetPasswordPage() {

    return (
        <>
            <AuthMessageBlock
                title="Forgot your password? Let’s get you back in!"
                features={[
                    "Secure Account Recovery",
                    "Quick & Easy Process",
                    "No Worries, We've Got You Covered",
                    "24/7 Support Availability"
                ]}
            />
            <Box className="auth__form__wrapper lg:w-[50%] p-8">
                <div className="section__title mb-4 lg:mb-6">
                    <Link href={PATH.DASHBOARD.ROOT} className='text-[12px] leading-[120%] font-bold lg:text-[16px] hover:text-primary flex gap-2 items-center'><ArrowLeft />Back to Dashboard</Link>
                    <h1 className="text-[24px] leading-[120%] font-bold lg:text-[48px]">Forgot Password</h1>
                </div>
                <ResetPasswordForm />
            </Box>
        </>
    )
}
