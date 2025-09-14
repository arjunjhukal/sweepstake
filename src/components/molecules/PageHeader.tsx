import { Box } from '@mui/material'
import React from 'react'
import Breadcrumb from './Breadcrumb'
import Link from 'next/link'

export default function PageHeader({ title, cta }: { title?: string, cta?: { label: string, url: string } }) {
    return (
        <Box className='flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6'>
            <div className="header__left">
                <Breadcrumb />
                {title && <h1 className="text-[24px] leading-[133%] font-bold text-title">{title}</h1>}
            </div>
            {cta && (
                <div className="header__right">
                    <Link href={cta.url} className="ss-btn bg-primary-grad text-white hover:opacity-90">
                        {cta.label}
                    </Link>
                </div>
            )}
        </Box>
    )
}
