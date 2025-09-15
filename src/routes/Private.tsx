"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import auth, { clearTokens } from "@/slice/authSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
        const exp = payload.exp; // expiration time in seconds
        if (!exp) return true;
        const now = Math.floor(Date.now() / 1000); // current time in seconds
        return exp < now;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return true; // treat invalid token as expired
    }
}

export default function Private({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.access_token);

    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            dispatch(clearTokens());
            router.replace("/login");
            return;
        }

        if (!user) {
            router.replace("/login");
        }
    }, [token, user, dispatch, router]);

    if (!user) return null;

    return <>{children}</>;
}
