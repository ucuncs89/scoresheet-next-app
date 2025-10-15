"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#6366f1", // Modern Indigo
            light: "#818cf8",
            dark: "#4f46e5",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#14b8a6", // Modern Teal
            light: "#2dd4bf",
            dark: "#0d9488",
            contrastText: "#ffffff",
        },
        error: {
            main: "#ef4444", // Vibrant Red
            light: "#f87171",
            dark: "#dc2626",
        },
        warning: {
            main: "#f59e0b", // Vibrant Amber
            light: "#fbbf24",
            dark: "#d97706",
        },
        info: {
            main: "#06b6d4", // Vibrant Cyan
            light: "#22d3ee",
            dark: "#0891b2",
        },
        success: {
            main: "#10b981", // Vibrant Emerald
            light: "#34d399",
            dark: "#059669",
        },
        background: {
            default: "#fafafa", // Ultra Clean Light
            paper: "#ffffff",
        },
        text: {
            primary: "#18181b", // Rich Black
            secondary: "#71717a", // Neutral Gray
        },
        divider: "#e4e4e7", // Subtle Gray
        action: {
            hover: "#f4f4f5",
            selected: "#e4e4e7",
            disabled: "#a1a1aa",
            disabledBackground: "#f4f4f5",
        },
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: "2.5rem",
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 600,
            fontSize: "2rem",
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
            fontSize: "1.75rem",
            lineHeight: 1.3,
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.5rem",
            lineHeight: 1.4,
        },
        h5: {
            fontWeight: 600,
            fontSize: "1.25rem",
            lineHeight: 1.4,
        },
        h6: {
            fontWeight: 600,
            fontSize: "1.125rem",
            lineHeight: 1.4,
        },
        subtitle1: {
            fontWeight: 500,
            fontSize: "1rem",
            lineHeight: 1.5,
        },
        subtitle2: {
            fontWeight: 500,
            fontSize: "0.875rem",
            lineHeight: 1.5,
        },
        body1: {
            fontSize: "1rem",
            lineHeight: 1.6,
        },
        body2: {
            fontSize: "0.875rem",
            lineHeight: 1.6,
        },
        button: {
            fontWeight: 600,
            textTransform: "none",
            fontSize: "0.875rem",
        },
        caption: {
            fontSize: "0.75rem",
            lineHeight: 1.5,
        },
        overline: {
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 0,
                    fontWeight: 600,
                    padding: "10px 20px",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
                    },
                },
                contained: {
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
                    },
                },
                outlined: {
                    borderWidth: "2px",
                    "&:hover": {
                        borderWidth: "2px",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        "&:hover fieldset": {
                            borderColor: "#6366f1",
                        },
                        "&.Mui-focused fieldset": {
                            borderWidth: "2px",
                            borderColor: "#6366f1",
                        },
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e4e4e7",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    fontWeight: 500,
                    "& .MuiChip-deleteIcon": {
                        color: "#71717a",
                        "&:hover": {
                            color: "#ef4444",
                        },
                    },
                },
                outlined: {
                    borderWidth: "2px",
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
                    "&:hover": {
                        boxShadow: "0 6px 16px rgba(99, 102, 241, 0.35)",
                    },
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    "& .MuiTableCell-root": {
                        backgroundColor: "#fafafa",
                        borderBottom: "2px solid #e4e4e7",
                        fontWeight: 600,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid #e4e4e7",
                    padding: "12px 16px",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: "#f4f4f5",
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "#e4e4e7",
                },
            },
        },
    },
    shape: {
        borderRadius: 0,
    },
});

export const darkTheme = createTheme({
    ...theme,
    palette: {
        mode: "dark",
        primary: {
            main: "#818cf8", // Vibrant Indigo for Dark Mode
            light: "#a5b4fc",
            dark: "#6366f1",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#2dd4bf", // Vibrant Teal for Dark Mode
            light: "#5eead4",
            dark: "#14b8a6",
            contrastText: "#000000",
        },
        error: {
            main: "#f87171", // Vibrant Red
            light: "#fca5a5",
            dark: "#ef4444",
        },
        warning: {
            main: "#fbbf24", // Vibrant Amber
            light: "#fcd34d",
            dark: "#f59e0b",
        },
        info: {
            main: "#22d3ee", // Vibrant Cyan
            light: "#67e8f9",
            dark: "#06b6d4",
        },
        success: {
            main: "#34d399", // Vibrant Emerald
            light: "#6ee7b7",
            dark: "#10b981",
        },
        background: {
            default: "#09090b", // Ultra Dark Rich Background
            paper: "#18181b", // Rich Dark Paper
        },
        text: {
            primary: "#fafafa", // Clean White
            secondary: "#a1a1aa", // Neutral Gray
        },
        divider: "#27272a", // Subtle Dark Divider
        action: {
            hover: "#27272a",
            selected: "#3f3f46",
            disabled: "#52525b",
            disabledBackground: "#27272a",
        },
    },
    components: {
        ...theme.components,
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 0,
                    fontWeight: 600,
                    padding: "10px 20px",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(129, 140, 248, 0.25)",
                    },
                },
                contained: {
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(129, 140, 248, 0.35)",
                    },
                },
                outlined: {
                    borderWidth: "2px",
                    "&:hover": {
                        borderWidth: "2px",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5)",
                    border: "1px solid #27272a",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5)",
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "0 4px 12px rgba(129, 140, 248, 0.35)",
                    "&:hover": {
                        boxShadow: "0 6px 16px rgba(129, 140, 248, 0.45)",
                    },
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    "& .MuiTableCell-root": {
                        backgroundColor: "#18181b",
                        borderBottom: "2px solid #27272a",
                        fontWeight: 600,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid #27272a",
                    padding: "12px 16px",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: "#27272a",
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "#27272a",
                },
            },
        },
    },
});

export default theme;
