//===== libraries =====//
import {Box, FormControl, IconButton, TextField, Tooltip, Typography} from "@mui/material";
import {FiInfo} from "react-icons/fi";

const TextInput = ({label, name, hint, value, onChange, error, touched, rows = 1, disabled = false, style = null}) => {

    return (
        <FormControl
            variant="outlined"
            style={style}
        >

            <Box
                style={{
                    display: 'flex',
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 8
                }}
            >

                {
                    hint && (
                        <Tooltip title={hint}>
                            <IconButton color="info">
                                <FiInfo size={14}/>
                            </IconButton>
                        </Tooltip>
                    )
                }

                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    fontWeight="bold"
                >
                    {label}
                </Typography>

            </Box>

            <TextField
                variant="outlined"
                color="primary"
                size="small"
                name={name}
                multiline={rows > 1}
                rows={rows}
                disabled={disabled}
                value={value}
                onChange={onChange}
            />

            {
                (touched && error) && (
                    <Typography
                        variant="caption"
                        color="error"
                        fontWeight="bold"
                        style={{marginTop: 8}}
                    >
                        {error}
                    </Typography>
                )
            }

        </FormControl>
    )
}

export default TextInput;