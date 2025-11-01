"use client";

import React, { useRef } from "react";

interface GlassWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const GlassWrapper: React.FC<GlassWrapperProps> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        ref.current.style.setProperty("--x", `${x}%`);
        ref.current.style.setProperty("--y", `${y}%`);
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.setProperty("--x", `50%`);
        ref.current.style.setProperty("--y", `50%`);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={` h-full glass ${className || ""}`}
        >
            {children}
        </div>
    );
};

export default GlassWrapper;
