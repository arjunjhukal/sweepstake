import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function AdminTransactionChart() {
    const chartOptions: ApexOptions = {
        chart: {
            type: "donut",
        },
        labels: ["User Transaction", "My Settled", "My Unsettled"],
        colors: ["#8B5CF6", "#FACC15", "#22C55E"], // purple, yellow, green
        legend: { show: false }, // hide default legend
        dataLabels: { enabled: false },
        stroke: {
            width: 2,
            colors: ["#fff"],
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "65%",
                },
            },
        },
    };

    const chartSeries = [483569, 26894, 13894]; // sample values for 3 segments

    return (
        <div className="px-6 pb-6">
            {/* Donut Chart */}
            <Chart options={chartOptions} series={chartSeries} type="donut" height={280} />

            {/* Custom Legend */}
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full inline-block bg-purple-500"></span>
                        User Transaction
                    </span>
                    <strong className="text-gray-800">$483,569</strong>
                </div>
                <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full inline-block bg-yellow-400"></span>
                        My Settled
                    </span>
                    <strong className="text-gray-800">$26,894</strong>
                </div>
                <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full inline-block bg-green-500"></span>
                        My Unsettled
                    </span>
                    <strong className="text-gray-800">$13,894</strong>
                </div>
            </div>
        </div>
    );
}
