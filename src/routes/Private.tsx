"use client";
import { useAppSelector } from "@/hooks/hook";
import auth from "@/slice/authSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Private({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const user = useAppSelector((state) => state.auth.user);

    console.log(user);
    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);

    if (!user) return null;

    return <>{children}</>;
}
