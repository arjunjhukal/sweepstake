"use client";

import React from "react";
import AccountTab from "./AccountTab";
import TabController from "@/components/molecules/TabController";
import { Tab } from "@mui/material";
import WithdrawnHistoryPage from "@/components/pages/dashboard/userDashboard/withdrawlHistory";
import DepositHistoryPage from "@/components/pages/dashboard/userDashboard/depositHistory";

type AccountTabProps = "account" | "deposit" | "withdraw"
export default function ProfilePage() {
    const [currentActiveTab, setCurrentActiveTab] = React.useState<AccountTabProps>("account");

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
                { label: "Account", value: "account" },
                { label: "Deposit", value: "deposit" },
                { label: "Withdraw", value: "withdraw" },
            ]}
                currentTab={currentActiveTab}
                onTabChange={handleTabChange} />

            {renderTabContent()}
        </>
    );
}
