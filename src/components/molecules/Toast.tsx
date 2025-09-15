"use client";

import React from "react";
import { CloseCircle } from "@wandersonalwes/iconsax-react";

import { closeToast } from "@/slice/toastSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";

export default function Toast() {
    const { variant, message, isActive, autoTimeout, duration } = useAppSelector(
        (state) => state.toastSlice
    );
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (isActive && autoTimeout) {
            const timeout = setTimeout(() => {
                dispatch(closeToast());
            }, duration || 3000);

            return () => clearTimeout(timeout);
        }
    }, [isActive, duration, autoTimeout, dispatch]);

    if (!isActive) return null;

    const variantStyles: Record<string, string> = {
        success: "border-green-500 bg-green-50 text-green-800",
        error: "border-red-500 bg-red-50 text-red-800",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-800",
        info: "border-blue-500 bg-blue-50 text-blue-800",
    };

    const currentVariant = variant?.toLowerCase() || "info";

    return (
        <div
            className={`fixed top-4 right-4 flex max-w-sm w-full items-start gap-3 rounded-xl border-l-4 px-4 py-3 shadow-lg transition-all duration-300 animate-in slide-in-from-right 
                data-[state=closed]:slide-out-to-right data-[state=closed]:fade-out 
                ${variantStyles[currentVariant]}`}
        >
            <div className="flex flex-1 flex-col">
                {variant && (
                    <h4 className="text-sm font-semibold">
                        {variant.charAt(0).toUpperCase() + variant.slice(1).toLowerCase()}
                    </h4>
                )}
                {message && <p className="text-sm leading-snug">{message}</p>}
            </div>

            <button
                type="button"
                onClick={() => dispatch(closeToast())}
                className="max-w-fit p-0 text-current transition-opacity hover:opacity-70"
            >
                <CloseCircle size="32" color="#FF8A65" />
            </button>
        </div>
    );
}
