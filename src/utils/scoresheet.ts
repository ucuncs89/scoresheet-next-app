import { SheetData } from "@/types/scoresheet";

export const getSummary = (scores: number[][], players: string[]): number[] => {
    // Total per player (column)
    const sums = players.map((_, idx) => scores.reduce((acc, row) => acc + (row[idx] || 0), 0));
    return sums;
};

export const validateScoreInput = (value: string): boolean => {
    // Allow negative numbers and empty string
    return value === "" || /^-?\d*$/.test(value);
};

export const formatScoreForDisplay = (score: number): string => {
    return score === 0 ? "" : String(score);
};

export const isScoreNegative = (score: number): boolean => {
    return score < 0;
};
