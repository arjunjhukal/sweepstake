"use client";
import { CssBaseline, GlobalStyles } from '@mui/material'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import Palette from './palette';
import { ThemeMode } from '@/config';


export default function ThemeCustomization({ children }: { children: React.ReactNode }) {
    const globalStyles = {
        ':root': {
            '--white': '#FFF',
            '--black': '#000',
            '--gray': '#E0E0E3',
            '--light-gray': '#F3F4F6',
            '--primary-light': '#71717A',
            '--primary': '#B801C0',
            '--primary-dark': '#3A013F',
            '--text': '#0E0E11',
            '--primary-grad': 'linear-gradient(90deg, #B801C0 0%, #E046DC 100%)',
            '--secondary-grad': 'linear-gradient(90deg, #69A29D 0%, #93E0D9 100%)',
            '--secondary': '#93E0D8',
            '--text-regular': 'rgba(0, 0, 0, 0.80)',
            '--text-title': 'rgba(0, 0, 0, 0.90)',
            '--gray-scale': '#7E7181',
        },
        '.dark': {
            '--white': '#000',
            '--black': '#FFF',
            '--gray': '#2D2D30',
            '--light-gray': '#1F1F23',
            '--primary-light': '#A0A0A7',
            '--primary': '#D958DF',
            '--primary-dark': '#7D0182',
            '--text': '#F0F0F0',
            '--primary-grad': 'linear-gradient(90deg, #B100B8 0%, #F335ED 100%)',
            '--secondary-grad': 'linear-gradient(90deg, #69A29D 0%, #93E0D9 100%)',
            '--secondary': '#93E0D8',
            '--text-regular': 'rgba(255, 255, 255, 0.80)',
            '--text-title': 'rgba(255, 255, 255, 0.90)',
            '--gray-scale': '#7E7181',
        },
    };
    const theme = Palette(ThemeMode.LIGHT);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <GlobalStyles styles={globalStyles}
                />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
