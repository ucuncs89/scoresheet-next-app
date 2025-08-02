import { memo } from "react";
import { Box, Drawer, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { GameControls } from "./GameControls";

interface MobileDrawerProps {
    open: boolean;
    onClose: () => void;
    players: string[];
    newPlayer: string;
    newScores: { [key: number]: string };
    resetting: boolean;
    onAddPlayer: (e: React.FormEvent) => Promise<void>;
    onAddRound: (e: React.FormEvent) => Promise<void>;
    onNewGame: () => Promise<void>;
    onDeletePlayer: (idx: number) => Promise<void>;
    onScoreInputChange: (idx: number, value: string) => void;
    onNewPlayerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MobileDrawer = memo<MobileDrawerProps>(
    ({ open, onClose, players, newPlayer, newScores, resetting, onAddPlayer, onAddRound, onNewGame, onDeletePlayer, onScoreInputChange, onNewPlayerChange }) => {
        return (
            <Drawer
                anchor="bottom"
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        maxHeight: "85vh",
                    },
                }}
            >
                <AppBar position="static" color="default" elevation={0}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                            Game Controls
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ overflow: "auto" }}>
                    <GameControls
                        players={players}
                        newPlayer={newPlayer}
                        newScores={newScores}
                        resetting={resetting}
                        onAddPlayer={onAddPlayer}
                        onAddRound={onAddRound}
                        onNewGame={onNewGame}
                        onDeletePlayer={onDeletePlayer}
                        onScoreInputChange={onScoreInputChange}
                        onNewPlayerChange={onNewPlayerChange}
                        isMobile={true}
                    />
                </Box>
            </Drawer>
        );
    }
);

MobileDrawer.displayName = "MobileDrawer";
