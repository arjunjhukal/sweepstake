"use client";
import { CssBaseline, GlobalStyles } from '@mui/material'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import Palette from './palette';
import { ThemeMode } from '@/config';
import { NextAppDirEmotionCacheProvider } from './emotionCache';


export default function ThemeCustomization({ children }: { children: React.ReactNode }) {
    const globalStyles = {

    };
    const theme = Palette(ThemeMode.LIGHT);

    return (
        <StyledEngineProvider injectFirst>
            <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    <GlobalStyles styles={globalStyles}
                    />
                    {children}
                </ThemeProvider>
            </NextAppDirEmotionCacheProvider>
        </StyledEngineProvider>
    )
}
