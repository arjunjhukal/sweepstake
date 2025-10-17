// import VerifyOTPPage from '@/components/pages/auth/VerifyOtp'
import GlobalLoading from '@/components/organism/GlobalLoading'
import VerifyOTPPage from '@/components/pages/auth/VerifyOtp'
import React, { Suspense } from 'react'

export default function VerifyOTP() {
    return (
        <Suspense fallback={<GlobalLoading />}>
            <VerifyOTPPage />
        </Suspense>
    )
}
