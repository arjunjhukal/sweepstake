import { IconButton } from '@mui/material'
import { ArrowLeft, More } from '@wandersonalwes/iconsax-react'
import { ApexOptions } from 'apexcharts';
import React from 'react'
import Chart from "react-apexcharts";

export default function AdminAnalytics() {
    const charts = [
        {
            title: 'Total Revenue',
            subtitle: 'Jul 23 - Jul 30 (2025)',
            value: '$2.689M',
            change: 16,
            isIncrease: true,
            chartOptions: {
                chart: { type: 'area', sparkline: { enabled: true } },
                stroke: { curve: 'smooth', width: 2 },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 1,
                        gradientToColors: ['#E14A5E'],
                        opacityFrom: 1,
                        opacityTo: 0,
                        stops: [0, 100],
                    },
                },
                colors: ['#E14A5E'],
                tooltip: { enabled: true },
            } as ApexOptions,
            chartSeries: [{ name: 'Revenue', data: [400, 600, 700, 1200, 1400, 1800, 2500] }],
        },
        {
            title: 'New Users',
            subtitle: 'Jul 23 - Jul 30 (2025)',
            value: '3.2K',
            change: 8,
            isIncrease: true,
            chartOptions: {
                chart: { type: 'area', sparkline: { enabled: true } },
                stroke: { curve: 'straight', width: 2 },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'vertical',
                        shadeIntensity: 0.8,
                        gradientToColors: ['#22C55E'],
                        opacityFrom: 0.8,
                        opacityTo: 0,
                        stops: [0, 100],
                    },
                },
                colors: ['#22C55E'],
                tooltip: { enabled: true },
            } as ApexOptions,
            chartSeries: [{ name: 'Users', data: [200, 400, 600, 700, 900, 1200, 1500] }],
        },
        {
            title: 'Churn Rate',
            subtitle: 'Jul 23 - Jul 30 (2025)',
            value: '5.4%',
            change: -4,
            isIncrease: false,
            chartOptions: {
                chart: { type: 'area', sparkline: { enabled: true } },
                stroke: { curve: 'smooth', width: 2 },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 1,
                        gradientToColors: ['#F59E0B'],
                        opacityFrom: 1,
                        opacityTo: 0,
                        stops: [0, 100],
                    },
                },
                colors: ['#F59E0B'],
                tooltip: { enabled: true },
            } as ApexOptions,
            chartSeries: [{ name: 'Churn', data: [8, 7, 6, 5, 5, 4, 3] }],
        },
        {
            title: 'Support Tickets',
            subtitle: 'Jul 23 - Jul 30 (2025)',
            value: '1.2K',
            change: -12,
            isIncrease: false,
            chartOptions: {
                chart: { type: 'area', sparkline: { enabled: true } },
                stroke: { curve: 'stepline', width: 2 },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'vertical',
                        shadeIntensity: 0.8,
                        gradientToColors: ['#3B82F6'],
                        opacityFrom: 0.7,
                        opacityTo: 0,
                        stops: [0, 100],
                    },
                },
                colors: ['#3B82F6'],
                tooltip: { enabled: true },
            } as ApexOptions,
            chartSeries: [{ name: 'Tickets', data: [50, 45, 40, 38, 35, 30, 25] }],
        },
    ];


    // const chartSeries = [
    //     {
    //         name: "Revenue",
    //         data: [400, 600, 700, 1200, 1400, 1800, 2500],
    //     },
    // ];
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 analytics__wrapper mb-5">
            {charts.map((chart, index) => (
                <div className="col-span-1" key={index} >
                    <div className="analytics__card p-4 rounded-[8px]">
                        <div className="card__title flex justify-between items-center mb-2">
                            <div className="title">
                                <strong className='text-[12px] leading-[120%] text-title font-[500] mb-1 block'>Total Revenue</strong>
                                <span className="text-[10px] text-para-light leading-[120%] font-[500]">Jul 23 - Jul 30 (2025)</span>
                            </div>
                            <div className="card__action">
                                <IconButton>
                                    <More className='rotate-90' variant='TwoTone' />
                                </IconButton>
                            </div>
                        </div>
                        <div className="card__content">
                            <div className="flex gap-2 items-end justify-between mb-2">
                                <div className="content flex gap-2 items-center">
                                    <strong className='text-[16px] leading-[120%] font-[600] text-title'>$2.689M</strong>
                                    <p className={`flex gap-1 items-center ${chart.isIncrease ? "increase" : "decrease"}`}>
                                        <span className="arrow w-[18px] h-[18px] rounded-full flex justify-center items-center "><ArrowLeft size={12} /></span>16%</p>
                                </div>
                                <div className="relative aspect-[72/68] w-full max-w-[144px] h-[100px] text-right">
                                    <Chart
                                        options={chart.chartOptions}
                                        series={chart.chartSeries}
                                        type="area"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>

                            </div>
                            <p className='text-[12px] font-[500] text-para-light'>compared to previous week</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
