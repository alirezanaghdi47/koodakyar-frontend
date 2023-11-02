//===== libraries =====//
import {FormControl, FormControlLabel, Switch, Typography, Stack} from "@mui/material";
const SwitchBox = ({label , caption , name , value , onChange , error , touched , style = null}) => {

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

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{width: "100%"}}
            >

                <Typography
                    variant="caption"
                    color="textPrimary"
                    fontWeight="bold"
                >
                    {caption}
                </Typography>

                <FormControlLabel
                    value="top"
                    control={
                        <Switch
                            checked={value}
                            onChange={onChange}
                            inputProps={{name: name}}
                        />
                    }
                    label={value ? "بله" : "خیر"}
                    labelPlacement="start"
                />

            </Stack>

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

export default SwitchBox;