import { Dash } from '@wandersonalwes/iconsax-react'
import React from 'react'

export default function ActivityAnalyticCard() {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Total Activities</p>
                    <p className="text-2xl font-bold text-gray-900">{12}</p>
                </div>
                <Dash className="w-8 h-8 text-blue-500" />
            </div>
        </div>
    )
}
