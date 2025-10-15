import type { Metadata } from "next";
import "./globals.css";
import { Typography, Container, Box } from "@mui/material";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export const metadata: Metadata = {
    title: "Scoresheet",
    description: "Dynamic scoresheet for tracking scores across multiple rounds and players",
};

function LayoutContent({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Box
                component="header"
                sx={{
                    bgcolor: "background.paper",
                    borderBottom: 1,
                    borderColor: "divider",
                    py: 1.5,
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ flex: 1 }} />
                        <Typography
                            variant="h5"
                            component="h1"
                            align="center"
                            sx={{
                                fontWeight: 700,
                                color: "primary.main",
                                letterSpacing: 0.5,
                            }}
                        >
                            Scoresheet
                        </Typography>
                        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                            <ThemeToggleButton />
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
                <Container maxWidth="xl">{children}</Container>
            </Box>

            <Box
                component="footer"
                sx={{
                    py: 2,
                    px: 2,
                    mt: "auto",
                    borderTop: 1,
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                }}
            >
                <Container maxWidth="xl">
                    <Typography variant="caption" color="text.secondary" align="center" display="block">
                        &copy; ucun.dev
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <ThemeProvider>
                    <LayoutContent>{children}</LayoutContent>
                </ThemeProvider>
            </body>
        </html>
    );
}
