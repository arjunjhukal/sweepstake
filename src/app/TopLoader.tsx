"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function TopLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.configure({
            showSpinner: false,
            trickleSpeed: 100,
            easing: "ease",
            speed: 400,
        });

        NProgress.start();
        const timer = setTimeout(() => {
            NProgress.done();
        }, 300); // short delay to simulate loading

        return () => {
            clearTimeout(timer);
            NProgress.done();
        };
    }, [pathname, searchParams]); // runs on route change

    return null;
}
