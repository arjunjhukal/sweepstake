import { Box, Button } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import BalanceRefresh from './BalanceRefresh'
import { Coin, Copy } from '@wandersonalwes/iconsax-react'
import Link from 'next/link'
import TapIcon from '@/icons/Tap'
import { CredentialsProps } from '@/types/game'
import { CardPasswordField } from './CardPasswordHandler'
import CopyToClipboard from './CopyToClipboard'


export default function CredentialsCard({ cred, balance }: { cred: CredentialsProps; balance: any }) {
    const currentBalance = balance?.data?.game_information?.[cred.name] || null;

    const scValue =
        currentBalance?.type === "sc" ? currentBalance.balance ?? 0 : null;
    const gcValue =
        currentBalance?.type === "gc" ? currentBalance.balance ?? 0 : null;
    return (
        <Box sx={{
            borderRadius: "24px",
            background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), rgba(255, 255, 255, 0.10)",
        }} className="p-4 lg:p-6">
            <div className="credentials__header flex gap-2">
                <Image src={cred?.logo || "/assets/images/fallback.png"} alt={cred?.full_name} className='rounded-full aspect-square' width={74} height={74} />
                <div className="game__detail">
                    <strong className='block text-[16px] text-white'>{cred.full_name}</strong>
                    <p className="text-[14px] my-[6px] uppercase">
                        {currentBalance?.type === "sc" && `sc: ${scValue ?? "N/A"}`}
                        {currentBalance?.type === "gc" && `gc: ${gcValue ?? "N/A"}`}
                    </p>

                    <BalanceRefresh label='Refresh Balance' icon={true} />
                </div>
            </div>
            <ul className='mt-4'>
                <li className='py-2 border-t border-b border-[rgba(255,255,255,0.2)]  grid grid-cols-2'>
                    <span className='text-[12px] leading-[120%] font-[600]'>Entries :</span>
                    <span className='text-[11px]'>{cred.entries || "N/A"}</span>
                </li>
                <li className='py-2 border-b border-[rgba(255,255,255,0.2)] grid grid-cols-2'>
                    <span className='text-[12px] leading-[120%] font-[600]'>Username :</span>
                    <div className="flex justify-between items-center">
                        <span className='text-[11px]'>{cred?.credentials.username || "N/A"}</span>
                        {cred.credentials.username && <CopyToClipboard text={cred.credentials.username} />}
                    </div>
                </li>
                <li className='py-2 border-b border-[rgba(255,255,255,0.2)] grid grid-cols-2'>
                    <span className='text-[12px] leading-[120%] font-[600]'>Password :</span>
                    <CardPasswordField password={cred?.credentials.password} />
                </li>
            </ul>
            <div className="action__group mt-4 flex flex-col md:flex-row justify-between gap-2 md:gap-4">
                <Link href={`/buy-coins/${cred?.id}`} className='ss-btn bg-primary-grad flex justify-center items-center gap-1'><Coin />Buy Coins</Link>
                <Link href={cred.game_url} target='_blank' className='ss-btn bg-secondary-grad flex justify-center items-center text-[#426A66] gap-2 '>
                    <TapIcon />
                    Play Game
                </Link>
            </div>
        </Box>
    )
}
