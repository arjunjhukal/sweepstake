
import GoldCoinIcon from '@/icons/GoldCoinIcon'
import SilverCoinIcon from '@/icons/SilverCoinIcon'
import { useGetUserBalanceQuery } from '@/services/userApi'
import { UserBalance } from '@/types/user'
import { Box, Popper, Paper, Fade, ClickAwayListener, IconButton } from '@mui/material'
import { CloseCircle } from '@wandersonalwes/iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function UserCoinCard() {
    const { data, isLoading } = useGetUserBalanceQuery();
    const [goldCoinPopperOpen, setGoldCoinPopperOpen] = React.useState(false);
    const [sweepsCoinPopperOpen, setSweepsCoinPopperOpen] = React.useState(false);

    const goldAnchorRef = React.useRef<HTMLDivElement | null>(null);
    const sweepsAnchorRef = React.useRef<HTMLDivElement | null>(null);

    const sweepsCoin: UserBalance = data?.data?.[0] ?? { providers: [] };

    return (
        <>
            <Box sx={{
                background: "linear-gradient(to right,#FFA325,#693C00)",
                padding: "1px",
                borderRadius: "40px"
            }}>
                <Box
                    ref={goldAnchorRef}
                    onClick={() => setGoldCoinPopperOpen(!goldCoinPopperOpen)}
                    sx={{
                        background: "#2D2D30",
                        borderRadius: "40px"
                    }}
                    className="flex justify-start items-center gap-1 py-2 pl-4 pr-8 cursor-pointer"
                >
                    <GoldCoinIcon />
                    <div className="coins">
                        <strong className="text-[12px] leading-4 font-[600] text-[#FBA027] block">{data?.data[1]?.value || 0}</strong>
                        <span className="text-[9px] mt-[-2px] hidden md:block">Gold Coins</span>
                    </div>
                </Box>
            </Box>

            <Popper
                open={goldCoinPopperOpen}
                anchorEl={goldAnchorRef.current}
                placement="bottom-end"
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={300}>
                        <Paper elevation={3} sx={{ borderRadius: 3, mt: 1 }}>
                            <ClickAwayListener onClickAway={() => setGoldCoinPopperOpen(false)}>
                                <Box className="p-6 w-[300px] lg:w-[438px]">
                                    <div className="text-right">
                                        <IconButton onClick={() => setGoldCoinPopperOpen(false)} className='!opacity-50'>
                                            <CloseCircle />
                                        </IconButton></div>

                                    <div className="header flex justify-start items-center gap-4 border-b border-[rgba(255,255,255,0.1)] pb-3 mb-6 ">
                                        <GoldCoinIcon />
                                        <div className="coin-detail ">
                                            <h2 className="text-[24px] leading-[120%] text-white">{data?.data[1]?.value || 0}</h2>
                                            <p className="text-[11px] text-[rgba(255,255,255,0.8)]">Gold Coins</p>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <p className="text-[11px] text-[rgba(255,255,255,0.8)] mb-6">Gold coins can be used to play all the games under the bonus categories. Enjoy all the bonus games and earn more coins.</p>
                                        <span className="block p-2 bg-[#FEDD3E] rounded-[6px] text-title text-[11px]">Gold coins cannot be redeemed for prizes and have no real value.</span>
                                    </div>
                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>

            <Box sx={{
                background: "linear-gradient(to right,#69A29D,#93E0D9)",
                padding: "1px",
                borderRadius: "40px"
            }}>
                <Box
                    ref={sweepsAnchorRef}
                    onClick={() => setSweepsCoinPopperOpen(!sweepsCoinPopperOpen)}
                    sx={{
                        background: "#2D2D30",
                        borderRadius: "40px"
                    }}
                    className="flex justify-start items-center gap-1 py-2 pl-4 pr-8 cursor-pointer"
                >
                    <SilverCoinIcon />
                    <div className="coins">
                        <strong className="text-[12px] leading-4 font-[600] text-[#93E0D8] block">{data?.data[0]?.value || 0}</strong>
                        <span className="text-[9px] mt-[-2px]  hidden md:block">Sweeps Coins</span>
                    </div>
                </Box>
            </Box>

            <Popper
                open={sweepsCoinPopperOpen}
                anchorEl={sweepsAnchorRef.current}
                placement="bottom-end"
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={300}>
                        <Paper elevation={3} sx={{ borderRadius: 3, mt: 1 }}>
                            <ClickAwayListener onClickAway={() => setSweepsCoinPopperOpen(false)}>
                                <Box className="p-6 w-[300px] lg:w-[438px]">
                                    <div className="text-right">
                                        <IconButton onClick={() => setSweepsCoinPopperOpen(false)} className='!opacity-50'>
                                            <CloseCircle />
                                        </IconButton></div>

                                    <div className="header flex justify-start items-center gap-4 border-b border-[rgba(255,255,255,0.1)] pb-3 mb-6 ">
                                        <SilverCoinIcon />
                                        <div className="coin-detail ">
                                            <h2 className="text-[24px] leading-[120%] text-white">{data?.data[1]?.value || 0}</h2>
                                            <p className="text-[11px] text-[rgba(255,255,255,0.8)]">Sweeps Coins</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {sweepsCoin?.providers?.length
                                            ? sweepsCoin.providers.map((coin) => (
                                                <div className="grid grid-cols-12 gap-4 pb-2 border-b border-[rgba(255,255,255,0.2)]" key={coin.name}>
                                                    <div className="col-span-5">
                                                        <div className="flex justify-start items-center gap-2">
                                                            <Image src={coin.icon} alt={coin.name} width={16} height={16} className='!rounded-full aspect-square' />
                                                            <p className="text-[11px] text-white font-[500]">{coin.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1">{coin.balance}</div>
                                                    <div className="col-span-6">
                                                        <div className="flex items-center justify-end gap-4">
                                                            <Link href={`/buy-coins/${coin.id}`} className='ss-btn !py-[6px] !px-[10px] bg-primary-grad text-[10px]'>
                                                                Buy Coin
                                                            </Link>
                                                            <Link href={`/withdrawl`} className='ss-btn !py-[6px] !px-[10px] bg-secondary-grad text-[10px]'>
                                                                Withdraw
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : ""}
                                    </div>
                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    )
}