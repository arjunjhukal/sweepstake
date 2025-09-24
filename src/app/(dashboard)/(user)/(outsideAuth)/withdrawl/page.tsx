import WithdrawlPage from '@/components/pages/dashboard/userDashboard/withdrawl'
import { getAllGames, getUserGameBalance } from '@/serverApi/game';
import React from 'react'

export default async function Withdrawl() {
    const games = await getAllGames();
    const coins = await getUserGameBalance();
    return (
        <WithdrawlPage games={games} coins={coins} />
    )
}
