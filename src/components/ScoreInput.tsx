import { memo } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { ScoreInputProps } from "@/types/scoresheet";
import { validateScoreInput } from "@/utils/scoresheet";

export const ScoreInput = memo<ScoreInputProps>(({ playerIdx, playerName, value, onChange, isCompact = false, isRequired = false }) => {
    const hasValue = value?.trim();

    return (
        <Box sx={{ mb: isCompact ? 1.5 : 2 }}>
            <Typography
                variant={isCompact ? "caption" : "body2"}
                color="text.secondary"
                gutterBottom
                sx={{
                    display: "block",
                    fontWeight: 500,
                    mb: 0.5,
                }}
            >
                {playerName}
                {isRequired && <span style={{ color: "red" }}> *</span>}
            </Typography>
            <TextField
                type="number"
                variant="outlined"
                placeholder="Enter score"
                value={value}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    if (validateScoreInput(inputValue)) {
                        onChange(playerIdx, inputValue);
                    }
                }}
                size={isCompact ? "small" : "medium"}
                fullWidth
                error={isRequired && !hasValue}
                helperText={isRequired && !hasValue ? "Required" : ""}
                inputProps={{
                    step: "1",
                    inputMode: "numeric",
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        "&:hover fieldset": {
                            borderColor: "primary.main",
                        },
                        "&.Mui-focused fieldset": {
                            borderWidth: 2,
                        },
                    },
                }}
            />
        </Box>
    );
});

ScoreInput.displayName = "ScoreInput";
