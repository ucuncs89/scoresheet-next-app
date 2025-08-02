"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2563eb", // Modern Blue
            light: "#3b82f6",
            dark: "#1d4ed8",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#7c3aed", // Modern Purple
            light: "#8b5cf6",
            dark: "#6d28d9",
            contrastText: "#ffffff",
        },
        error: {
            main: "#dc2626", // Modern Red
            light: "#ef4444",
            dark: "#b91c1c",
        },
        warning: {
            main: "#d97706", // Modern Orange
            light: "#f59e0b",
            dark: "#b45309",
        },
        info: {
            main: "#0891b2", // Modern Cyan
            light: "#06b6d4",
            dark: "#0e7490",
        },
        success: {
            main: "#059669", // Modern Green
            light: "#10b981",
            dark: "#047857",
        },
        background: {
            default: "#f8fafc", // Clean Light Gray
            paper: "#ffffff",
        },
        text: {
            primary: "#1e293b", // Dark Slate
            secondary: "#64748b", // Medium Slate
        },
        divider: "#e2e8f0", // Light Gray
        action: {
            hover: "#f1f5f9",
            selected: "#e2e8f0",
            disabled: "#cbd5e1",
            disabledBackground: "#f1f5f9",
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
                            borderColor: "#2563eb",
                        },
                        "&.Mui-focused fieldset": {
                            borderWidth: "2px",
                            borderColor: "#2563eb",
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
                    border: "1px solid #e2e8f0",
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
                        color: "#64748b",
                        "&:hover": {
                            color: "#dc2626",
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
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
                    "&:hover": {
                        boxShadow: "0 6px 16px rgba(37, 99, 235, 0.35)",
                    },
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    "& .MuiTableCell-root": {
                        backgroundColor: "#f8fafc",
                        borderBottom: "2px solid #e2e8f0",
                        fontWeight: 600,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid #e2e8f0",
                    padding: "12px 16px",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: "#f1f5f9",
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "#e2e8f0",
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
            main: "#3b82f6", // Lighter Blue for Dark Mode
            light: "#60a5fa",
            dark: "#2563eb",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#8b5cf6", // Lighter Purple for Dark Mode
            light: "#a78bfa",
            dark: "#7c3aed",
            contrastText: "#ffffff",
        },
        background: {
            default: "#0f172a", // Dark Slate Background
            paper: "#1e293b", // Dark Slate Paper
        },
        text: {
            primary: "#f1f5f9", // Light Gray
            secondary: "#cbd5e1", // Medium Gray
        },
        divider: "#334155", // Dark Gray
        action: {
            hover: "#1e293b",
            selected: "#334155",
            disabled: "#475569",
            disabledBackground: "#1e293b",
        },
    },
    components: {
        ...theme.components,
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)",
                    border: "1px solid #334155",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)",
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    "& .MuiTableCell-root": {
                        backgroundColor: "#1e293b",
                        borderBottom: "2px solid #334155",
                        fontWeight: 600,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid #334155",
                    padding: "12px 16px",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: "#334155",
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "#334155",
                },
            },
        },
    },
});

export default theme;
