"use client";

import React from "react";
import AccountTab from "./AccountTab";
import TabController from "@/components/molecules/TabController";
import { Tab } from "@mui/material";
import WithdrawnHistoryPage from "@/components/pages/dashboard/userDashboard/withdrawlHistory";
import DepositHistoryPage from "@/components/pages/dashboard/userDashboard/depositHistory";
import { useSearchParams } from "next/navigation";
import { Coin, Coin1, User } from "@wandersonalwes/iconsax-react";

type AccountTabProps = "account" | "deposit" | "withdraw"
export default function ProfilePage() {
    const [currentActiveTab, setCurrentActiveTab] = React.useState<AccountTabProps>("account");
    const searchParams = useSearchParams();

    React.useEffect(() => {
        const page = searchParams.get("page");
        if (page === "deposit-history") setCurrentActiveTab("deposit");
        else if (page === "withdrawl-history") setCurrentActiveTab("withdraw");
        else setCurrentActiveTab("account");
    }, [searchParams]);

    const handleTabChange = (tab: string) => {
        setCurrentActiveTab(tab as AccountTabProps);
    };

    const renderTabContent = () => {
        switch (currentActiveTab) {
            case "account":
                return <AccountTab />;
            case "deposit":
                return <DepositHistoryPage />;
            case "withdraw":
                return <WithdrawnHistoryPage />;
            default:
                return null;
        }
    };
    return (
        <>
            <TabController links={[
                { label: "Account", value: "account", icon: <User className="mx-auto" /> },
                { label: "Deposit", value: "deposit", icon: <Coin className="mx-auto" /> },
                { label: "Withdraw", value: "withdraw", icon: <Coin1 className="mx-auto" /> },
            ]}
                currentTab={currentActiveTab}
                onTabChange={handleTabChange}
                linkClassName="lg:px-12"
            />

            {renderTabContent()}
        </>
    );
}
