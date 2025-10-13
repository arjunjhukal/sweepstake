import TabController from '@/components/molecules/TabController';
import EditIcon from '@/icons/EditIcon';
import { Coin, User } from '@wandersonalwes/iconsax-react';

import React from 'react'

export default function AccountLayout({ children }: { children: React.ReactNode; }) {
    return (
        <section className="account__root">
            {children}
        </section>
    );
}
