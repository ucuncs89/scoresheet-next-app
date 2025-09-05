"use client";

import { useState } from "react";
import { Box, Fab, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useScoresheet } from "@/hooks/useScoresheet";
import { GameControls, ScoresheetTable, MobileDrawer } from "@/components";
import { useTheme as useAppTheme } from "@/components/ThemeProvider";
import theme from "@/theme/theme";

export default function ScoresheetPage(): React.ReactElement {
    const [showMobileDrawer, setShowMobileDrawer] = useState(false);

    const {
        // State
        players,
        scores,
        loading,
        newPlayer,
        newScores,
        resetting,
        editingPlayer,
        editingPlayerName,

        // Handlers
        handleAddPlayer,
        handleAddRound,
        handleStartEditPlayer,
        handleSavePlayerName,
        handleCancelEditPlayer,
        handleEditScore,
        handleDeletePlayer,
        handleDeleteRound,
        handleNewGame,
        handleScoreInputChange,
        handleNewPlayerChange,

        // Setters
        setEditingPlayerName,
    } = useScoresheet();

    const muiTheme = useMuiTheme();
    const { mode, toggleColorMode } = useAppTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

    const handleMobileDrawerClose = () => {
        setShowMobileDrawer(false);
    };

    const handleMobileDrawerOpen = () => {
        setShowMobileDrawer(true);
    };

    return (
        <Box>
            {/* Mobile FAB */}
            {isMobile && (
                <Fab
                    color="primary"
                    aria-label="menu"
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        zIndex: theme.zIndex.fab,
                    }}
                    onClick={handleMobileDrawerOpen}
                >
                    <MenuIcon />
                </Fab>
            )}

            {/* Mobile Drawer */}
            <MobileDrawer
                open={showMobileDrawer}
                onClose={handleMobileDrawerClose}
                players={players}
                newPlayer={newPlayer}
                newScores={newScores}
                resetting={resetting}
                onAddPlayer={handleAddPlayer}
                onAddRound={handleAddRound}
                onNewGame={handleNewGame}
                onDeletePlayer={handleDeletePlayer}
                onScoreInputChange={handleScoreInputChange}
                onNewPlayerChange={handleNewPlayerChange}
            />

            {/* Desktop Controls */}
            {!isMobile && (
                <GameControls
                    players={players}
                    newPlayer={newPlayer}
                    newScores={newScores}
                    resetting={resetting}
                    onAddPlayer={handleAddPlayer}
                    onAddRound={handleAddRound}
                    onNewGame={handleNewGame}
                    onDeletePlayer={handleDeletePlayer}
                    onScoreInputChange={handleScoreInputChange}
                    onNewPlayerChange={handleNewPlayerChange}
                    isMobile={false}
                />
            )}

            {/* Main Scoresheet Table */}
            <ScoresheetTable
                players={players}
                scores={scores}
                loading={loading}
                editingPlayer={editingPlayer}
                editingPlayerName={editingPlayerName}
                onStartEditPlayer={handleStartEditPlayer}
                onSavePlayerName={handleSavePlayerName}
                onCancelEditPlayer={handleCancelEditPlayer}
                onEditScore={handleEditScore}
                onDeletePlayer={handleDeletePlayer}
                onDeleteRound={handleDeleteRound}
                onEditingPlayerNameChange={setEditingPlayerName}
            />
        </Box>
    );
}
