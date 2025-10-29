"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { openAuthModal } from "@/slice/authModalSlice";

interface Props {
    href: string;
    className?: string;
    children: React.ReactNode;
    target?: string;
    rel?: string;
}

export default function ProtectedLink({ href, className, children, target, rel }: Props) {
    const user = useAppSelector((s) => s ? s.auth.user : "");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (user) {
            router.push(href);
        } else {
            // dispatch(openAuthModal());
            router.push("/login");
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className} target={target} rel={rel}>
            {children}
        </a>
    );
}
