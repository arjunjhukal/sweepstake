import { PATH } from '@/routes/PATH';
import ProtectedLink from '@/routes/ProtectedLink';
import { getAllGames } from '@/serverApi/game';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function ExclusiveGamePage() {
    const games = await getAllGames();
    return (
        <section className="exclusive__game__root">
            <h2 className='mb-4 text-[20px] leading-[140%]'>Exclusive Games</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {/* {
                    games?.data?.data.map((game) => (
                        <a href={`exlusive-games/${game.id}`} className="group block  overflow-hidden  hover:shadow-md transition rounded-2xl aspect-[208/222] relative" key={game.id}>
                            <Tooltip title={game.name}>
                                <Image
                                    src={game.thumbnail || "/assets/images/fallback.png"}
                                    alt={game.name}
                                    fill
                                    className="w-full h-[222px] object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </Tooltip>
                        </a>
                    ))
                } */}
            </div>
        </section>
    )
}
