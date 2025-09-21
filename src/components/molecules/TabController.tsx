"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function TabController({ links }: {
    links: {
        href: string;
        label: string;
        icon?: React.ReactNode;
    }[]
}) {
    const pathname = usePathname();

    return (
        <nav className="flex gap-4 mb-4">
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`tab__link p-4 text-[14px] text-center ${isActive ? "active " : ""
                            }`}
                    >
                        {link.icon && link.icon}
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    )
}
