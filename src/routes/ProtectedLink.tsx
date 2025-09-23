"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { openAuthModal } from "@/slice/authModalSlice";

interface Props {
    href: string;
    className?: string;
    children: React.ReactNode;
}

export default function ProtectedLink({ href, className, children }: Props) {
    const user = useAppSelector((s) => s ? s.auth.user : "");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (user) {
            router.push(href);
        } else {
            dispatch(openAuthModal());
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
