"use client";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { useEffect, useState, ReactNode } from "react";
import theme, { darkTheme } from "@/theme/theme";
import { useThemeStore } from "@/store/themeStore";

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps): React.ReactElement {
    const { mode, setMode, toggleColorMode } = useThemeStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check system preference if mode is not set yet
        if (mode === 'light') {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                setMode("dark");
            }
        }
    }, [mode, setMode]);

    // Prevent hydration mismatch by using light theme initially
    const currentTheme = mounted && mode === "dark" ? darkTheme : theme;

    return (
        <MUIThemeProvider theme={currentTheme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}

// Export a hook for accessing theme functionality
export const useTheme = () => {
    const { mode, toggleColorMode } = useThemeStore();
    return { mode, toggleColorMode };
};
