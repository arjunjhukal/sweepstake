"use client";

import { Box, Button, CircularProgress } from "@mui/material";
import Image from "next/image";
import React from "react";
import BalanceRefresh from "./BalanceRefresh";
import { Coin } from "@wandersonalwes/iconsax-react";
import Link from "next/link";
import TapIcon from "@/icons/Tap";
import { CredentialsProps } from "@/types/game";
import { CardPasswordField } from "./CardPasswordHandler";
import CopyToClipboard from "./CopyToClipboard";
import GameIframeDialog from "../games/exclusiveGames/exclusiveGameDetail/GameIframeDialog";
import GlassWrapper from "@/components/molecules/GlassWrapper";
import { useGetUserBalanceBySlugQuery } from "@/services/userApi";

export default function CredentialsCard({ cred }: { cred: CredentialsProps }) {
    const {
        data: balanceData,
        isLoading: balanceLoading,
        isFetching,
        refetch,
    } = useGetUserBalanceBySlugQuery(
        { slug: cred?.name },
        { skip: !cred?.name }
    ) as any;

    const balance = balanceData?.data || null;
    console.log("Balance for", cred.name, balance);

    // Extract values
    const scValue = balance?.flag === "sc" ? balance.balance ?? 0 : null;
    const gcValue = balance?.flag === "gc" ? balance.balance ?? 0 : null;

    return (
        <GlassWrapper className="p-4 lg:p-6">
            {/* Header Section */}
            <div className="credentials__header flex gap-2">
                <Image
                    src={cred?.logo || "/assets/images/fallback.png"}
                    alt={cred?.full_name}
                    width={74}
                    height={74}
                    className="rounded-full aspect-square"
                    // ✅ Next.js LCP warning fix
                    priority={true}
                />
                <div className="game__detail flex flex-col">
                    <strong className="block text-[16px] text-white">
                        {cred.full_name}
                    </strong>

                    {balanceLoading ? (
                        <div className="flex items-center gap-2 mb-2">
                            <CircularProgress size={10} thickness={5} color="inherit" />
                            <span className="text-gray-400 text-[10px]">
                                Updating balance...
                            </span>
                        </div>
                    ) : (
                        <p className="text-[14px] my-[6px] uppercase">
                            {balance
                                ? balance.flag === "sc"
                                    ? `SC: ${scValue}`
                                    : balance.flag === "gc"
                                        ? `GC: ${gcValue}`
                                        : "N/A"
                                : "N/A"}
                        </p>
                    )}

                    {/* Refresh Button */}
                    <BalanceRefresh
                        label="Refresh Balance"
                        icon={true}
                        onClick={() => refetch()}
                        loading={isFetching}
                    />
                </div>
            </div>

            {/* Credentials Info */}
            <ul className="mt-4">
                <li className="py-2 border-t border-b border-[rgba(255,255,255,0.2)] grid grid-cols-2">
                    <span className="text-[12px] leading-[120%] font-[600]">Entries :</span>
                    <span className="text-[11px]">{cred.entries || "N/A"}</span>
                </li>
                <li className="py-2 border-b border-[rgba(255,255,255,0.2)] grid grid-cols-2">
                    <span className="text-[12px] leading-[120%] font-[600]">Username :</span>
                    <div className="flex justify-between items-center">
                        <span className="text-[11px]">
                            {cred?.credentials.username || "N/A"}
                        </span>
                        {cred.credentials.username && (
                            <CopyToClipboard text={cred.credentials.username} />
                        )}
                    </div>
                </li>
                <li className="py-2 border-b border-[rgba(255,255,255,0.2)] grid grid-cols-2">
                    <span className="text-[12px] leading-[120%] font-[600]">Password :</span>
                    <CardPasswordField password={cred?.credentials.password} />
                </li>
            </ul>

            {/* Action Buttons */}
            <div className="action__group mt-4 flex flex-col md:flex-row justify-between gap-2 md:gap-4">
                <Link
                    href={`/buy-coins/${cred?.id}`}
                    className="ss-btn bg-primary-grad flex justify-center items-center gap-1"
                >
                    <Coin /> Buy Coins
                </Link>

                {!cred.is_iframe ? (
                    <Link
                        href="#"
                        className="ss-btn bg-secondary-grad flex justify-center items-center text-[#426A66] gap-2"
                    >
                        <TapIcon />
                        Play Game
                    </Link>
                ) : (
                    <GameIframeDialog
                        gameName={cred?.full_name}
                        gameUrl={cred?.game_url || ""}
                        isCredCard={true}
                    />
                )}
            </div>
        </GlassWrapper>
    );
}
