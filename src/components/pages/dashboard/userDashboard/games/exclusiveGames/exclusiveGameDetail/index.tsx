
import React from "react";
import { GameItem, SingleGameResponse } from "@/types/game";
import Image from "next/image";
import { renderHTML } from "@/utils/RenderHTML";
import { Box, Button } from "@mui/material";
import SilverCoinIcon from "@/icons/SilverCoinIcon";
import ScreenShotSlider from "@/components/molecules/Sliders/ScreenShotSlider";
import CustomLightGallery from "@/components/organism/LightGallery";
import Link from "next/link";
import UserCoin from "./UserCoin";
import { redirect } from "next/dist/server/api-utils";
import GameIframeDialog from "./GameIframeDialog";

export default function ExclusiveGameDetail({ game }: { game: SingleGameResponse }) {

    console.log({ isIframe: game?.data?.is_iframe, gameUrl: game?.data?.game_url, redirect: game?.data?.has_redirection });

    return (
        <>
            <section className="detail__banner mb-8">
                <div className="md:grid md:grid-cols-12  flex flex-col gap-8 lg:gap-20">

                    <div className="col-span-12 md:col-span-4">
                        <div className="aspect-[420/433]  relative rounded-xl overflow-hidden">
                            <Image src={game?.data?.thumbnail || "/assets/images/fallback.png"} fill className="object-cover" alt={game?.data?.name} />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <div className="content__wrapper flex flex-col gap-4">
                            <ul className="flex gap-4">
                                {game?.data?.provider ? <li className="text-[9px] lg:text-[12px] leading-[188%] font-[400] rounded-[8px] px-2 py-[2px] bg-yellow-300 text-title">Game Type : {game?.data?.provider}</li> : ""}
                                {game?.data?.subgames?.length ? <li className="text-[9px] lg:text-[12px] leading-[188%] font-[400] rounded-[8px] px-2 py-[2px] bg-yellow-300 text-title">{game?.data?.subgames.length} Games</li> : ""}
                            </ul>
                            <div className="general-content-box styled-list !text-white">
                                <h1 className="text-[2rem]">{game?.data?.name}</h1>
                                {renderHTML(game?.data?.description)}
                            </div>
                            <div className="action__group flex  flex-col lg:flex-row flex-wrap gap-2">

                                <UserCoin slug={game?.data?.provider} />

                                <Box sx={{
                                    borderRadius: "16px"
                                }} className="flex justify-center items-center gap-2 py-4 px-6 bg-secondary-grad text-title">
                                    <div className="coins">
                                        <Link href={`/buy-coins/${game?.data?.id}`}>
                                            <strong className="text-[16px] leading-4 font-[600] block mb-1">+ Deposit Coins</strong>
                                        </Link>
                                    </div>
                                </Box>
                                {game?.data?.provider == "goldcoincity" ? "" : <Box sx={{
                                    borderRadius: "16px"
                                }} className="flex justify-center items-center gap-2 py-4 px-6 border border-secondary">
                                    <div className="coins">
                                        <Link href={`/withdrawl/${game?.data?.id}`}>
                                            <strong className="text-[16px] leading-4 font-[600] block mb-1 text-secondary">Withdraw Coins</strong>
                                        </Link>
                                    </div>
                                </Box>}

                            </div>
                            {
                                game?.data?.is_iframe
                                    ? (
                                        // <Link className="ss-btn bg-primary-grad" href={"#"} data-iframe-url={game?.data?.game_url}>
                                        //     Play Now
                                        // </Link>
                                        <GameIframeDialog
                                            gameName={game?.data?.name}
                                            gameUrl={game?.data?.game_url || ""}
                                        />
                                    )
                                    : game?.data?.game_url
                                        ? (
                                            <Link className="ss-btn bg-primary-grad" href={game.data.game_url} target={game?.data?.has_redirection ? "_blank" : "_self"} rel={game?.data?.has_redirection ? "noopener noreferrer" : ""}>
                                                Play Now
                                            </Link>
                                        )
                                        : null
                            }



                            {game?.data?.screenshots ? <ScreenShotSlider screenshots={game.data.screenshots} /> : ""}
                        </div>
                    </div>
                </div>
            </section >

            {game?.data?.subgames ? <section className="exclusive__game__gallery">
                <div className="section__title">
                    <h2 className="text-[14px] lg:text-[16px] mb-4">{game?.data?.name}</h2>
                </div>
                <CustomLightGallery images={game?.data?.subgames} column={7} aspectRatio="aspect-[212/120]" />
            </section> : ""}
        </>
    );
}
