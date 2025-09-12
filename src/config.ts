
import { Inter } from 'next/font/google';
import { DefaultConfigProps } from './types/config';

export const DRAWER_WIDTH = 280;
export const MINI_DRAWER_WIDTH = 90;
export const HEADER_HEIGHT = 74;
const inter = Inter({
    subsets: ['latin'],
    fallback: ['sans-serif'],
    weight: ['300', '400', '500', '700'],
    adjustFontFallback: false
});

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
    AUTO = 'auto'
}

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female'
}

const config: DefaultConfigProps = {
    fontFamily: inter.style.fontFamily,
    i18n: 'en',
    mode: ThemeMode.LIGHT,
    miniDrawer: false
}

export default config;