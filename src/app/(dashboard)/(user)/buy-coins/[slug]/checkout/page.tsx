
import BitCoinIcon from '@/icons/BitCoinIcon';
import GoldCoinIcon from '@/icons/GoldCoinIcon';
import { Box, Button } from '@mui/material';
import Image from 'next/image';
import React from 'react'

interface Props {
    searchParams: { amount?: string; bonus?: string };
    params: { slug: string };
}
export default async function CheckoutPage(props: Promise<Props>) {
    const { searchParams, params } = await props;
    const amount = searchParams.amount ? Number(searchParams.amount) : 0;
    const bonus = searchParams.bonus ? Number(searchParams.bonus) : 0;
    const slug = params.slug;
    return (
        <section className="checkout__root">
            <div className="grid grid-cols-12 gap-4 lg:gap-10 xl:gap-12">
                <div className="col-span-12 lg:col-span-4 ">
                    <Box className="coin__card" sx={{
                        borderRadius: "16px",
                        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), rgba(255, 255, 255, 0.10)",
                        padding: "16px"

                    }}>
                        <div className="title">
                            <h2 className='text-[28px]'>${amount}</h2>
                        </div>

                        <div className="footer mt-10">
                            <div className="coin-info flex justify-between items-center py-3 px-4"
                                style={{
                                    borderRadius: "16px",
                                    background: "linear-gradient(0deg, rgba(234, 47, 231, 0.10) 0%, rgba(234, 47, 231, 0.10) 100%), rgba(255, 255, 255, 0.10)"
                                }}
                            >
                                <div className="coin flex items-center gap-1">
                                    <GoldCoinIcon />
                                    <span className='text-[12px]'>Gold Coins</span>
                                </div>
                                <p>
                                    <strong className='text-[16px] block'>500</strong>
                                </p>

                            </div>
                            <div className="coin-info flex justify-between items-center py-3 px-4 mt-1"
                                style={{
                                    borderRadius: "16px",
                                    background: "linear-gradient(0deg, rgba(234, 47, 231, 0.10) 0%, rgba(234, 47, 231, 0.10) 100%), rgba(255, 255, 255, 0.10)"
                                }}
                            >
                                <div className="coin flex items-center gap-1">
                                    <GoldCoinIcon />
                                    <span className='text-[12px]'>Bonus Coins</span>
                                </div>
                                <p>
                                    <strong className='text-[16px] block'>{bonus}</strong>
                                </p>
                            </div>

                        </div>
                    </Box>
                </div>
                <div className="col-span-12 lg:col-span-8">
                    <Box>
                        <h1 className='mb-2 text-[24px] lg:text-[32px]'>Payment Method</h1>
                        <p className='text-[11px] lg:text-[13px]'>To start playing and cashing out your winnings, you’ll need a crypto wallet to purchase E-Credits and receive payouts. Don't worry—it’s quick and easy!</p>

                        <h2 className='text-[20px] lg:text-[24px]  mt-8 mb-4'>Select payment method</h2>
                        <div className="grid sm:grid-cols-2 mb-8">
                            <div className="col-span-1">
                                <div className="py-5 px-4 rounded-[8px]" style={{
                                    borderRadius: "8px",
                                    background: "linear-gradient(0deg, rgba(234, 47, 231, 0.10) 0%, rgba(234, 47, 231, 0.10) 100%), rgba(255, 255, 255, 0.10)",
                                }}>
                                    <span className="text-[14px] flex items-center justify-start gap-2"><BitCoinIcon />Crypto Currency</span>
                                </div>
                            </div>
                        </div>

                        <Button type='submit' variant='contained' color='primary' className='!mt-3' >Proceed to Payment</Button>

                        <p className="text-[11px] leading-[120%] mt-8 mb-2 text-center">Powered By</p>
                        <div className="flex justify-center items-center gap-4">
                            <Image src="/assets/images/payment-01.png" alt='' width={78} height={24} />
                            <Image src="/assets/images/payment-02.png" alt='' width={78} height={24} />
                            <Image src="/assets/images/payment-03.png" alt='' width={78} height={24} />
                        </div>
                    </Box>
                </div>
            </div>
        </section>
    )
}
