// components/Loading.tsx
import React from 'react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center">
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 font-medium text-lg">Loading...</p>
            </div>
        </div>
    );
}
