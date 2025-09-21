import TabController from '@/components/molecules/TabController';
import EditIcon from '@/icons/EditIcon';
import { Coin, User } from '@wandersonalwes/iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function AccountLayout({ children, page }: { children: React.ReactNode; page: React.ReactNode }) {

    const links = [

        {
            href: "/account/profile/account", label: "Account", icon: <User className='mx-auto' />
        },
        {
            href: "/account/deposit-history", label: "Deposit History",
            icon: <Coin className='mx-auto' />
        },
        { href: "/account/withdrawl-history", label: "Withdrawal History", icon: <Coin className='mx-auto' /> },
    ];
    return (
        <section className="account__root">
            {/* Sidebar */}
            <TabController links={links} />
            <>
                {page}
            </>
        </section>
    );
}
