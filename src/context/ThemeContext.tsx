"use client";

import config, { ThemeMode } from "@/config";
import useLocalStorage from "@/hooks/useLocalStorage";

import { CustomizationProps, I18n } from "@/types/config";
import React, { createContext, use } from "react";

const initialState: CustomizationProps = {
    ...config,
    onChangeMode: () => { },
    onChangeLocalization: () => { },
    onChangeMiniDrawer: () => { },
}
const ThemeContext = createContext(initialState)


export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useLocalStorage('sweepstake-config', initialState);

    const onChangeLocalization = (lang: I18n) => {
        setConfig({
            ...config,
            i18n: lang
        })
    }
    const onChangeMiniDrawer = (miniDrawer: boolean) => {
        setConfig({
            ...config,
            miniDrawer
        })
    }
    const onChangeMode = (mode: ThemeMode) => {
        setConfig({
            ...config,
            mode
        });
    };

    return (
        <ThemeContext value={{ ...config, onChangeLocalization, onChangeMiniDrawer, onChangeMode }}>
            {children}
        </ThemeContext>
    )

}

export const useThemeContext = () => {
    return use(ThemeContext);
}