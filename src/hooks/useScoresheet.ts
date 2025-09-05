import { useEffect } from "react";
import { useScoreSheetStore } from "@/store/scoresheetStore";

export const useScoresheet = () => {
    // Get state and actions from Zustand store
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

        // Actions
        initialize,
        addPlayer,
        addRound,
        startEditPlayer,
        savePlayerName,
        cancelEditPlayer,
        editScore,
        deletePlayer,
        deleteRound,
        newGame,
        updateScoreInput,
        updateNewPlayer,
        setEditingPlayerName
    } = useScoreSheetStore();

    // Load initial data
    useEffect(() => {
        initialize();
    }, [initialize]);

    // Map store actions to handler functions for backward compatibility
    const handleAddPlayer = addPlayer;
    const handleAddRound = addRound;
    const handleStartEditPlayer = startEditPlayer;
    const handleSavePlayerName = savePlayerName;
    const handleCancelEditPlayer = cancelEditPlayer;
    const handleEditScore = editScore;
    const handleDeletePlayer = deletePlayer;
    const handleDeleteRound = deleteRound;
    const handleNewGame = newGame;
    const handleScoreInputChange = updateScoreInput;
    const handleNewPlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => updateNewPlayer(e.target.value);

    return {
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
    };
};
