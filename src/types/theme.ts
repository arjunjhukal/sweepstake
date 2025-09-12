import { SimplePaletteColorOptions } from "@mui/material/styles"

export type PaletteThemeProps = {
    primary: SimplePaletteColorOptions;
    secondary: SimplePaletteColorOptions;
    title: SimplePaletteColorOptions;
    lightGray: SimplePaletteColorOptions;

}
export type CustomShadowProps = {
    button: string;
    text: string;
    // z1: string;
    // z2: string;
    primary: string;
    primaryButton: string;
    secondary: string;
    secondaryButton: string;
    error: string;
    errorButton: string;
    warning: string;
    warningButton: string;
    info: string;
    infoButton: string;
    success: string;
    successButton: string;
    grey: string;
    greyButton: string;
};