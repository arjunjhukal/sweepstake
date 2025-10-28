"use client";

import React from "react";
import AccountTab from "./AccountTab";
import TabController from "@/components/molecules/TabController";
import { Tab } from "@mui/material";
import WithdrawnHistoryPage from "@/components/pages/dashboard/userDashboard/withdrawlHistory";
import DepositHistoryPage from "@/components/pages/dashboard/userDashboard/depositHistory";
import { useSearchParams } from "next/navigation";
import { Coin, Coin1, User } from "@wandersonalwes/iconsax-react";
import SelectField from "@/components/atom/SelectField";
import Filter from "@/components/organism/Filter";

type AccountTabProps = "account" | "deposit" | "withdraw"

export default function ProfilePage() {
    const [currentActiveTab, setCurrentActiveTab] = React.useState<AccountTabProps>("account");
    const searchParams = useSearchParams();
    const [filterDays, setFilterDays] = React.useState<number | null>(null)
    const [customRange, setCustomRange] = React.useState({ startDate: "", endDate: "" })

    React.useEffect(() => {
        const page = searchParams.get("page");
        if (page === "deposit-history") setCurrentActiveTab("deposit");
        else if (page === "withdrawl-history") setCurrentActiveTab("withdraw");
        else setCurrentActiveTab("account");
    }, [searchParams]);

    const handleTabChange = (tab: string) => {
        setCurrentActiveTab(tab as AccountTabProps);
        setFilterDays(null);
        setCustomRange({ startDate: "", endDate: "" })
    };

    const renderTabContent = () => {
        switch (currentActiveTab) {
            case "account":
                return <AccountTab />;
            case "deposit":
                return <DepositHistoryPage
                    currentFilter={filterDays}
                    customRange={customRange}
                />;
            case "withdraw":
                return <WithdrawnHistoryPage
                    currentFilter={filterDays}
                    customRange={customRange}
                />;
            default:
                return null;
        }
    };
    return (
        <>
            <div className="flex justify-between items-center gap-4 flex-wrap w-full">
                <TabController links={[
                    { label: "Account", value: "account", icon: <User className="mx-auto" /> },
                    { label: "Deposit", value: "deposit", icon: <Coin className="mx-auto" /> },
                    { label: "Withdraw", value: "withdraw", icon: <Coin1 className="mx-auto" /> },
                ]}
                    currentTab={currentActiveTab}
                    onTabChange={handleTabChange}
                    linkClassName="lg:px-12"
                />
                {currentActiveTab !== "account" ? <Filter option={[
                    { label: "All", value: null },
                    { label: "Last 30 Days", value: 30 },
                    { label: "Last 15 Days", value: 15 },
                    { label: "Last 7 Days", value: 7 }
                ]}
                    currentFilter={filterDays}
                    customRange={customRange}
                    setFilterDays={setFilterDays}
                    setCustomRange={setCustomRange}
                /> : ""}
            </div>
            {renderTabContent()}
        </>
    );
}
