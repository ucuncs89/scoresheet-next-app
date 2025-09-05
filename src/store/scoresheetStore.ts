import { create } from "zustand";
import { SheetData } from "@/types/scoresheet";
import { getSheet, saveSheet } from "@/lib/database";

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
  updateSheet: (
    newPlayers: string[],
    newScoresArr: number[][]
  ) => Promise<void>;
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
        loading: false,
      });
    } catch (error) {
      console.error("Error loading scoresheet:", error);
      set({ loading: false });
    }
  },

  updateSheet: async (newPlayers, newScoresArr) => {
    try {
      console.log("Memperbarui sheet dengan data baru:", {
        newPlayers,
        newScoresArr,
      });

      // Update state
      set({
        players: newPlayers,
        scores: newScoresArr,
        newScores: {},
      });

      // Simpan ke database
      await saveSheet({ players: newPlayers, scores: newScoresArr });
      console.log("Sheet berhasil diperbarui");
    } catch (error: any) {
      console.error("Error updating scoresheet:", error);
      alert("Terjadi kesalahan saat memperbarui data: " + error.message);
    }
  },

  addPlayer: async (e) => {
    e.preventDefault();
    const { newPlayer, players, scores } = get();

    try {
      const trimmedName = newPlayer.trim();

      // Validasi input
      if (!trimmedName) {
        console.log("Nama pemain kosong, tidak melakukan apa-apa");
        return;
      }

      // Cek nama duplikat
      if (players.some((p) => p.toLowerCase() === trimmedName.toLowerCase())) {
        console.log("Nama pemain sudah ada:", trimmedName);
        alert("Nama pemain sudah ada!");
        return;
      }

      console.log("Menambahkan pemain baru:", trimmedName);

      // Buat salinan data
      const playersCopy = [...players, trimmedName];
      const scoresCopy = scores.map((row) => [...row, 0]);

      // Update state
      set({
        players: playersCopy,
        scores: scoresCopy,
        newPlayer: "",
      });

      // Simpan ke database
      await saveSheet({ players: playersCopy, scores: scoresCopy });
      console.log("Pemain berhasil ditambahkan");
    } catch (error: any) {
      console.error("Error saat menambahkan pemain:", error);
      alert("Terjadi kesalahan saat menambahkan pemain: " + error.message);
    }
  },

  addRound: async (e) => {
    e.preventDefault();
    const { players, newScores, scores } = get();

    try {
      // Validasi input
      if (players.length === 0) {
        console.log("Tidak ada pemain, tidak dapat menambahkan ronde");
        return;
      }

      console.log("Menambahkan ronde baru dengan skor:", newScores);

      // Buat array skor untuk ronde baru
      const round = players.map((_, idx) => {
        const value = newScores[idx] || "0";
        return Number(value) || 0;
      });

      // Buat salinan data
      const scoresCopy = [...scores, round];

      // Update state
      set({
        scores: scoresCopy,
        newScores: {},
      });

      // Simpan ke database
      await saveSheet({ players, scores: scoresCopy });
      console.log("Ronde berhasil ditambahkan");
    } catch (error: any) {
      console.error("Error saat menambahkan ronde:", error);
      alert("Terjadi kesalahan saat menambahkan ronde: " + error.message);
    }
  },

  startEditPlayer: (idx, currentName) => {
    set({
      editingPlayer: idx,
      editingPlayerName: currentName,
    });
  },

  savePlayerName: async () => {
    const { editingPlayer, editingPlayerName, players, scores, updateSheet } =
      get();

    if (editingPlayer !== null && editingPlayerName.trim()) {
      const updatedPlayers = players.map((p, i) =>
        i === editingPlayer ? editingPlayerName.trim() : p
      );
      await updateSheet(updatedPlayers, scores);
      set({
        editingPlayer: null,
        editingPlayerName: "",
      });
    }
  },

  cancelEditPlayer: () => {
    set({
      editingPlayer: null,
      editingPlayerName: "",
    });
  },

  editScore: async (rowIdx, colIdx, value) => {
    const { players, scores, updateSheet } = get();

    const updatedScores = scores.map((row, r) =>
      row.map((cell, c) =>
        r === rowIdx && c === colIdx ? Number(value) || 0 : cell
      )
    );
    await updateSheet(players, updatedScores);
  },

  deletePlayer: async (idx) => {
    const { players, scores, updateSheet } = get();

    // Pastikan pemain ada
    if (!players[idx]) {
      console.log("Pemain tidak ditemukan");
      return;
    }

    try {
      // Simpan nama pemain untuk pesan konfirmasi
      const playerName = players[idx];
      console.log("Akan menghapus pemain:", playerName, "di indeks:", idx);

      // Gunakan confirm browser native dengan pesan yang jelas
      if (confirm(`Apakah Anda yakin ingin menghapus pemain ${playerName}?`)) {
        console.log("Konfirmasi diterima, menghapus pemain...");

        // Buat salinan data
        const playersCopy = [...players];
        const scoresCopy = [...scores.map((row) => [...row])];

        // Hapus pemain dari salinan data
        playersCopy.splice(idx, 1);
        scoresCopy.forEach((row) => row.splice(idx, 1));

        console.log("Data sebelum update:", { players, scores });
        console.log("Data setelah update:", { playersCopy, scoresCopy });

        // Update state dan simpan ke database
        set({
          players: playersCopy,
          scores: scoresCopy,
          newScores: {},
        });

        // Simpan perubahan ke database
        await saveSheet({ players: playersCopy, scores: scoresCopy });
        console.log("Pemain berhasil dihapus dan data disimpan");
      } else {
        console.log("Penghapusan dibatalkan oleh pengguna");
      }
    } catch (error: any) {
      console.error("Error dalam proses deletePlayer:", error);
      alert("Terjadi kesalahan saat menghapus pemain: " + error.message);
    }
  },

  deleteRound: async (idx) => {
    const { players, scores } = get();

    try {
      console.log("Akan menghapus ronde:", idx + 1);

      // Gunakan confirm browser native dengan pesan yang jelas
      if (confirm(`Apakah Anda yakin ingin menghapus ronde ${idx + 1}?`)) {
        console.log("Konfirmasi diterima, menghapus ronde...");

        // Buat salinan data
        const scoresCopy = [...scores];

        // Hapus ronde dari salinan data
        scoresCopy.splice(idx, 1);

        console.log("Data sebelum update:", { scores });
        console.log("Data setelah update:", { scoresCopy });

        // Update state dan simpan ke database
        set({
          scores: scoresCopy,
          newScores: {},
        });

        // Simpan perubahan ke database
        await saveSheet({ players, scores: scoresCopy });
        console.log("Ronde berhasil dihapus dan data disimpan");
      } else {
        console.log("Penghapusan ronde dibatalkan oleh pengguna");
      }
    } catch (error: any) {
      console.error("Error dalam proses deleteRound:", error);
      alert("Terjadi kesalahan saat menghapus ronde: " + error.message);
    }
  },

  newGame: async () => {
    const { players, scores } = get();

    try {
      // Hanya tampilkan konfirmasi jika ada skor yang akan dihapus
      if (scores.length > 0) {
        console.log("Akan memulai permainan baru, meminta konfirmasi...");

        // Gunakan confirm browser native dengan pesan yang jelas
        if (
          confirm(
            "Apakah Anda yakin ingin memulai permainan baru? Semua skor akan dihapus tetapi pemain akan tetap ada."
          )
        ) {
          console.log("Konfirmasi diterima, memulai permainan baru...");
          set({ resetting: true });

          // Simpan perubahan ke database
          await saveSheet({ players, scores: [] });

          // Update state
          set({
            scores: [],
            newScores: {},
            resetting: false,
          });

          console.log("Permainan baru berhasil dimulai");
        } else {
          console.log("Permainan baru dibatalkan oleh pengguna");
        }
      } else {
        console.log("Tidak ada skor untuk dihapus, tidak perlu konfirmasi");
        set({ newScores: {} });
      }
    } catch (error: any) {
      console.error("Error dalam proses newGame:", error);
      alert("Terjadi kesalahan saat memulai permainan baru: " + error.message);
      set({ resetting: false });
    }
  },

  updateScoreInput: (idx, value) => {
    set((state) => ({
      newScores: {
        ...state.newScores,
        [idx]: value,
      },
    }));
  },

  updateNewPlayer: (value) => {
    set({ newPlayer: value });
  },

  setEditingPlayerName: (value) => {
    set({ editingPlayerName: value });
  },
}));
