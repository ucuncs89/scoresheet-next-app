// Dynamic Scoresheet Spreadsheet - Players as columns, rounds as rows, summary footer, new game, responsive forms, better UI, icon buttons, neg/pos toggle
"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { RiAddLine, RiDeleteBinLine, RiRefreshLine, RiSubtractLine, RiMenuLine, RiCloseLine } from '@remixicon/react';

interface SheetData {
  players: string[];
  scores: number[][]; // [ [scorePlayer1, scorePlayer2, ...], ... ]
}

const DB_NAME = "ScoresheetDB";
const STORE_NAME = "sheet";
const DB_VERSION = 2;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

async function getSheet(): Promise<SheetData> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME)
    const req = store.get("main");
    req.onsuccess = () => {
      if (req.result) resolve(req.result.data as SheetData);
      else resolve({ players: [], scores: [] }); // Start empty
    };
    req.onerror = () => reject(req.error);
  });
}

async function saveSheet(data: SheetData): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put({ id: "main", data });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function resetSheet(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put({ id: "main", data: { players: [], scores: [] } });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function getSummary(scores: number[][], players: string[]): number[] {
  // Total per player (column)
  const sums = players.map((_, idx) =>
    scores.reduce((acc, row) => acc + (row[idx] || 0), 0)
  );
  return sums;
}

export default function Scoresheet() {
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [newPlayer, setNewPlayer] = useState("");
  const [newScores, setNewScores] = useState<string[]>([]);
  const [resetting, setResetting] = useState(false);
  // Neg/pos state for each input in round form
  const [scoreSigns, setScoreSigns] = useState<(1 | -1)[]>([]);
  const [showRemovePlayer, setShowRemovePlayer] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const sheet = await getSheet();
      setPlayers(sheet.players);
      setScores(sheet.scores);
      setNewScores(sheet.players.map(() => ""));
      setScoreSigns(sheet.players.map(() => 1));
      setLoading(false);
    })();
  }, []);

  async function updateSheet(newPlayers: string[], newScoresArr: number[][]) {
    setPlayers(newPlayers);
    setScores(newScoresArr);
    setNewScores(newPlayers.map(() => ""));
    setScoreSigns(newPlayers.map(() => 1));
    await saveSheet({ players: newPlayers, scores: newScoresArr });
  }

  // Add player (column)
  async function handleAddPlayer(e: React.FormEvent) {
    e.preventDefault();
    if (!newPlayer.trim()) return;
    const updatedPlayers = [...players, newPlayer.trim()];
    const updatedScores = scores.map(row => [...row, 0]);
    await updateSheet(updatedPlayers, updatedScores);
    setNewPlayer("");
  }

  // Add round (row)
  async function handleAddRound(e: React.FormEvent) {
    e.preventDefault();
    if (players.length === 0) return;
    if (newScores.some(s => s.trim() === "")) return;
    const round = newScores.map((s, i) => (scoreSigns[i] || 1) * Number(s));
    const updatedScores = [...scores, round];
    await updateSheet(players, updatedScores);
    setNewScores(players.map(() => ""));
    setScoreSigns(players.map(() => 1));
  }

  // Edit player name
  async function handleEditPlayer(idx: number, value: string) {
    const updatedPlayers = players.map((p, i) => (i === idx ? value : p));
    await updateSheet(updatedPlayers, scores);
  }

  // Edit score cell
  async function handleEditScore(rowIdx: number, colIdx: number, value: string) {
    const updatedScores = scores.map((row, r) =>
      row.map((cell, c) => (r === rowIdx && c === colIdx ? Number(value) : cell))
    );
    await updateSheet(players, updatedScores);
  }

  // Delete player (column)
  async function handleDeletePlayer(idx: number) {
    const updatedPlayers = players.filter((_, i) => i !== idx);
    const updatedScores = scores.map(row => row.filter((_, i) => i !== idx));
    await updateSheet(updatedPlayers, updatedScores);
  }

  // Delete round (row)
  async function handleDeleteRound(idx: number) {
    const updatedScores = scores.filter((_, i) => i !== idx);
    await updateSheet(players, updatedScores);
  }

  // New Game (reset)
  async function handleNewGame() {
    setResetting(true);
    await resetSheet();
    setPlayers([]);
    setScores([]);
    setNewScores([]);
    setScoreSigns([]);
    setResetting(false);
  }

  // Toggle sign for input
  function handleToggleSign(idx: number) {
    setScoreSigns(signs => signs.map((s, i) => (i === idx ? (s === 1 ? -1 : 1) : s)));
  }

  // Update input value
  function handleInputChange(idx: number, value: string) {
    setNewScores(ns => ns.map((v, i) => (i === idx ? value : v)));
  }

  const summary = getSummary(scores, players);

  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Head>
      {/* Bottom Sheet Trigger for mobile */}
      <div className="fixed bottom-4 right-4 z-50 sm:hidden">
        <button
          className="bg-indigo-500 text-white p-3 rounded-full shadow-lg focus:outline-none"
          onClick={() => setShowBottomSheet(true)}
          aria-label="Open Menu"
        >
          <RiMenuLine className="w-6 h-6" />
        </button>
      </div>
      {/* Bottom Sheet Overlay */}
      {showBottomSheet && (
        <div className="fixed inset-0 z-50 flex items-end sm:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setShowBottomSheet(false)}></div>
          <div className="relative w-full bg-white dark:bg-zinc-900 rounded-t-2xl shadow-lg p-4 animate-slideup">
            <button
              className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              onClick={() => setShowBottomSheet(false)}
              aria-label="Close Menu"
            >
              <RiCloseLine className="w-6 h-6" />
            </button>
            {/* Menu content in bottom sheet (copy from top menu) */}
            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={handleNewGame}
                className="flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-red-700 transition shadow text-base"
                disabled={resetting}
              >
                <RiRefreshLine className="w-5 h-5" /> {resetting ? "Resetting..." : "New Game"}
              </button>
              {/* Add Player Form */}
              <form onSubmit={handleAddPlayer} className="flex gap-2 bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 rounded-lg p-2 shadow text-base">
                <input
                  className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-zinc-900 dark:text-white"
                  placeholder="Player Name"
                  value={newPlayer}
                  onChange={e => setNewPlayer(e.target.value)}
                />
                <button type="submit" className="flex items-center gap-1 bg-indigo-500 text-white px-3 py-1.5 rounded hover:bg-indigo-700 transition shadow">
                  <RiAddLine className="w-5 h-5" /> Add
                </button>
              </form>
              {/* Add Round Form */}
              <form onSubmit={handleAddRound} className="flex flex-col gap-2 bg-green-50 dark:bg-zinc-800 border border-green-200 dark:border-zinc-700 rounded-lg p-2 shadow text-base">
                <div className="flex flex-col sm:flex-row gap-2">
                  {players.map((p, idx) => (
                    <div key={idx} className="flex flex-col flex-1">
                      <label className="block text-xs font-medium mb-1">{p}</label>
                      <div className="flex flex-row gap-1 items-center">
                        <button
                          type="button"
                          onClick={() => handleToggleSign(idx)}
                          className={`flex items-center justify-center px-1.5 py-1.5 rounded border transition shadow ${scoreSigns[idx] === -1 ? 'bg-red-100 text-red-600 border-red-300 dark:bg-zinc-900 dark:text-red-400' : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-zinc-900 dark:text-gray-200'}`}
                        >
                          <RiSubtractLine className={`w-4 h-4 ${scoreSigns[idx] === -1 ? 'text-red-600' : 'text-gray-700'}`} />
                        </button>
                        <input
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-green-400 dark:bg-zinc-900 dark:text-white"
                          type="number"
                          placeholder="Score"
                          value={newScores[idx] ? (scoreSigns[idx] === -1 && newScores[idx] !== '' ? '-' + newScores[idx].replace(/^-/, '') : newScores[idx].replace(/^-/, '')) : ''}
                          onChange={e => handleInputChange(idx, e.target.value.replace(/^-/, ''))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1 bg-emerald-500 text-white px-3 py-1.5 rounded hover:bg-emerald-700 transition shadow"
                  disabled={players.length === 0}
                >
                  <RiAddLine className="w-5 h-5" /> Add Round
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Main content, hide top menu on mobile */}
      <div className="max-w-12lg mx-auto p-2 sm:p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-lg mt-4">
        {/* <h1 className="text-xl font-bold mb-4 text-center">Score</h1> */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4 items-center justify-between sm:visible invisible h-0 sm:h-auto">
          <button
            onClick={handleNewGame}
            className="flex items-center justify-center gap-1 bg-pink-500 text-white px-3 py-1.5 rounded hover:bg-red-700 transition w-full sm:w-auto mb-2 sm:mb-0 shadow text-sm"
            disabled={resetting}
          >
            <RiRefreshLine className="w-4 h-4" /> {resetting ? "Resetting..." : "New Game"}
          </button>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {/* Form tambah player */}
            <form onSubmit={handleAddPlayer} className="flex flex-col sm:flex-row gap-1 w-full sm:w-auto bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 rounded-lg p-2 shadow text-sm">
              <div className="flex-1">
                <label className="block text-xs font-medium mb-1">Add Player</label>
                <input
                  className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-zinc-900 dark:text-white text-sm"
                  placeholder="Player Name"
                  value={newPlayer}
                  onChange={e => setNewPlayer(e.target.value)}
                />
                {/* Chips for existing players with remove button */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {players.map((p, idx) => (
                    <span key={idx} className="flex items-center bg-blue-100 dark:bg-zinc-700 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs font-medium">
                      {p}
                      <button
                        type="button"
                        className="ml-1 text-red-500 hover:text-red-700 rounded-full p-0.5"
                        onClick={() => handleDeletePlayer(idx)}
                        aria-label={`Remove ${p}`}
                      >
                        <RiDeleteBinLine className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-1 bg-indigo-500 text-white px-3 py-1.5 rounded hover:bg-indigo-700 transition w-full sm:w-auto shadow text-sm"
              >
                <RiAddLine className="w-4 h-4" /> Add
              </button>
            </form>
            {/* Form tambah skor per ronde */}
            <form onSubmit={handleAddRound} className="flex flex-col sm:flex-row gap-1 w-full sm:w-auto flex-1 bg-green-50 dark:bg-zinc-800 border border-green-200 dark:border-zinc-700 rounded-lg p-2 shadow text-sm">
              <div className="flex flex-col sm:flex-row gap-1 flex-1">
                {players.map((p, idx) => (
                  <div key={idx} className="flex flex-col flex-1">
                    <label className="block text-xs font-medium mb-1">{p}</label>
                    <div className="flex flex-row gap-1 items-center">
                      <button
                        type="button"
                        onClick={() => handleToggleSign(idx)}
                        className={`flex items-center justify-center px-1.5 py-1.5 rounded border transition shadow ${scoreSigns[idx] === -1 ? 'bg-red-100 text-red-600 border-red-300 dark:bg-zinc-900 dark:text-red-400' : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-zinc-900 dark:text-gray-200'}`}
                      >
                        <RiSubtractLine className={`w-4 h-4 ${scoreSigns[idx] === -1 ? 'text-red-600' : 'text-gray-700'}`} />
                      </button>
                      <input
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-green-400 dark:bg-zinc-900 dark:text-white text-sm"
                        type="number"
                        placeholder="Score"
                        value={newScores[idx] ? (scoreSigns[idx] === -1 && newScores[idx] !== '' ? '-' + newScores[idx].replace(/^-/, '') : newScores[idx].replace(/^-/, '')) : ''}
                        onChange={e => handleInputChange(idx, e.target.value.replace(/^-/, ''))}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-1 bg-emerald-500 text-white px-3 py-1.5 rounded hover:bg-emerald-700 transition w-full sm:w-auto shadow text-sm"
                disabled={players.length === 0}
              >
                <RiAddLine className="w-4 h-4" /> Add Round
              </button>
            </form>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-zinc-700 rounded-lg text-xs">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-800">
                <th className="px-2 py-1 text-center">#</th>
                {players.map((p, idx) => (
                  <th key={idx} className="px-2 py-1 text-center relative group">
                    <input
                      className="w-full bg-transparent border-none text-center font-bold focus:ring-0 dark:text-white text-xs"
                      value={p}
                      onChange={e => handleEditPlayer(idx, e.target.value)}
                    />
                    <button
                      className="absolute -right-2 -top-2 text-xs text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-700 bg-white dark:bg-zinc-900 rounded-full shadow p-1"
                      onClick={() => handleDeletePlayer(idx)}
                      title="Delete Player"
                      type="button"
                    >
                      <RiDeleteBinLine className="w-3 h-3" />
                    </button>
                  </th>
                ))}
                <th className="px-2 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={players.length + 2} className="text-center py-2 text-gray-500">Loading...</td>
                </tr>
              ) : scores.length === 0 ? (
                <tr>
                  <td colSpan={players.length + 2} className="text-center py-2 text-gray-500">No data yet.</td>
                </tr>
              ) : (
                scores.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-t border-gray-200 dark:border-zinc-700">
                    <td className="px-2 py-1 text-center font-bold">{rowIdx + 1}</td>
                    {row.map((cell, colIdx) => {
                      // Convert cell to string, handle negative and zero
                      let cellValue = cell === 0 ? '' : String(cell);
                      return (
                        <td key={colIdx} className="px-2 py-1 text-center">
                          <input
                            className="w-full bg-transparent border-none text-center focus:ring-0 dark:text-white text-xs"
                            type="number"
                            value={cellValue}
                            onChange={e => {
                              let val = e.target.value;
                              // Remove leading zeros except for 0 or -0
                              if (/^-?0+\d+/.test(val)) {
                                val = val.replace(/^-?0+/, val.startsWith('-') ? '-' : '');
                              }
                              // Allow empty string
                              if (val === '' || val === '-') {
                                handleEditScore(rowIdx, colIdx, '0');
                              } else {
                                handleEditScore(rowIdx, colIdx, val);
                              }
                            }}
                            inputMode="numeric"
                            pattern="^-?\\d*$"
                          />
                        </td>
                      );
                    })}
                    <td className="px-2 py-1 text-right">
                      <button
                        className="flex items-center justify-center bg-gray-200 dark:bg-zinc-700 text-red-500 hover:text-red-700 rounded-full shadow p-1 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                        onClick={() => handleDeleteRound(rowIdx)}
                        aria-label={`Delete round ${rowIdx + 1}`}
                        type="button"
                      >
                        <RiDeleteBinLine className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* Summary Footer */}
            {players.length > 0 && (
              <tfoot>
                <tr className="bg-gray-200 dark:bg-zinc-800 font-bold">
                  <td className="px-2 py-1"></td>
                  {summary.map((sum, idx) => (
                    <td key={idx} className="px-2 py-1 text-center">{sum}</td>
                  ))}
                  <td className="px-2 py-1 text-right text-gray-500">Total</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
      <footer className="mt-4 text-center text-xs text-gray-400">
        &copy; ucun.dev
      </footer>
      <style jsx global>{`
        @keyframes slideup {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideup {
          animation: slideup 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  );
}
