import { useState, useCallback, useEffect } from "react";
import { SheetData } from "@/types/scoresheet";
import { getSheet, saveSheet } from "@/lib/database";

export const useScoresheet = () => {
    const [players, setPlayers] = useState<string[]>([]);
    const [scores, setScores] = useState<number[][]>([]);
    const [loading, setLoading] = useState(true);
    const [newPlayer, setNewPlayer] = useState("");
    const [newScores, setNewScores] = useState<{ [key: number]: string }>({});
    const [resetting, setResetting] = useState(false);
    const [editingPlayer, setEditingPlayer] = useState<number | null>(null);
    const [editingPlayerName, setEditingPlayerName] = useState("");

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const sheet = await getSheet();
                setPlayers(sheet.players);
                setScores(sheet.scores);
                setNewScores({});
            } catch (error) {
                console.error("Error loading scoresheet:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Update sheet with new data
    const updateSheet = useCallback(async (newPlayers: string[], newScoresArr: number[][]): Promise<void> => {
        try {
            setPlayers(newPlayers);
            setScores(newScoresArr);
            setNewScores({});
            await saveSheet({ players: newPlayers, scores: newScoresArr });
        } catch (error) {
            console.error("Error updating scoresheet:", error);
        }
    }, []);

    // Add player
    const handleAddPlayer = useCallback(
        async (e: React.FormEvent): Promise<void> => {
            e.preventDefault();
            if (!newPlayer.trim()) return;

            // Check for duplicate names
            if (players.some((p) => p.toLowerCase() === newPlayer.trim().toLowerCase())) {
                alert("Player name already exists!");
                return;
            }

            const updatedPlayers = [...players, newPlayer.trim()];
            const updatedScores = scores.map((row) => [...row, 0]);
            await updateSheet(updatedPlayers, updatedScores);
            setNewPlayer("");
        },
        [newPlayer, players, scores, updateSheet]
    );

    // Add round
    const handleAddRound = useCallback(
        async (e: React.FormEvent): Promise<void> => {
            e.preventDefault();
            if (players.length === 0) return;

            const round = players.map((_, idx) => {
                const value = newScores[idx] || "0";
                return Number(value) || 0;
            });

            const updatedScores = [...scores, round];
            await updateSheet(players, updatedScores);
        },
        [players, newScores, scores, updateSheet]
    );

    // Edit player name
    const handleStartEditPlayer = useCallback((idx: number, currentName: string) => {
        setEditingPlayer(idx);
        setEditingPlayerName(currentName);
    }, []);

    const handleSavePlayerName = useCallback(async () => {
        if (editingPlayer !== null && editingPlayerName.trim()) {
            const updatedPlayers = players.map((p, i) => (i === editingPlayer ? editingPlayerName.trim() : p));
            await updateSheet(updatedPlayers, scores);
            setEditingPlayer(null);
            setEditingPlayerName("");
        }
    }, [editingPlayer, editingPlayerName, players, scores, updateSheet]);

    const handleCancelEditPlayer = useCallback(() => {
        setEditingPlayer(null);
        setEditingPlayerName("");
    }, []);

    // Edit score cell
    const handleEditScore = useCallback(
        async (rowIdx: number, colIdx: number, value: string): Promise<void> => {
            const updatedScores = scores.map((row, r) => row.map((cell, c) => (r === rowIdx && c === colIdx ? Number(value) || 0 : cell)));
            await updateSheet(players, updatedScores);
        },
        [players, scores, updateSheet]
    );

    // Delete player
    const handleDeletePlayer = useCallback(
        async (idx: number): Promise<void> => {
            const updatedPlayers = players.filter((_, i) => i !== idx);
            const updatedScores = scores.map((row) => row.filter((_, i) => i !== idx));
            await updateSheet(updatedPlayers, updatedScores);
        },
        [players, scores, updateSheet]
    );

    // Delete round
    const handleDeleteRound = useCallback(
        async (idx: number): Promise<void> => {
            if (confirm(`Are you sure you want to delete round ${idx + 1}?`)) {
                const updatedScores = scores.filter((_, i) => i !== idx);
                await updateSheet(players, updatedScores);
            }
        },
        [players, scores, updateSheet]
    );

    // New Game (reset)
    const handleNewGame = useCallback(async (): Promise<void> => {
        if (scores.length > 0 && confirm("Are you sure you want to start a new game? This will clear all scores but keep the players.")) {
            setResetting(true);
            try {
                await saveSheet({ players, scores: [] });
                setScores([]);
                setNewScores({});
            } catch (error) {
                console.error("Error resetting game:", error);
            } finally {
                setResetting(false);
            }
        } else if (scores.length === 0) {
            // No scores to clear, just reset
            setNewScores({});
        }
    }, [players, scores]);

    // Update input value for new round
    const handleScoreInputChange = useCallback((idx: number, value: string): void => {
        setNewScores((prev) => ({
            ...prev,
            [idx]: value,
        }));
    }, []);

    // Update new player input
    const handleNewPlayerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlayer(e.target.value);
    }, []);

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
