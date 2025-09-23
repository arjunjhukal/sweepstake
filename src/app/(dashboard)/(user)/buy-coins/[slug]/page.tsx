import BuyCoinSinlgeGame from '@/components/pages/dashboard/userDashboard/buyCoins/buyCoinSinlgeGame'
import React from 'react'

export default async function SingleGameCoinPacks(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;
    return (
        <BuyCoinSinlgeGame slug={slug} />
    )
}
