"use client";
import { CssBaseline, GlobalStyles } from '@mui/material'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import Palette from './palette';
import AdminPalette from './adminPalette';
import { ThemeMode } from '@/config';
import { NextAppDirEmotionCacheProvider } from './emotionCache';
import { useAppSelector } from '@/hooks/hook';


export default function ThemeCustomization({ children }: { children: React.ReactNode }) {

    const [theme, setTheme] = React.useState(ThemeMode.DARK);
    const user = useAppSelector((state) => state.auth.user);
    const globalStyles = {

    };

    const [palette, setPalette] = React.useState(() => Palette(ThemeMode.DARK));

    React.useEffect(() => {
        if (!user || !user.role) {
            setTheme(ThemeMode.DARK);
            setPalette(Palette(ThemeMode.DARK));
        } else if (user.role.toUpperCase() === "USER") {
            setTheme(ThemeMode.DARK);
            setPalette(Palette(ThemeMode.DARK));
        } else {
            setTheme(ThemeMode.LIGHT);
            setPalette(AdminPalette(ThemeMode.LIGHT));
        }
    }, [user]);


    return (
        <StyledEngineProvider injectFirst>
            <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
                <ThemeProvider theme={palette}>
                    <CssBaseline enableColorScheme />
                    <GlobalStyles styles={globalStyles}
                    />
                    {children}
                </ThemeProvider>
            </NextAppDirEmotionCacheProvider>
        </StyledEngineProvider>
    )
}
