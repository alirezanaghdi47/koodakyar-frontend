import {useState} from "react";

//===== libraries =====//
import {FormControl, IconButton, TextField, Typography} from "@mui/material";
import {FiEye, FiEyeOff} from "react-icons/fi";

const PasswordInput = ({label, name, value, onChange, error, touched, rows = 1, disabled = false , style}) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl
            variant="outlined"
            style={style}
        >

            <Typography
                variant="subtitle2"
                color="textSecondary"
                fontWeight="bold"
                style={{marginBottom: 8}}
            >
                {label}
            </Typography>

            <TextField
                variant="outlined"
                color="primary"
                size="small"
                name={name}
                type={showPassword ? "text" : "password"}
                multiline={rows > 1}
                rows={rows}
                disabled={disabled}
                value={value}
                onChange={onChange}
                InputProps={{
                    endAdornment:
                        <IconButton
                            color="secondary"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff size={20}/> : <FiEye size={20}/>}
                        </IconButton>
                }}
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

export default PasswordInput;