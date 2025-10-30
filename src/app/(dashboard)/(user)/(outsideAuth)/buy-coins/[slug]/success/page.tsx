import GlassWrapper from '@/components/molecules/GlassWrapper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface PaymentSuccessProps {
    params: { slug: string }
}

export default function PaymentSuccess({ params }: PaymentSuccessProps) {
    const { slug } = params

    return (
        <GlassWrapper className="max-w-[520px] mx-auto flex flex-col gap-3 items-center text-center p-6">
            <Image
                src="/assets/images/verify-email.png"
                alt="Payment Success"
                width={180}
                height={140}
            />

            <h1 className="text-[24px] lg:text-[32px] leading-[120%] font-bold mb-4 text-green-500">
                Payment Successful 🎉
            </h1>

            <p className="text-[14px] leading-[150%] font-normal lg:text-[16px] mb-4">
                Your payment was processed successfully. You’ll be redirected to the game
                page shortly.
            </p>

            <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/exclusive-games/${slug}`}
                className="ss-btn bg-primary-grad"
            >
                View Game Detail
            </Link>
        </GlassWrapper>
    )
}
