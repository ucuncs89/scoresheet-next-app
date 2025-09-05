import { create } from 'zustand';
import { SheetData } from '@/types/scoresheet';
import { getSheet, saveSheet } from '@/lib/database';

interface ScoreSheetState {
  // State
  players: string[];
  scores: number[][];
  loading: boolean;
  newPlayer: string;
  newScores: { [key: number]: string };
  resetting: boolean;
  editingPlayer: number | null;
  editingPlayerName: string;

  // Actions
  initialize: () => Promise<void>;
  updateSheet: (newPlayers: string[], newScoresArr: number[][]) => Promise<void>;
  addPlayer: (e: React.FormEvent) => Promise<void>;
  addRound: (e: React.FormEvent) => Promise<void>;
  startEditPlayer: (idx: number, currentName: string) => void;
  savePlayerName: () => Promise<void>;
  cancelEditPlayer: () => void;
  editScore: (rowIdx: number, colIdx: number, value: string) => Promise<void>;
  deletePlayer: (idx: number) => Promise<void>;
  deleteRound: (idx: number) => Promise<void>;
  newGame: () => Promise<void>;
  updateScoreInput: (idx: number, value: string) => void;
  updateNewPlayer: (value: string) => void;
  setEditingPlayerName: (value: string) => void;
}

export const useScoreSheetStore = create<ScoreSheetState>((set, get) => ({
  // Initial state
  players: [],
  scores: [],
  loading: true,
  newPlayer: "",
  newScores: {},
  resetting: false,
  editingPlayer: null,
  editingPlayerName: "",

  // Actions
  initialize: async () => {
    try {
      set({ loading: true });
      const sheet = await getSheet();
      set({
        players: sheet.players,
        scores: sheet.scores,
        newScores: {},
        loading: false
      });
    } catch (error) {
      console.error("Error loading scoresheet:", error);
      set({ loading: false });
    }
  },

  updateSheet: async (newPlayers, newScoresArr) => {
    try {
      set({
        players: newPlayers,
        scores: newScoresArr,
        newScores: {}
      });
      await saveSheet({ players: newPlayers, scores: newScoresArr });
    } catch (error) {
      console.error("Error updating scoresheet:", error);
    }
  },

  addPlayer: async (e) => {
    e.preventDefault();
    const { newPlayer, players, scores, updateSheet } = get();
    
    if (!newPlayer.trim()) return;

    // Check for duplicate names
    if (players.some((p) => p.toLowerCase() === newPlayer.trim().toLowerCase())) {
      alert("Player name already exists!");
      return;
    }

    const updatedPlayers = [...players, newPlayer.trim()];
    const updatedScores = scores.map((row) => [...row, 0]);
    await updateSheet(updatedPlayers, updatedScores);
    set({ newPlayer: "" });
  },

  addRound: async (e) => {
    e.preventDefault();
    const { players, newScores, scores, updateSheet } = get();
    
    if (players.length === 0) return;

    const round = players.map((_, idx) => {
      const value = newScores[idx] || "0";
      return Number(value) || 0;
    });

    const updatedScores = [...scores, round];
    await updateSheet(players, updatedScores);
  },

  startEditPlayer: (idx, currentName) => {
    set({
      editingPlayer: idx,
      editingPlayerName: currentName
    });
  },

  savePlayerName: async () => {
    const { editingPlayer, editingPlayerName, players, scores, updateSheet } = get();
    
    if (editingPlayer !== null && editingPlayerName.trim()) {
      const updatedPlayers = players.map((p, i) => 
        (i === editingPlayer ? editingPlayerName.trim() : p)
      );
      await updateSheet(updatedPlayers, scores);
      set({
        editingPlayer: null,
        editingPlayerName: ""
      });
    }
  },

  cancelEditPlayer: () => {
    set({
      editingPlayer: null,
      editingPlayerName: ""
    });
  },

  editScore: async (rowIdx, colIdx, value) => {
    const { players, scores, updateSheet } = get();
    
    const updatedScores = scores.map((row, r) => 
      row.map((cell, c) => 
        (r === rowIdx && c === colIdx ? Number(value) || 0 : cell)
      )
    );
    await updateSheet(players, updatedScores);
  },

  deletePlayer: async (idx) => {
    const { players, scores, updateSheet } = get();
    
    const updatedPlayers = players.filter((_, i) => i !== idx);
    const updatedScores = scores.map((row) => row.filter((_, i) => i !== idx));
    await updateSheet(updatedPlayers, updatedScores);
  },

  deleteRound: async (idx) => {
    const { players, scores, updateSheet } = get();
    
    if (confirm(`Are you sure you want to delete round ${idx + 1}?`)) {
      const updatedScores = scores.filter((_, i) => i !== idx);
      await updateSheet(players, updatedScores);
    }
  },

  newGame: async () => {
    const { players, scores } = get();
    
    if (scores.length > 0 && confirm("Are you sure you want to start a new game? This will clear all scores but keep the players.")) {
      set({ resetting: true });
      try {
        await saveSheet({ players, scores: [] });
        set({
          scores: [],
          newScores: {},
          resetting: false
        });
      } catch (error) {
        console.error("Error resetting game:", error);
        set({ resetting: false });
      }
    } else if (scores.length === 0) {
      // No scores to clear, just reset
      set({ newScores: {} });
    }
  },

  updateScoreInput: (idx, value) => {
    set((state) => ({
      newScores: {
        ...state.newScores,
        [idx]: value
      }
    }));
  },

  updateNewPlayer: (value) => {
    set({ newPlayer: value });
  },

  setEditingPlayerName: (value) => {
    set({ editingPlayerName: value });
  }
}));