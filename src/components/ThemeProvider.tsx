"use client";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import theme, { darkTheme } from "@/theme/theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
    mode: ThemeMode;
    toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: "light",
    toggleColorMode: () => {},
});

export const useTheme = (): ThemeContextType => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps): React.ReactElement {
    const [mode, setMode] = useState<ThemeMode>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check for saved theme preference or default to 'light'
        const savedMode = localStorage.getItem("themeMode") as ThemeMode | null;
        if (savedMode) {
            setMode(savedMode);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setMode(prefersDark ? "dark" : "light");
        }
    }, []);

    const toggleColorMode = (): void => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("themeMode", newMode);
    };

    // Prevent hydration mismatch by using light theme initially
    const currentTheme = mounted && mode === "dark" ? darkTheme : theme;

    return (
        <ThemeContext.Provider value={{ mode, toggleColorMode }}>
            <MUIThemeProvider theme={currentTheme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
}
