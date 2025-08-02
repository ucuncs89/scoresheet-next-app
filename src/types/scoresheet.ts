export interface SheetData {
    players: string[];
    scores: number[][]; // [ [scorePlayer1, scorePlayer2, ...], ... ]
}

export interface ScoreInputProps {
    playerIdx: number;
    playerName: string;
    value: string;
    onChange: (idx: number, value: string) => void;
    isCompact?: boolean;
    isRequired?: boolean;
}

export interface DatabaseConfig {
    name: string;
    storeName: string;
    version: number;
}
