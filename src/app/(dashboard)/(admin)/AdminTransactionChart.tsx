// // import React from "react";
// // import Chart from "react-apexcharts";
// // import { ApexOptions } from "apexcharts";
// // import { useGetAdminTransactionsQuery } from "@/services/dashboardApi";

// // export default function AdminTransactionChart() {
// //     const { data, isLoading } = useGetAdminTransactionsQuery();

// //     const chartOptions: ApexOptions = {
// //         chart: {
// //             type: "donut",
// //         },
// //         labels: data?.data.length ? data?.data.map((item) => item.label) : ["User Transaction", "My Settled", "My Unsettled"],
// //         colors: ["#8B5CF6", "#FACC15", "#22C55E"],
// //         legend: { show: false },
// //         dataLabels: { enabled: false },
// //         stroke: {
// //             width: 2,
// //             colors: ["#fff"],
// //         },
// //         plotOptions: {
// //             pie: {
// //                 donut: {
// //                     size: "65%",
// //                 },
// //             },
// //         },
// //     };

// //     const chartSeries = data?.data.length ? data?.data.map((item) => item.data) : [0, 0, 0];

// //     if (!data) return null;

// //     return (
// //         <div className="px-6 pb-6">
// //             {/* Donut Chart */}
// //             <Chart options={chartOptions} series={chartSeries} type="donut" height={280} />

// //             {/* Custom Legend */}
// //             <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
// //                 {
// //                     data?.data.map((item) => (
// //                         <div className="flex flex-col items-start">
// //                             <span className="flex items-center gap-1">
// //                                 <span className="w-3 h-3 rounded-full inline-block bg-purple-500"></span>
// //                                 {item.label}
// //                             </span>
// //                             <strong className="text-gray-800 ">${item.data}</strong>
// //                         </div>
// //                     ))
// //                 }
// //                 <div className="flex flex-col items-center">
// //                     <span className="flex items-center gap-1">
// //                         <span className="w-3 h-3 rounded-full inline-block bg-yellow-400"></span>
// //                         My Settled
// //                     </span>
// //                     <strong className="text-gray-800">$26,894</strong>
// //                 </div>
// //                 <div className="flex flex-col items-center">
// //                     <span className="flex items-center gap-1">
// //                         <span className="w-3 h-3 rounded-full inline-block bg-green-500"></span>
// //                         My Unsettled
// //                     </span>
// //                     <strong className="text-gray-800">$13,894</strong>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// "use client";

// import React from "react";
// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
// import { useGetAdminTransactionsQuery } from "@/services/dashboardApi";

// export default function AdminTransactionChart() {
//     const { data, isLoading } = useGetAdminTransactionsQuery();

//     const defaultLabels = ["User Transaction", "My Settled", "My Unsettled"];
//     const defaultColors = ["#8B5CF6", "#FACC15", "#22C55E"];

//     const chartOptions: ApexOptions = {
//         chart: {
//             type: "donut",
//         },
//         labels: data?.data?.length
//             ? data.data.map((item: any) => item.label)
//             : defaultLabels,
//         colors: defaultColors,
//         legend: { show: false },
//         dataLabels: { enabled: false },
//         stroke: {
//             width: 2,
//             colors: ["#fff"],
//         },
//         plotOptions: {
//             pie: {
//                 donut: {
//                     size: "65%",
//                 },
//             },
//         },
//     };

//     const chartSeries = data?.data?.length
//         ? data.data.map((item: any) => item.data)
//         : [0, 0, 0];

//     if (isLoading) {
//         return <div className="px-6 py-10 text-center">Loading chart...</div>;
//     }

//     if (!data?.data?.length) {
//         return <div className="px-6 py-10 text-center">No transaction data found</div>;
//     }

//     return (
//         <div className="px-6 pb-6">
//             {/* Donut Chart */}
//             <Chart
//                 options={chartOptions}
//                 series={chartSeries}
//                 type="donut"
//                 height={280}
//             />

//             {/* Custom Legend */}
//             <div className=" flex flex-col sm:grid xl:flex 2xl:grid grid-cols-3 gap-4 mt-4 text-sm">
//                 {data.data.map((item: any, index: number) => (
//                     <div key={index} className="flex flex-col items-start">
//                         <span className="flex items-start gap-1 text-para-light">
//                             <span
//                                 className="w-3 h-3 rounded-full inline-block mt-1 "
//                                 style={{ backgroundColor: defaultColors[index] }}
//                             ></span>
//                             {item.label}
//                         </span>
//                         <strong className="text-gray-800 block mt-2">
//                             ${item.data?.toLocaleString()}
//                         </strong>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

"use client";

import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useGetAdminTransactionsQuery } from "@/services/dashboardApi";

export default function AdminTransactionChart() {
    const { data, isLoading } = useGetAdminTransactionsQuery();

    const defaultLabels = ["User Transaction", "My Settled", "My Unsettled"];
    const defaultColors = ["#8B5CF6", "#FACC15", "#22C55E"];

    const chartOptions: ApexOptions = {
        chart: {
            type: "donut",
            toolbar: { show: false },
        },
        labels: data?.data?.length
            ? data.data.map((item: any) => item.label)
            : defaultLabels,
        colors: defaultColors,
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: { width: 2, colors: ["#fff"] },
        plotOptions: {
            pie: {
                donut: { size: "65%" },
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: { height: 240 },
                    plotOptions: { pie: { donut: { size: "60%" } } },
                },
            },
            {
                breakpoint: 640,
                options: {
                    chart: { height: 200 },
                    plotOptions: { pie: { donut: { size: "55%" } } },
                },
            },
        ],
    };

    const chartSeries = data?.data?.length
        ? data.data.map((item: any) => item.data)
        : [0, 0, 0];

    if (isLoading)
        return <div className="px-6 py-10 text-center">Loading chart...</div>;

    if (!data?.data?.length)
        return <div className="px-6 py-10 text-center">No transaction data found</div>;

    return (
        <div className="px-6 pb-6 w-full">
            {/* Donut Chart */}
            <Chart options={chartOptions} series={chartSeries} type="donut" width="100%" />

            {/* Custom Legend */}
            <div className="mt-4 text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.data.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-start sm:items-center">
                        <span className="flex items-center gap-2 text-para-light">
                            <span
                                className="w-3 h-3 rounded-full inline-block"
                                style={{ backgroundColor: defaultColors[index] }}
                            ></span>
                            {item.label}
                        </span>
                        <strong className="text-gray-800 mt-1 block">
                            ${item.data?.toLocaleString()}
                        </strong>
                    </div>
                ))}
            </div>
        </div>
    );
}
