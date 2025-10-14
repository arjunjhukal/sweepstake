import GoldCoinIcon from '@/icons/GoldCoinIcon'
import { Box, Button, OutlinedInput } from '@mui/material'
import { Coin } from '@wandersonalwes/iconsax-react'
import Link from 'next/link'
import React from 'react'
import CoinCalculator from './CoinCalculator'

export default function BuyCoinSinlgeGame({ slug }: { slug: string }) {
    const packs = [
        {
            amount: "10",
            label: "Starter Pack",
            coin: "100",
            bonus: "10",
            tag: "popular"
        },
        {
            amount: "20",
            label: "Golden Pack",
            coin: "200",
            bonus: "20",
        },
        {
            amount: "50",
            label: "Legend Pack",
            coin: "500",
            bonus: "50",
        },

    ]
    return (
        <section className="buy__coin__root">
            <div className="section__title mb-4 lg:mb-8 max-w-[520px]">
                <h1 className='mb-2 text-[24px] lg:text-[32px]'>Buy Coins</h1>
                <p className='text-[11px] lg:text-[13px]'>To start playing and cashing out your winnings, you’ll need a crypto wallet to purchase E-Credits and receive payouts. Don't worry—it’s quick and easy!</p>
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {
                    packs.map((pack) => (

                        <div className="col-span-1 h-full glass" key={pack.label}>
                            <Box className="coin__card" sx={{
                                borderRadius: "16px",
                                background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), rgba(255, 255, 255, 0.10)",
                                padding: "16px"

                            }}>
                                <div className="title">
                                    <h2 className='text-[28px]'>${pack.amount}</h2>
                                    <span className='text-[12px]'>{pack.label}</span>
                                </div>

                                <div className="footer">
                                    <div className="coin-info mt-10 flex justify-between items-center py-3 px-4 mb-4"
                                        style={{
                                            borderRadius: "16px",
                                            background: "linear-gradient(0deg, rgba(234, 47, 231, 0.10) 0%, rgba(234, 47, 231, 0.10) 100%), rgba(255, 255, 255, 0.10)"
                                        }}
                                    >
                                        <div className="coin flex gap-1">
                                            <GoldCoinIcon />
                                            <p>
                                                <strong className='text-[16px] block'>{pack.coin}</strong>
                                                <span className='text-[12px]'>Gold Coins</span>
                                            </p>
                                        </div>
                                        <div className="bonus">
                                            <strong className='text-[16px] block'>+{pack.bonus}</strong>
                                            <span className='text-[12px]'>bonus</span>
                                        </div>
                                    </div>

                                    <Link href={`/buy-coins/${slug}/checkout?amount=${pack.amount}&bonus=${pack.bonus}`} className='ss-btn bg-primary-grad !text-white flex justify-center items-center'><Coin />Buy Coins</Link>
                                </div>
                            </Box>
                        </div>
                    ))
                }
                <div className="col-span-1 h-full">
                    <CoinCalculator slug={slug} />
                </div>
            </div >
        </section >
    )
}
