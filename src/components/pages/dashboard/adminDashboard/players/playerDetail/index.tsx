"use client"
import CreditCard from '@/components/organism/Charts/CreditCard'
import EditIcon from '@/icons/EditIcon'
import { PATH } from '@/routes/PATH'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GameTransactionTable from '../../games/GameDetail/Transaction'
import TransactionTable from '../../transaction/TransactionTable'
import { useAppSelector } from '@/hooks/hook'
import { formatDateTime } from '@/utils/formatDateTime'
import { useGetPlayerBalanceByIdQuery, useGetPlayerByIdQuery } from '@/services/playerApi'
import TableHeader from '@/components/molecules/TableHeader'

const games = [
    {
        name: "Firekirin",
        img: "/images/firekirin.png",
        amount: "10K",
        percentage: 10,
    },
    {
        name: "Ultrapanda",
        img: "/images/ultrapanda.png",
        amount: "10K",
        percentage: 45,
    },
    {
        name: "Panda Master",
        img: "/images/panda-master.png",
        amount: "10K",
        percentage: 45,
    },
    {
        name: "Fish Master",
        img: "/images/fish-master.png",
        amount: "10K",
        percentage: 45,
    },
];

export default function PlayerDetailPage({ id }: { id: number }) {
    const [search, setSearch] = React.useState("");
    const { data, isLoading } = useGetPlayerByIdQuery({ id }, {
        skip: !id
    })
    const { data: userBalance, isLoading: loadingBalance } = useGetPlayerBalanceByIdQuery(
        { id: String(id) },
        { skip: !id }
    );

    const { date } = formatDateTime(data?.data?.registered_date as string);

    return (
        <>
            <section className="player__detail__intro mb-12 lg:mb-16">
                <div className="grid grid-cols-12 gap-8 lg:gap-10">
                    <div className="col-span-12 md:col-span-5">
                        <div className="player__info text-center  rounded-xl lg:rounded-3xl border border-gray p-8 lg:py-10 lg:px-9">
                            <div className="player__profile bg-primary-grad p-[1px] rounded-full max-w-fit mx-auto relative">
                                <Image src={"/assets/images/auth-image.png"} alt='' width={100} height={100} className=' aspect-square rounded-full border-[5px] border-solid border-white' />
                                <div className="absolute left-[50%] translate-x-[-50%] bottom-[-10px]">
                                    <EditIcon />
                                </div>
                            </div>
                            <h1 className="text-24 lg:text-[32px] text-title my-1">{data?.data?.name}</h1>

                            <p className="text-para-light text-[11px] lg:text-[14px]">Joined: {date}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                <div className="col-span-1 md:col-span-2 bg-light-gray rounded-[14px] p-4 lg:py-6">
                                    <div className="flex justify-center items-center gap-3">
                                        <Image src={data?.data?.profile_image_file || "/assets/images/current-balance.svg"} alt='' width={48} height={48} />
                                        <div className="content mt-3 text-start">
                                            <strong className="text-[12px] leading-[120%] font-[700] text-primary block ">${userBalance?.data?.current_balance || 0}</strong>
                                            <span className="text-para-light text-[9px]">Current Balance</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-light-gray rounded-[14px] p-4 lg:py-6">
                                    <Image src={"/assets/images/deposit.svg"} alt='' width={48} height={48} className='mx-auto' />
                                    <div className="content mt-3 ">
                                        <strong className="text-[12px] leading-[120%] font-[700] text-primary block ">${userBalance?.data?.total_deposited || 0}</strong>
                                        <span className="text-para-light text-[9px]">Total Deposited</span>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-light-gray rounded-[14px] p-4 lg:py-6">
                                    <Image src={"/assets/images/withdrawn.svg"} alt='' width={48} height={48} className='mx-auto' />
                                    <div className="content mt-3">
                                        <strong className="text-[12px] leading-[120%] font-[700] text-primary block ">${userBalance?.data?.total_withdrawl || 0}</strong>
                                        <span className="text-para-light text-[9px]">Total Withdrawn</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                        <div className="bg-white rounded-3xl p-6 lg:p-10">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl lg:text-2xl font-semibold">Player Details</h2>
                                <Link href={`/players/2`} className="ss-btn bg-primary-grad text-white max-w-fit">
                                    Edit Player Details
                                </Link>
                            </div>

                            <ul className="">
                                <li className="grid grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-b-gray">
                                    <p className="text-[16px] font-[400] text-title">First Name</p>
                                    <p className="text-para-light">{data?.data?.first_name}</p>
                                </li>

                                <li className="grid grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-b-gray">
                                    <p className="text-[16px] font-[400] text-title">Last Name</p>
                                    <p className="text-para-light">{data?.data?.last_name}</p>
                                </li>

                                <li className="grid grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-b-gray">
                                    <p className="text-[16px] font-[400] text-title">Display Name</p>
                                    <p className="text-para-light">{data?.data?.name}</p>
                                </li>

                                <li className="grid grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-b-gray">
                                    <p className="text-[16px] font-[400] text-title">Email Address</p>
                                    <p className="text-para-light">{data?.data?.email}</p>
                                </li>

                                <li className="grid grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-b-gray">
                                    <p className="text-[16px] font-[400] text-title">Phone Number</p>
                                    <p className="text-para-light">{data?.data?.phone || "N/A"}</p>
                                </li>

                                <li className="grid grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-b-gray">
                                    <p className="text-[16px] font-[400] text-title">Address Line</p>
                                    <p className="text-para-light">{data?.data?.address || "N/A"}</p>
                                </li>

                                {/* <li className="grid grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-b-gray">
                                    <p className="text-[16px] font-[400] text-title">State</p>
                                    <p className="text-para-light">{data?.data?.sta || "N/A"}</p>
                                </li> */}

                                {/* <li className="grid grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-b-gray">
                                    <p className="text-[16px] font-[400] text-title">City</p>
                                    <p className="text-para-light">{data?.data?.phone || "N/A"}</p>
                                </li> */}

                                <li className="grid grid-cols-2 gap-y-4 gap-x-8 pb-4 mb-4 border-b border-b-gray">
                                    <p className="text-[16px] font-[400] text-title">Wallet Address</p>
                                    <p className="text-para-light">{data?.data?.wallet_address || "N/A"}</p>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </section>

            <section className="player__current__holdings mb-8 lg:mb-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {games.map((game) => (
                        <div className="col-span-1" key={game.name}>
                            <CreditCard key={game.name} game={game} />
                        </div>
                    ))}
                </div>
            </section>

            {/* <TransactionBlock /> */}
            <div className="section-title mb-4">
                <h2 className="text-[20px] leading-[140%] font-[600]">
                    All Transactions
                </h2>
            </div>
            <div className="border-gray border-solid border-[1px] rounded-[8px] lg:rounded-[16px]">
                <TableHeader search={search} setSearch={setSearch} onDownloadCSV={() => { }} />
                {data?.data?.id ? <TransactionTable search={search} user_id={data?.data?.id} /> : ""}
                {/* <GameTransactionTable /> */}
            </div>
        </>
    )
}
