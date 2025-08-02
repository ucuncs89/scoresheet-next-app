import { memo } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper, Typography, IconButton, TextField, Stack, useTheme, useMediaQuery } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";
import { formatScoreForDisplay, isScoreNegative } from "@/utils/scoresheet";

interface ScoresheetTableProps {
    players: string[];
    scores: number[][];
    loading: boolean;
    editingPlayer: number | null;
    editingPlayerName: string;
    onStartEditPlayer: (idx: number, currentName: string) => void;
    onSavePlayerName: () => Promise<void>;
    onCancelEditPlayer: () => void;
    onEditScore: (rowIdx: number, colIdx: number, value: string) => Promise<void>;
    onDeletePlayer: (idx: number) => Promise<void>;
    onDeleteRound: (idx: number) => Promise<void>;
    onEditingPlayerNameChange: (value: string) => void;
}

export const ScoresheetTable = memo<ScoresheetTableProps>(
    ({
        players,
        scores,
        loading,
        editingPlayer,
        editingPlayerName,
        onStartEditPlayer,
        onSavePlayerName,
        onCancelEditPlayer,
        onEditScore,
        onDeletePlayer,
        onDeleteRound,
        onEditingPlayerNameChange,
    }) => {
        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down("md"));

        return (
            <Paper elevation={3} sx={{ borderRadius: 0 }}>
                <TableContainer>
                    <Table size={isMobile ? "small" : "small"}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "action.hover" }}>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontWeight: "bold",
                                        py: isMobile ? 1 : 2,
                                        px: isMobile ? 1 : 2,
                                        fontSize: isMobile ? "0.75rem" : "0.875rem",
                                    }}
                                >
                                    Round
                                </TableCell>
                                {players.map((player, idx) => (
                                    <TableCell
                                        key={idx}
                                        align="center"
                                        sx={{
                                            position: "relative",
                                            py: isMobile ? 1 : 2,
                                            px: isMobile ? 0.5 : 2,
                                            minWidth: isMobile ? 80 : 120,
                                        }}
                                    >
                                        {editingPlayer === idx ? (
                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                                                <TextField
                                                    value={editingPlayerName}
                                                    onChange={(e) => onEditingPlayerNameChange(e.target.value)}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        minWidth: isMobile ? 80 : 120,
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: 0,
                                                        },
                                                    }}
                                                    inputProps={{
                                                        style: { textAlign: "center", fontSize: isMobile ? "0.75rem" : "0.875rem" },
                                                    }}
                                                />
                                                <Stack direction="row" spacing={0.5}>
                                                    <IconButton size="small" color="primary" onClick={onSavePlayerName} disabled={!editingPlayerName.trim()} sx={{ width: 24, height: 24 }}>
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small" color="default" onClick={onCancelEditPlayer} sx={{ width: 24, height: 24 }}>
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
                                            </Box>
                                        ) : (
                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        textAlign: "center",
                                                        fontWeight: "bold",
                                                        fontSize: isMobile ? "0.75rem" : "0.875rem",
                                                        color: "text.primary",
                                                        cursor: "pointer",
                                                        "&:hover": {
                                                            color: "primary.main",
                                                        },
                                                    }}
                                                    onClick={() => onStartEditPlayer(idx, player)}
                                                >
                                                    {player}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => onDeletePlayer(idx)}
                                                    sx={{
                                                        opacity: 0,
                                                        transition: "opacity 0.2s",
                                                        width: 20,
                                                        height: 20,
                                                        "&:hover": { opacity: 1 },
                                                        ".MuiTableCell-root:hover &": { opacity: 1 },
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell sx={{ py: isMobile ? 1 : 2, px: isMobile ? 0.5 : 2 }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={players.length + 2} align="center" sx={{ py: 4 }}>
                                        <Typography color="text.secondary">Loading...</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : scores.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={players.length + 2} align="center" sx={{ py: 4 }}>
                                        <Typography color="text.secondary">No rounds yet. Add some scores to get started!</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                scores.map((row, rowIdx) => (
                                    <TableRow key={rowIdx} hover>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                fontWeight: "bold",
                                                py: isMobile ? 1 : 1.5,
                                                px: isMobile ? 1 : 2,
                                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                            }}
                                        >
                                            {rowIdx + 1}
                                        </TableCell>
                                        {row.map((cell, colIdx) => {
                                            const isNegative = isScoreNegative(cell);
                                            return (
                                                <TableCell
                                                    key={colIdx}
                                                    align="center"
                                                    sx={{
                                                        py: isMobile ? 1 : 1.5,
                                                        px: isMobile ? 0.5 : 2,
                                                    }}
                                                >
                                                    <TextField
                                                        type="number"
                                                        value={formatScoreForDisplay(cell)}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            onEditScore(rowIdx, colIdx, val);
                                                        }}
                                                        variant="standard"
                                                        InputProps={{
                                                            disableUnderline: true,
                                                            sx: {
                                                                textAlign: "center",
                                                                color: isNegative ? "error.main" : "text.primary",
                                                                fontWeight: isNegative ? "bold" : "normal",
                                                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                                            },
                                                        }}
                                                        inputProps={{
                                                            style: {
                                                                textAlign: "center",
                                                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                                            },
                                                            inputMode: "numeric",
                                                        }}
                                                    />
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell
                                            align="center"
                                            sx={{
                                                py: isMobile ? 1 : 1.5,
                                                px: isMobile ? 0.5 : 2,
                                            }}
                                        >
                                            <IconButton size="small" color="error" onClick={() => onDeleteRound(rowIdx)} aria-label={`Delete round ${rowIdx + 1}`} sx={{ width: 20, height: 20 }}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                        {/* Summary Footer */}
                        {players.length > 0 && (
                            <TableFooter>
                                <TableRow sx={{ bgcolor: "action.hover" }}>
                                    <TableCell
                                        sx={{
                                            fontWeight: "bold",
                                            py: isMobile ? 1 : 2,
                                            px: isMobile ? 1 : 2,
                                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                                        }}
                                    >
                                        Total
                                    </TableCell>
                                    {players.map((_, idx) => {
                                        const sum = scores.reduce((acc, row) => acc + (row[idx] || 0), 0);
                                        return (
                                            <TableCell
                                                key={idx}
                                                align="center"
                                                sx={{
                                                    fontWeight: "bold",
                                                    py: isMobile ? 1 : 2,
                                                    px: isMobile ? 0.5 : 2,
                                                    color: sum < 0 ? "error.main" : "text.primary",
                                                    fontSize: isMobile ? "0.75rem" : "1rem",
                                                }}
                                            >
                                                {sum}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell sx={{ py: isMobile ? 1 : 2, px: isMobile ? 0.5 : 2 }}></TableCell>
                                </TableRow>
                            </TableFooter>
                        )}
                    </Table>
                </TableContainer>
            </Paper>
        );
    }
);

ScoresheetTable.displayName = "ScoresheetTable";
