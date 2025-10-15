"use client";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { useEffect, useState, ReactNode } from "react";
import theme, { darkTheme } from "@/theme/theme";
import { useThemeStore } from "@/store/themeStore";

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps): React.ReactElement {
    const { mode } = useThemeStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by using dark theme initially (since dark is default)
    const currentTheme = mounted && mode === "light" ? theme : darkTheme;

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
