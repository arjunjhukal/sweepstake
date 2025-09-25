import React from 'react'
import CredentialsCard from './CredentialsCard'
import { getUserGameBalance, getUserGameCredentials } from '@/serverApi/game';

export default async function GameCredentialsPage() {
    const creds = await getUserGameCredentials();
    const balance = await getUserGameBalance();
    return (
        <section className="credentials__listing ">
            <div className="section__title mb-8 lg:max-w-[521px]">
                <h1 className='mb-2 text-[24px] lg:text-[32px]'>Game Credentials</h1>
                <p className='text-[11px] lg:text-[14px]'>To start playing and cashing out your winnings, you’ll need a crypto wallet to purchase E-Credits and receive payouts. Don't worry—it’s quick and easy!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-2 lg:gap-4">
                {creds?.data.length ? creds?.data.map((cred) => (
                    <div className="col-span-1" key={cred.full_name}>
                        <CredentialsCard cred={cred} balance={balance} />
                    </div>
                )) : ""}
            </div>
        </section>
    )
}
