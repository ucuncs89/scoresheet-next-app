"use client";

import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeToggleButton() {
    const { mode, toggleColorMode } = useThemeStore();

    return (
        <Tooltip title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={toggleColorMode} color="primary" aria-label="toggle theme">
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </Tooltip>
    );
}

