import { memo } from "react";
import { Box, Button, TextField, Card, CardContent, Typography, Chip, Stack, Divider } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { ScoreInput } from "./ScoreInput";

interface GameControlsProps {
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
    isMobile?: boolean;
}

export const GameControls = memo<GameControlsProps>(
    ({ players, newPlayer, newScores, resetting, onAddPlayer, onAddRound, onNewGame, onDeletePlayer, onScoreInputChange, onNewPlayerChange, isMobile = false }) => {
        if (isMobile) {
            return (
                <Box sx={{ p: 3 }}>
                    <Stack spacing={3}>
                        <Button onClick={onNewGame} variant="contained" color="error" startIcon={<RefreshIcon />} disabled={resetting} fullWidth size="large" sx={{ py: 1.5, borderRadius: 0 }}>
                            {resetting ? "Resetting..." : "New Game"}
                        </Button>

                        {/* Add Player Section */}
                        <Card elevation={2} sx={{ borderRadius: 0 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                                    Add Player
                                </Typography>
                                <Box component="form" onSubmit={onAddPlayer}>
                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Enter player name"
                                            value={newPlayer}
                                            onChange={onNewPlayerChange}
                                            size="medium"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 0,
                                                },
                                            }}
                                            inputProps={{
                                                autoComplete: "off",
                                            }}
                                        />
                                        <Button type="submit" variant="contained" startIcon={<AddIcon />} fullWidth size="large" sx={{ py: 1.5, borderRadius: 0 }}>
                                            Add Player
                                        </Button>
                                    </Stack>
                                </Box>

                                {/* Current Players */}
                                {players.length > 0 && (
                                    <Box sx={{ mt: 3 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Current Players:
                                        </Typography>
                                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                            {players.map((player, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={player}
                                                    onDelete={() => onDeletePlayer(idx)}
                                                    deleteIcon={<DeleteIcon />}
                                                    color="primary"
                                                    variant="outlined"
                                                    sx={{ mb: 1, borderRadius: 0 }}
                                                />
                                            ))}
                                        </Stack>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>

                        {/* Add Round Section */}
                        {players.length > 0 && (
                            <Card elevation={2} sx={{ borderRadius: 0 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom color="secondary" sx={{ fontWeight: 600 }}>
                                        Add Round Scores
                                    </Typography>
                                    <Box component="form" onSubmit={onAddRound}>
                                        <Stack spacing={2}>
                                            {players.map((player, idx) => (
                                                <ScoreInput key={idx} playerIdx={idx} playerName={player} value={newScores[idx] || ""} onChange={onScoreInputChange} isRequired={false} />
                                            ))}
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<AddIcon />}
                                                fullWidth
                                                size="large"
                                                disabled={players.length === 0}
                                                sx={{ py: 1.5, mt: 2, borderRadius: 0 }}
                                            >
                                                Add Round
                                            </Button>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        )}
                    </Stack>
                </Box>
            );
        }

        return (
            <Card sx={{ mb: 3, borderRadius: 0 }} elevation={2}>
                <CardContent sx={{ p: 3 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ xs: "stretch", md: "flex-start" }}>
                        <Button onClick={onNewGame} variant="contained" color="error" startIcon={<RefreshIcon />} disabled={resetting} sx={{ minWidth: 160, py: 1.5, borderRadius: 0 }}>
                            {resetting ? "Resetting..." : "New Game"}
                        </Button>

                        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />

                        {/* Add Player Section */}
                        <Card variant="outlined" sx={{ flex: 1, borderRadius: 0 }}>
                            <CardContent sx={{ p: 2.5 }}>
                                <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                                    Add Player
                                </Typography>
                                <Box component="form" onSubmit={onAddPlayer}>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter player name"
                                            value={newPlayer}
                                            onChange={onNewPlayerChange}
                                            size="small"
                                            sx={{
                                                minWidth: 200,
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 0,
                                                },
                                            }}
                                            inputProps={{
                                                autoComplete: "off",
                                            }}
                                        />
                                        <Button type="submit" variant="contained" startIcon={<AddIcon />} size="small" sx={{ px: 3, borderRadius: 0 }}>
                                            Add
                                        </Button>
                                    </Stack>
                                </Box>

                                {/* Current Players */}
                                {players.length > 0 && (
                                    <Box>
                                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                            {players.map((player, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={player}
                                                    onDelete={() => onDeletePlayer(idx)}
                                                    deleteIcon={<DeleteIcon />}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                    sx={{ borderRadius: 0 }}
                                                />
                                            ))}
                                        </Stack>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>

                        {/* Add Round Section */}
                        {players.length > 0 && (
                            <Card variant="outlined" sx={{ flex: 2, borderRadius: 0 }}>
                                <CardContent sx={{ p: 2.5 }}>
                                    <Typography variant="subtitle1" color="secondary" gutterBottom sx={{ fontWeight: 600 }}>
                                        Add Round Scores
                                    </Typography>
                                    <Box component="form" onSubmit={onAddRound}>
                                        <Stack spacing={2}>
                                            <Box
                                                sx={{
                                                    display: "grid",
                                                    gridTemplateColumns: {
                                                        xs: "1fr",
                                                        sm: "repeat(2, 1fr)",
                                                        md: "repeat(3, 1fr)",
                                                        lg: "repeat(4, 1fr)",
                                                    },
                                                    gap: 2,
                                                }}
                                            >
                                                {players.map((player, idx) => (
                                                    <ScoreInput key={idx} playerIdx={idx} playerName={player} value={newScores[idx] || ""} onChange={onScoreInputChange} isCompact isRequired={false} />
                                                ))}
                                            </Box>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<AddIcon />}
                                                size="small"
                                                disabled={players.length === 0}
                                                sx={{ alignSelf: "flex-start", px: 3, borderRadius: 0 }}
                                            >
                                                Add Round
                                            </Button>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        );
    }
);

GameControls.displayName = "GameControls";
