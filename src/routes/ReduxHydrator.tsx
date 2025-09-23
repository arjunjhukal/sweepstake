"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/hook";
import { setTokens } from "@/slice/authSlice";

export default function ReduxHydrator({ token, user }: { token: string; user: any }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTokens({ access_token: token, user }));
    }, [dispatch, token, user]);

    return null;
}
