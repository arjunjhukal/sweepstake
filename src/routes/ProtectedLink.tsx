"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { openAuthModal } from "@/slice/authModalSlice";

interface Props {
    href: string;
    className?: string;
    children: React.ReactNode;
    target?: boolean;
    rel?: string;
}

export default function ProtectedLink({ href, className, children, target, rel }: Props) {
    const user = useAppSelector((s) => s ? s.auth.user : "");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            router.push("/login");
            return;
        }

        if (target) {
            return;
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className} target={target ? "_blank" : "_self"} rel={rel}>
            {children}
        </a>
    );
}
