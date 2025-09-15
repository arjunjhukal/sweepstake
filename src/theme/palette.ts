// src/theme/Palette.ts
import { createTheme, PaletteMode } from "@mui/material/styles";
import { ThemeMode } from "@/config";
import { PaletteThemeProps } from "@/types/theme";

export default function Palette(mode: ThemeMode) {
    const contrastText = "#fff";

    // Base Colors - Light Mode
    let primaryColors = ['#71717A', '#B801C0', '#3A013F'];
    let secondaryColors = ["#93E0D8", "#69A29D", "#4A7D78"]; // Added dark and light variants
    let grayColors = ["#E0E0E3", '#F3F4F6'];
    let titleColors = ["#0E0E11", "rgba(0, 0, 0, 0.80)", "rgba(0, 0, 0, 0.90)"];
    let primaryGradColors = ['linear-gradient(90deg, #B100B8 0%, #F335ED 100%)'];
    let secondaryGradColors = ['linear-gradient(90deg, #69A29D 0%, #93E0D9 100%)'];


    if (mode === ThemeMode.DARK) {
        primaryColors = ['#A0A0A7', '#D958DF', '#7D0182'];
        secondaryColors = ["#93E0D8", "#69A29D", "#4A7D78"];
        grayColors = ["#2D2D30", '#1F1F23'];
        titleColors = ["#F0F0F0", "rgba(0, 0, 0, 0.80)", "rgba(0, 0, 0, 0.90)"];
    }


    const paletteColor: PaletteThemeProps = {
        primary: {
            light: primaryColors[0],
            main: primaryColors[1],
            dark: primaryColors[2],
            contrastText
        },
        secondary: {
            light: secondaryColors[0],
            main: secondaryColors[0], // Use the same main color since we only have one base
            dark: secondaryColors[0], // Use the same dark color
            contrastText
        },
        title: {
            main: titleColors[0],
            contrastText
        },
        lightGray: {
            light: grayColors[1],
            main: grayColors[0],
            contrastText
        },
    };

    // Final MUI Theme
    return createTheme({
        palette: {
            mode: mode as PaletteMode,
            common: {
                black: "#000",
                white: "#fff",
            },
            ...paletteColor,
            background: {
                default: mode === ThemeMode.LIGHT ? grayColors[1] : "#fff", // Fixed: use gray instead of secondary
                paper: mode === ThemeMode.LIGHT ? grayColors[0] : "#fff"    // Fixed: use gray instead of secondary
            },
            text: {
                primary: mode === ThemeMode.LIGHT ? titleColors[0] : titleColors[0], // Fixed: use title colors
                secondary: mode === ThemeMode.LIGHT ? grayColors[0] : grayColors[1]  // Fixed: use gray colors
            }
        },
        components: {
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        // color: 'rgba(255, 255, 255, 0.80)',
                        color: titleColors[0],
                        fontFamily: '"Hiragino Sans"',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        display: 'block',
                        marginBottom: '4px',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        width: "100%",
                        borderRadius: '27px',
                        background: 'rgba(118, 107, 120, 0.55)',
                        border: '0.576px solid rgba(255, 255, 255, 0.04)',
                        color: '#fff',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255,255,255,0.2)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#B801C0',
                        },
                    },
                    input: {
                        padding: '8px 12px',
                        '&::placeholder': {
                            color: 'rgba(255, 255, 255, 0.2)',
                            fontWeight: 300,
                            fontSize: '12px',
                        },
                    },
                },
            },
            MuiInput: {
                defaultProps: {
                    disableUnderline: true,
                },
                styleOverrides: {
                    root: {
                        width: "100%",
                        borderRadius: "var(--border-radius-lg, 10px)",
                        border: "1px solid var(--Gray, #E0E0E3)",
                        background: "transparent",
                        color: "inherit",
                        padding: "8px 12px",

                        "&:hover": {
                            borderColor: "#B801C0",
                        },

                        "&.Mui-focused": {
                            borderColor: "#B801C0",
                        },
                    },
                    input: {
                        p0dding: 0,
                        "&::placeholder": {
                            color: "var(--Gray, #999)",
                            fontWeight: 400,
                            fontSize: "14px",
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiInputBase-root": {
                            borderRadius: "8px",
                            background: "#FFF",
                        },
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        borderRadius: "8px",
                        background: "#FFF",
                        "&.Mui-focused": {
                            borderColor: "#B801C0",
                        },
                    },
                },
            },
            MuiButton: {

                styleOverrides: {
                    root: {
                        borderRadius: '27px',
                        padding: '12px 24px',
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        width: '100%',
                        '&:disabled': {
                            opacity: 0.5,
                            cursor: 'not-allowed',
                        },
                    },
                },
                variants: [
                    {
                        props: { variant: "contained", color: "primary" },
                        style: {
                            background: primaryGradColors[0],
                            color: "#fff",
                            "&:hover": {
                                opacity: 0.9,
                            },
                        },
                    },
                    {
                        props: { variant: "contained", color: "secondary" },
                        style: {
                            background: secondaryGradColors[0],
                            color: "#fff",
                            "&:hover": {
                                opacity: 0.9,
                            },
                        },
                    },
                ],
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        padding: 0
                    }
                }
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        display: "block",
                        padding: 0
                    }
                }
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        // minHeight: 48,
                        // paddingLeft: "20px",
                        // paddingRight: "20px",
                        padding: "12px 12px 12px 16px",
                        transition: "justify-content 0.2s ease",
                        "&.collapsed": {
                            justifyContent: "center"
                        },
                        "&.expanded": {
                            justifyContent: "flex-start"
                        },
                        "&.active": {
                            backgroundColor: "#FEEFFF",
                            color: primaryColors[1],
                            "& .MuiListItemIcon-root": {
                                color: primaryColors[1],
                            }
                        }
                    },
                }
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: 0,
                        justifyContent: "center",
                        transition: "margin 0.2s ease",
                        "&.collapsed": {
                            marginRight: "auto"
                        },
                        "&.expanded": {
                            marginRight: "12px"
                        }
                    }
                }
            },
            MuiListItemText: {
                styleOverrides: {
                    root: {
                        transition: "opacity 0.2s ease",
                        "&.collapsed": {
                            opacity: 0
                        },
                        "&.expanded": {
                            opacity: 1
                        }
                    }
                }
            }
        },
        typography: {
            fontFamily: "Inter, sans-serif",
            subtitle1: {
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "120%",
                color: "var(--Title, #0E0E11)"
            }
        }
    });
}