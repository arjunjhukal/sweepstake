// "use client";

import TabController from "@/components/molecules/TabController";
import UserProfileCard from "@/components/organism/Cards/UserProfileCard";
import { getUserGameBalance } from "@/serverApi/game";


export default async function ProfileTabs({ section }: { section: React.ReactNode }) {
    const balance = await getUserGameBalance();

    const links = [
        { href: "/account/profile/account", label: "Account Details" },
        { href: "/account/profile/wallet", label: "Wallet Information" },
        { href: "/account/profile/change-password", label: "Change Password" },
    ];

    return (

        <div className='profile__root'>
            <div className="grid lg:grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-5">
                    <UserProfileCard balance={balance} />
                </div>
                <div className="col-span-12 lg:col-span-7">
                    <TabController links={links} />
                    {section}
                </div>
            </div>
        </div>
    );
}
