import TableHeader from '@/components/molecules/TableHeader';
import CustomLightGallery from '@/components/organism/LightGallery';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TransactionBlock from './Transaction';

export default function GameDetailPage() {
    const screenshots = Array.from({ length: 12 }).map(
        () => "/assets/images/auth-image.png"
    );

    const relatedGames = Array.from({ length: 8 }).map(
        () => "/assets/images/auth-image.png"
    );
    return (
        <>
            <section className="game__detail__intro mb-14">
                <div className="lg:grid grid-cols-12 gap-8 xl:gap-10">
                    <div className="lg:col-span-5 xl:col-span-4 game__featured__image relative aspect-[338/338] rounded-[10px] overflow-hidden">
                        <Image src={"/assets/images/fallback.png"} alt="Game Name" fill className="object-cover" />
                    </div>
                    <div className="game__content lg:col-span-7 xl:col-span-8">
                        <div className="flex items-start justify-between pb-6 mb-6 border-b-[1px] border-solid border-[rgba(0,0,0,0.1)]">
                            <div className="section__title">
                                <strong className="text-bold block mb-6 text-[12px]">
                                    Active Players:{" "}
                                    <span className="bg-primary-light rounded-[20px] py-1 px-2">
                                        6985
                                    </span>
                                </strong>
                                <h1 className='text-[24px] leading-[133%] mb-4'>Panda Master</h1>
                                <ul className="flex justify-start items-center gap-12">
                                    <li className='flex gap-2' >
                                        <p className="mb-1 text-[14px] leading-[120%] text-para-light">
                                            Type:
                                        </p>
                                        <strong className="text-[14px] leading-[120%] font-[500] text-title">
                                            Fishing
                                        </strong>
                                    </li>
                                    <li className='flex gap-2' >
                                        <p className="mb-1 text-[14px] leading-[120%] text-para-light">
                                            Provider:
                                        </p>
                                        <strong className="text-[14px] leading-[120%] font-[500] text-title">
                                            PG Soft
                                        </strong>
                                    </li>
                                </ul>
                            </div>
                            <Link href={"/games/1"} className='ss-btn bg-primary-grad max-w-fit text-white'>Edit Game Details</Link>
                        </div>

                        <div className="general-content-box content mb-6">
                            <p>Diner Frenzy Spins is a fast-paced, food-themed slot game where sizzling reels serve up delicious wins. Set in a retro diner, it features wild symbols, bonus rounds, and free spin combos that bring the kitchen chaos to life with every spin. With exciting bonus rounds, wild symbols, and free spin feature.. Read More</p>
                        </div>

                        <div className="game__key__highlight flex justify-between lg:flex-row flex-col gap-4 py-5 px-6 bg-[rgba(143,167,226,0.10)] rounded-[8px]">
                            <div className="highlight">
                                <p className='text-[12px] leading-[120%] font-[500] text-para-light'>This week total Screentime</p>
                                <strong className='text-[16px] leading-[120%] font-[600]'>689hr</strong>
                            </div>
                            <div className="highlight">
                                <p className='text-[12px] leading-[120%] font-[500] text-para-light'>Available Credit</p>
                                <strong className='text-[16px] leading-[120%] font-[600]'>$326,126.05 <span className='text-[12px] leading-[120%] font-[500] text-para-light'>/100,000</span></strong>
                            </div>
                            <div className="highlight">
                                <p className='text-[12px] leading-[120%] font-[500] text-para-light'>Unsettled Credit</p>
                                <strong className='text-[16px] leading-[120%] font-[600]'>$326,126.05 <span className='text-[12px] leading-[120%] font-[500] text-para-light'>/100,000</span></strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {screenshots.length ? <section className="game__screenshots mb-14">
                <div className="section-title mb-4">
                    <h2 className="text-[20px] leading-[140%] font-[600]">
                        Uploaded Game-Screenshots
                    </h2>
                </div>
                <CustomLightGallery images={screenshots} />
            </section> : null}


            {relatedGames.length ? <section className="game__screenshots mb-14">
                <div className="section-title mb-4">
                    <h2 className="text-[20px] leading-[140%] font-[600]">
                        Games Under Diner Frenzy Spins
                    </h2>
                </div>
                <CustomLightGallery images={relatedGames} aspectRatio='aspect-[148/164]' column="7" />
            </section> : null}

            <TransactionBlock />

        </>
    )
}
